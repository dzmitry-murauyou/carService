import { useEffect, useMemo, useState } from "react";
import { api } from "../api/carServiceApi";
import { useRequest } from "../hooks/useRequest";
import { EmptyState, Message } from "../components/UiBlocks";

const emptyOrder = {
  description: "",
  carId: "",
  services: [],
  spares: []
};

const ITEMS_PER_PAGE = 18;

const statusOptions = [
  { value: "NEW", label: "Новый", color: "var(--accent-light)", textColor: "var(--accent-primary)" },
  { value: "IN_PROGRESS", label: "В работе", color: "var(--warning-light)", textColor: "var(--warning-primary)" },
  { value: "COMPLETED", label: "Выполнен", color: "var(--success-light)", textColor: "var(--success-primary)" },
  { value: "CANCELLED", label: "Отменён", color: "var(--danger-light)", textColor: "var(--danger-primary)" }
];

const allowedTransitions = {
  "NEW": ["IN_PROGRESS", "CANCELLED"],
  "IN_PROGRESS": ["COMPLETED", "CANCELLED"],
  "COMPLETED": [],
  "CANCELLED": []
};

function canChangeStatus(currentStatus, newStatus) {
  if (currentStatus === newStatus) return false;
  const allowed = allowedTransitions[currentStatus];
  return allowed ? allowed.includes(newStatus) : false;
}

export default function OrdersPage() {
  const { loading, error, run, setError } = useRequest();
  const [initialLoading, setInitialLoading] = useState(true);

  const [orders, setOrders] = useState([]);
  const [cars, setCars] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [allSpares, setAllSpares] = useState([]);

  const [selected, setSelected] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [form, setForm] = useState(emptyOrder);

  const [sortBy, setSortBy] = useState("orderDate");
  const [sortDir, setSortDir] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [carSearchQuery, setCarSearchQuery] = useState("");

  const isEditing = Boolean(selected?.id) && showCreateForm;

  function changeSort(field) {
    if (sortBy === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
  }

  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    if (searchQuery && searchQuery.length >= 3) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(order => {
        if (String(order.id).includes(q)) return true;
        if ((order.clientName || "").toLowerCase().includes(q)) return true;
        if ((order.description || "").toLowerCase().includes(q)) return true;
        const car = cars.find(c => c.id === order.carId);
        if (car && (car.licensePlate || "").toLowerCase().includes(q)) return true;
        return false;
      });
    }

    if (filterStatus) {
      filtered = filtered.filter(order => order.status === filterStatus);
    }

    return filtered;
  }, [orders, searchQuery, filterStatus, cars]);

  const sortedOrders = useMemo(() => {
    const sorted = [...filteredOrders];
    sorted.sort((a, b) => {
      let A, B;
      if (sortBy === "orderDate") {
        A = new Date(a.orderDate);
        B = new Date(b.orderDate);
        return sortDir === "asc" ? A - B : B - A;
      }
      if (sortBy === "clientName") {
        A = a.clientName || "";
        B = b.clientName || "";
        return sortDir === "asc" ? A.localeCompare(B) : B.localeCompare(A);
      }
      if (sortBy === "totalPrice") {
        A = a.totalPrice || 0;
        B = b.totalPrice || 0;
        return sortDir === "asc" ? A - B : B - A;
      }
      return 0;
    });
    return sorted;
  }, [filteredOrders, sortBy, sortDir]);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return sortedOrders.slice(start, end);
  }, [sortedOrders, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(sortedOrders.length / ITEMS_PER_PAGE);
  }, [sortedOrders.length]);

  const filteredCars = useMemo(() => {
    if (!carSearchQuery) return cars;
    const q = carSearchQuery.toLowerCase();
    return cars.filter(car =>
      (car.licensePlate || "").toLowerCase().includes(q) ||
      (car.brand || "").toLowerCase().includes(q) ||
      (car.model || "").toLowerCase().includes(q)
    );
  }, [cars, carSearchQuery]);

  async function loadInitial() {
    try {
      const [ordersData, carsData, servicesData, sparesData] = await Promise.all([
        api.orders.list(),
        api.cars.list(),
        api.services.list(),
        api.spares.list()
      ]);
      setOrders(ordersData || []);
      setCars(carsData || []);
      setAllServices(servicesData || []);
      setAllSpares(sparesData || []);
    } catch (e) {
      console.error("loadInitial error:", e);
      setError(e.message || "Ошибка загрузки данных");
    } finally {
      setInitialLoading(false);
    }
  }

  useEffect(() => {
    loadInitial();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus]);

  function onView(order) {
    setSelected(order);
    setShowViewModal(true);
    setShowCreateForm(false);
  }

  function startCreate() {
    setSelected(null);
    setShowCreateForm(true);
    setShowViewModal(false);
    setCarSearchQuery("");
    setForm({
      description: "",
      carId: "",
      services: [],
      spares: []
    });
    setError("");
  }

  function startEdit(order) {
    setSelected(order);
    setShowCreateForm(true);
    setShowViewModal(false);
    setCarSearchQuery("");

    const getServiceIds = () => {
      if (order.serviceIds && Array.isArray(order.serviceIds)) {
        return order.serviceIds.map(id => String(id));
      }
      if (order.services && Array.isArray(order.services)) {
        return order.services.map(s => String(s.id));
      }
      return [];
    };

    const getSpareIds = () => {
      if (order.spareIds && Array.isArray(order.spareIds)) {
        return order.spareIds.map(id => String(id));
      }
      if (order.spares && Array.isArray(order.spares)) {
        return order.spares.map(s => String(s.id));
      }
      return [];
    };

    setForm({
      description: order.description || "",
      carId: order.carId ? String(order.carId) : "",
      services: getServiceIds(),
      spares: getSpareIds()
    });
  }

  function validateForm() {
    if (!form.carId) {
      alert("Выберите автомобиль");
      return false;
    }
    return true;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    const payload = {
      description: form.description,
      status: isEditing ? selected.status : "NEW",
      carId: Number(form.carId),
      serviceIds: form.services.map(id => Number(id)),
      spareIds: form.spares.map(id => Number(id))
    };

    console.log("Submitting order:", payload);

    try {
      if (isEditing) {
        await run(() => api.orders.update(selected.id, payload));
        alert("Заказ успешно обновлён");
      } else {
        await run(() => api.orders.create(payload));
        alert("Заказ успешно добавлен");
        setShowCreateForm(false);
      }
      setSelected(null);
      setForm({
        description: "",
        carId: "",
        services: [],
        spares: []
      });
      await loadInitial();
    } catch (e) {
      console.error("Submit error:", e);
      alert(e.message || "Ошибка при сохранении");
    }
  }

  async function updateStatus(orderId, currentStatus, newStatus) {
    if (!canChangeStatus(currentStatus, newStatus)) {
      alert(`Невозможно изменить статус`);
      return;
    }

    if (!window.confirm(`Изменить статус заказа на "${getStatusLabel(newStatus)}"?`)) {
      return;
    }

    try {
      const currentOrder = orders.find(o => o.id === orderId);
      
      if (!currentOrder) {
        throw new Error("Заказ не найден в локальном списке");
      }

      const payload = {
        description: currentOrder.description || "",
        status: newStatus,
        carId: Number(currentOrder.carId),
        serviceIds: Array.isArray(currentOrder.serviceIds) 
          ? currentOrder.serviceIds.map(id => Number(id)) 
          : [],
        spareIds: Array.isArray(currentOrder.spareIds) 
          ? currentOrder.spareIds.map(id => Number(id)) 
          : []
      };

      console.log(`Updating status for order ${orderId}:`, payload);


      await run(() => api.orders.update(orderId, payload));


      if (selected?.id === orderId) {
        setSelected(prev => prev ? { ...prev, status: newStatus } : null);
      }

      await loadInitial();
      
      console.log(`✅ Статус изменён: ${currentStatus} → ${newStatus}`);
    } catch (err) {
      console.error("Status update error:", err);
      alert("Не удалось изменить статус: " + (err.message || "Ошибка"));
    }
  }

  async function onDelete(id) {
    if (!window.confirm("Удалить заказ?")) return;
    try {
      await run(() => api.orders.remove(id));
      if (selected?.id === id) {
        setSelected(null);
      }
      await loadInitial();
    } catch (e) {
      alert(e.message || "Ошибка при удалении");
    }
  }

  function formatDateTime(dateString) {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function formatDate(dateString) {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  }

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelected(null);
  };

  const closeCreateModal = () => {
    setShowCreateForm(false);
    setSelected(null);
    setCarSearchQuery("");
    setForm({
      description: "",
      carId: "",
      services: [],
      spares: []
    });
  };

  function getClientName(order) {
    if (order.clientName) return order.clientName;
    const car = cars.find(c => c.id === order.carId);
    if (car && car.clientName) {
      return car.clientName;
    }
    return "-";
  }

  function getCarInfo(order) {
    const car = cars.find(c => c.id === order.carId);
    if (car) {
      return `${car.brand} ${car.model} (${car.licensePlate})`;
    }
    return "-";
  }

  function getServicesList(order) {
    if (order.serviceNames && order.serviceNames.length > 0) {
      return order.serviceNames.join(", ");
    }
    return "-";
  }

  function getSparesList(order) {
    if (order.spareNames && order.spareNames.length > 0) {
      return order.spareNames.join(", ");
    }
    return "-";
  }

  const isSearchActive = (searchQuery && searchQuery.length >= 3) || filterStatus;
  const isLoading = loading || initialLoading;

  const getStatusIcon = (status) => {
    const icons = {
      "NEW": "📋",
      "IN_PROGRESS": "🔧",
      "COMPLETED": "✅",
      "CANCELLED": "❌"
    };
    return icons[status] || "📋";
  };

  const getStatusLabel = (status) => {
    const opt = statusOptions.find(s => s.value === status);
    return opt?.label || status;
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilterStatus("");
    setCurrentPage(1);
  };

  const toggleService = (serviceId) => {
    const stringId = String(serviceId);
    setForm(prev => {
      const currentIds = prev.services || [];
      const exists = currentIds.includes(stringId);
      const newServices = exists
        ? currentIds.filter(id => id !== stringId)
        : [...currentIds, stringId];
      return { ...prev, services: newServices };
    });
  };

  const toggleSpare = (spareId) => {
    const stringId = String(spareId);
    setForm(prev => {
      const currentIds = prev.spares || [];
      const exists = currentIds.includes(stringId);
      const newSpares = exists
        ? currentIds.filter(id => id !== stringId)
        : [...currentIds, stringId];
      return { ...prev, spares: newSpares };
    });
  };

  const isServiceSelected = (serviceId) => {
    return (form.services || []).includes(String(serviceId));
  };

  const isSpareSelected = (spareId) => {
    return (form.spares || []).includes(String(spareId));
  };

  const selectedServiceNames = useMemo(() => {
    return (form.services || [])
      .map(id => allServices.find(s => String(s.id) === id)?.name)
      .filter(Boolean);
  }, [form.services, allServices]);

  const selectedSpareNames = useMemo(() => {
    return (form.spares || [])
      .map(id => allSpares.find(s => String(s.id) === id)?.name)
      .filter(Boolean);
  }, [form.spares, allSpares]);

  return (
    <div className="orders-page">
      <div className="controls-container">

        <div className="filter-bar">
          <div className="filter-row">
            <div className="filter-field">
              <label>Поиск</label>
              <input
                type="text"
                placeholder="По номеру, клиенту, описанию или гос. номеру (3+ символа)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-field">
              <label>Статус</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-input"
              >
                <option value="">Все статусы</option>
                {statusOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="actions-row">
          <div className="sort-controls">
            <span className="sort-label">Сортировать:</span>
            <button
              className={`btn btn-sort ${sortBy === "orderDate" ? "active" : ""}`}
              onClick={() => changeSort("orderDate")}
            >
              По дате {sortBy === "orderDate" && (sortDir === "asc" ? "↑" : "↓")}
            </button>
            <button
              className={`btn btn-sort ${sortBy === "clientName" ? "active" : ""}`}
              onClick={() => changeSort("clientName")}
            >
              По клиенту {sortBy === "clientName" && (sortDir === "asc" ? "↑" : "↓")}
            </button>
            <button
              className={`btn btn-sort ${sortBy === "totalPrice" ? "active" : ""}`}
              onClick={() => changeSort("totalPrice")}
            >
              По сумме {sortBy === "totalPrice" && (sortDir === "asc" ? "↑" : "↓")}
            </button>
          </div>

          <div className="actions-group">
            {isSearchActive && (
              <button className="btn btn-ghost" type="button" onClick={clearFilters}>
                Сбросить фильтры
              </button>
            )}
            <button className="btn btn-primary btn-xl" type="button" onClick={startCreate}>
              + Добавить заказ
            </button>
          </div>
        </div>

      </div>

      {error && <Message type="error">{error}</Message>}

      {isLoading ? (
        <div className="orders-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="order-card skeleton">
              <div className="order-icon skeleton-icon"></div>
              <div className="order-info">
                <div className="order-client skeleton-text"></div>
                <div className="order-date skeleton-text"></div>
                <div className="order-status skeleton-text"></div>
              </div>
              <div className="order-card-actions skeleton-actions"></div>
            </div>
          ))}
        </div>
      ) : sortedOrders.length === 0 ? (
        <EmptyState>
          {isSearchActive ? "По вашему запросу ничего не найдено" : "Нет заказов"}
        </EmptyState>
      ) : (
        <>
          <div className="orders-grid">
            {paginatedOrders.map(order => {
              const statusInfo = statusOptions.find(s => s.value === order.status);
              return (
                <div key={order.id} className="order-card">
                  <div className="order-icon">
                    {getStatusIcon(order.status)}
                  </div>
                  <div className="order-info">
                    <div className="order-number">Заказ #{order.id}</div>
                    <div className="order-client" title={getClientName(order)}>
                      {getClientName(order)}
                    </div>
                    <div className="order-details">
                      <span className="order-date">{formatDate(order.orderDate)}</span>
                      <span className="detail-separator">•</span>
                      <span className="order-price">{order.totalPrice || 0} Br</span>
                    </div>
                    <div
                      className="order-status"
                      style={{
                        backgroundColor: statusInfo?.color,
                        color: statusInfo?.textColor
                      }}
                    >
                      {statusInfo?.label}
                    </div>
                    <div className="order-status-actions">
                      {canChangeStatus(order.status, "IN_PROGRESS") && (
                        <button
                          className="status-btn status-in-progress"
                          onClick={() => updateStatus(order.id, order.status, "IN_PROGRESS")}
                          title="В работу"
                        >
                          🔧
                        </button>
                      )}
                      {canChangeStatus(order.status, "COMPLETED") && (
                        <button
                          className="status-btn status-completed"
                          onClick={() => updateStatus(order.id, order.status, "COMPLETED")}
                          title="Выполнить"
                        >
                          ✅
                        </button>
                      )}
                      {canChangeStatus(order.status, "CANCELLED") && (
                        <button
                          className="status-btn status-cancelled"
                          onClick={() => updateStatus(order.id, order.status, "CANCELLED")}
                          title="Отменить"
                        >
                          ❌
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="order-card-actions">
                    <button
                      className="btn btn-view"
                      type="button"
                      onClick={() => onView(order)}
                      title="Просмотр деталей"
                    >
                      👁️
                    </button>
                    <button
                      className="btn btn-edit"
                      type="button"
                      onClick={() => startEdit(order)}
                      title="Редактировать"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-delete"
                      type="button"
                      onClick={() => onDelete(order.id)}
                      title="Удалить"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="btn btn-page"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                ← Назад
              </button>
              <div className="page-numbers">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={`page-number ${currentPage === i + 1 ? "active" : ""}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                className="btn btn-page"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Вперед →
              </button>
            </div>
          )}
        </>
      )}

      {showViewModal && selected && (
        <div className="modal-backdrop" onClick={closeViewModal}>
          <div className="modal modal-view" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-title">
                <span className="modal-icon">📋</span>
                <h3>Заказ #{selected.id}</h3>
              </div>
              <button className="btn btn-close" type="button" onClick={closeViewModal}>
                ✕
              </button>
            </div>

            <div className="view-content">
              <div className="view-header">
                <div
                  className="view-status"
                  style={{
                    backgroundColor: statusOptions.find(s => s.value === selected.status)?.color,
                    color: statusOptions.find(s => s.value === selected.status)?.textColor
                  }}
                >
                  {getStatusIcon(selected.status)} {statusOptions.find(s => s.value === selected.status)?.label}
                </div>
              </div>

              <div className="details-grid">
                <div className="detail-item">
                  <label>📅 Дата создания</label>
                  <p>{formatDateTime(selected.orderDate)}</p>
                </div>
                <div className="detail-item">
                  <label>💰 Сумма</label>
                  <p className="detail-value">{selected.totalPrice || 0} Br</p>
                </div>
                <div className="detail-item">
                  <label>🚗 Автомобиль</label>
                  <p>{getCarInfo(selected)}</p>
                </div>
                <div className="detail-item">
                  <label>👤 Клиент</label>
                  <p>{getClientName(selected)}</p>
                </div>
                <div className="detail-item">
                  <label>🔧 Услуги</label>
                  <p>{getServicesList(selected)}</p>
                </div>
                <div className="detail-item">
                  <label>📦 Запчасти</label>
                  <p>{getSparesList(selected)}</p>
                </div>
                <div className="detail-item full-width">
                  <label>📝 Описание</label>
                  <p className="detail-description">{selected.description || "—"}</p>
                </div>
              </div>

              {(allowedTransitions[selected.status]?.length > 0) && (
                <div className="status-actions-section">
                  <h4>Изменить статус:</h4>
                  <div className="status-buttons">
                    {canChangeStatus(selected.status, "IN_PROGRESS") && (
                      <button
                        className="btn btn-status btn-in-progress"
                        onClick={() => {
                          updateStatus(selected.id, selected.status, "IN_PROGRESS");
                          closeViewModal();
                        }}
                      >
                        🔧 В работу
                      </button>
                    )}
                    {canChangeStatus(selected.status, "COMPLETED") && (
                      <button
                        className="btn btn-status btn-completed"
                        onClick={() => {
                          updateStatus(selected.id, selected.status, "COMPLETED");
                          closeViewModal();
                        }}
                      >
                        ✅ Выполнить
                      </button>
                    )}
                    {canChangeStatus(selected.status, "CANCELLED") && (
                      <button
                        className="btn btn-status btn-cancelled"
                        onClick={() => {
                          updateStatus(selected.id, selected.status, "CANCELLED");
                          closeViewModal();
                        }}
                      >
                        ❌ Отменить
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="view-actions">
                <button
                  className="btn btn-delete-action"
                  onClick={() => {
                    onDelete(selected.id);
                    closeViewModal();
                  }}
                >
                  🗑️ Удалить заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCreateForm && (
        <div className="modal-backdrop" onClick={closeCreateModal}>
          <div className="modal modal-form" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-title">
                <span className="modal-icon">{isEditing ? "✏️" : "➕"}</span>
                <h3>{isEditing ? "Редактирование заказа" : "Добавление заказа"}</h3>
              </div>
              <button className="btn btn-close" type="button" onClick={closeCreateModal}>
                ✕
              </button>
            </div>

            <form onSubmit={onSubmit} className="form-grid">
              <div className="form-row">
                <div className="form-field">
                  <label>Автомобиль *</label>
                  <input
                    type="text"
                    placeholder="Поиск по номеру или марке..."
                    value={carSearchQuery}
                    onChange={(e) => setCarSearchQuery(e.target.value)}
                    className="car-search-input"
                  />
                  <select
                    required
                    value={form.carId}
                    onChange={(e) => setForm(p => ({ ...p, carId: e.target.value }))}
                    className="car-select"
                  >
                    <option value="">Выберите автомобиль</option>
                    {filteredCars.map(car => (
                      <option key={car.id} value={car.id}>
                        {car.brand} {car.model} ({car.licensePlate})
                      </option>
                    ))}
                  </select>
                  {carSearchQuery && filteredCars.length === 0 && (
                    <div className="no-results-hint">Автомобили не найдены</div>
                  )}
                </div>

                {!isEditing && (
                  <div className="form-field">
                    <label>Статус</label>
                    <div className="status-new-only">
                      <span className="status-badge status-new">📋 Новый</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="services-label">
                    Услуги
                    {form.services.length > 0 && (
                      <span className="services-count">({form.services.length} выбрано)</span>
                    )}
                  </label>
                  <div className="services-checkbox-list">
                    {allServices.length === 0 ? (
                      <div className="no-services-message">Нет доступных услуг</div>
                    ) : (
                      allServices.map(service => {
                        const isSelected = isServiceSelected(service.id);
                        return (
                          <div
                            key={`service-${service.id}`}
                            className={`service-checkbox ${isSelected ? 'checked' : ''}`}
                            onClick={() => toggleService(service.id)}
                          >
                            <span className={`checkbox-custom ${isSelected ? 'checked' : ''}`}>
                              {isSelected && <span className="check-mark">✓</span>}
                            </span>
                            <span className="service-name">{service.name}</span>
                            <span className="service-price">{service.price} Br</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                  {selectedServiceNames.length > 0 && (
                    <div className="selected-services-list">
                      <div className="selected-tags">
                        {selectedServiceNames.map((name, idx) => (
                          <span key={idx} className="service-tag">{name}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-field">
                  <label className="services-label">
                    Запчасти
                    {form.spares.length > 0 && (
                      <span className="services-count">({form.spares.length} выбрано)</span>
                    )}
                  </label>
                  <div className="services-checkbox-list">
                    {allSpares.length === 0 ? (
                      <div className="no-services-message">Нет доступных запчастей</div>
                    ) : (
                      allSpares.map(spare => {
                        const isSelected = isSpareSelected(spare.id);
                        return (
                          <div
                            key={`spare-${spare.id}`}
                            className={`service-checkbox ${isSelected ? 'checked' : ''}`}
                            onClick={() => toggleSpare(spare.id)}
                          >
                            <span className={`checkbox-custom ${isSelected ? 'checked' : ''}`}>
                              {isSelected && <span className="check-mark">✓</span>}
                            </span>
                            <span className="service-name">{spare.name}</span>
                            <span className="service-price">{spare.price} Br</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                  {selectedSpareNames.length > 0 && (
                    <div className="selected-services-list">
                      <div className="selected-tags">
                        {selectedSpareNames.map((name, idx) => (
                          <span key={idx} className="service-tag">{name}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-field">
                <label>Описание</label>
                <textarea
                  placeholder="Описание заказа"
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-cancel" onClick={closeCreateModal}>
                  Отмена
                </button>
                <button className="btn btn-submit" disabled={loading} type="submit">
                  {isEditing ? "Сохранить" : "Создать"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        :root {
          --bg-primary: #f9fafb;
          --bg-secondary: #ffffff;
          --bg-tertiary: #f3f4f6;
          --text-primary: #111827;
          --text-secondary: #4b5563;
          --text-muted: #9ca3af;
          --border-color: #e5e7eb;
          --border-color-hover: #d1d5db;
          --accent-primary: #2563eb;
          --accent-hover: #1d4ed8;
          --accent-light: #eff6ff;
          --danger-primary: #dc2626;
          --danger-hover: #b91c1c;
          --danger-light: #fef2f2;
          --success-primary: #16a34a;
          --success-light: #f0fdf4;
          --warning-primary: #d97706;
          --warning-light: #fffbeb;
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          --modal-backdrop: rgba(0, 0, 0, 0.5);
        }

        [data-theme="dark"], .dark-theme {
          --bg-primary: #111827;
          --bg-secondary: #1f2937;
          --bg-tertiary: #374151;
          --text-primary: #f9fafb;
          --text-secondary: #d1d5db;
          --text-muted: #6b7280;
          --border-color: #374151;
          --border-color-hover: #4b5563;
          --accent-primary: #3b82f6;
          --accent-hover: #2563eb;
          --accent-light: rgba(59, 130, 246, 0.15);
          --danger-primary: #ef4444;
          --danger-hover: #dc2626;
          --danger-light: rgba(239, 68, 68, 0.15);
          --success-primary: #22c55e;
          --success-light: rgba(34, 197, 94, 0.15);
          --warning-primary: #f59e0b;
          --warning-light: rgba(245, 158, 11, 0.15);
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
          --modal-backdrop: rgba(0, 0, 0, 0.7);
        }

        .orders-page {
          padding: 1rem;
          min-height: 100%;
          background-color: var(--bg-primary);
          margin-top: 0;
        }

        .controls-container {
          margin-bottom: 1.5rem;
          margin-top: 0;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          box-shadow: var(--shadow-sm);
        }

        .filter-bar {
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .filter-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filter-field {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
          min-width: 150px;
        }

        .filter-field label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .filter-input {
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.875rem;
          color: var(--text-primary);
          background: var(--bg-secondary);
        }

        .filter-input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .actions-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .sort-controls {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .sort-label {
          font-size: 0.875rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .btn-sort {
          padding: 0.4rem 0.8rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .btn-sort:hover {
          background: var(--bg-tertiary);
          border-color: var(--border-color-hover);
        }

        .btn-sort.active {
          background: var(--accent-light);
          color: var(--accent-primary);
          border-color: var(--accent-primary);
        }

        .actions-group {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .btn-xl {
          padding: 0.75rem 1.75rem;
          font-size: 1rem;
          font-weight: 600;
        }

        .btn-primary {
          background: var(--accent-primary);
          color: white;
        }

        .btn-primary:hover {
          background: var(--accent-hover);
        }

        .btn-ghost {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid transparent;
        }

        .btn-ghost:hover {
          color: var(--text-primary);
          background: var(--bg-tertiary);
        }

        .orders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1rem;
        }

        .order-card {
          display: grid;
          grid-template-columns: 70px 1fr auto;
          align-items: stretch;
          gap: 1.25rem;
          padding: 1.5rem;
          background: var(--bg-secondary);
          border-radius: 8px;
          border: 1px solid var(--border-color);
          transition: all 0.2s ease;
        }

        .order-card:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--border-color-hover);
        }

        .order-card.skeleton {
          animation: none;
        }

        .order-icon {
          width: 70px;
          height: 70px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          flex-shrink: 0;
          background: var(--bg-tertiary);
        }

        .skeleton-icon {
          background: var(--border-color);
          animation: pulse 1.5s infinite;
        }

        .order-info {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .order-number {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .order-client {
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .order-details {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .order-date,
        .order-price {
          font-size: 0.95rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .detail-separator {
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .order-status {
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.35rem 0.65rem;
          border-radius: 4px;
          display: inline-block;
          width: fit-content;
        }

        .order-status-actions {
          display: flex;
          gap: 0.35rem;
          flex-wrap: wrap;
          margin-top: 0.35rem;
        }

        .status-btn {
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.1rem;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .status-btn:hover {
          transform: scale(1.1);
        }

        .status-in-progress {
          background: var(--warning-light);
          color: var(--warning-primary);
        }

        .status-in-progress:hover {
          background: var(--warning-primary);
          color: white;
        }

        .status-completed {
          background: var(--success-light);
          color: var(--success-primary);
        }

        .status-completed:hover {
          background: var(--success-primary);
          color: white;
        }

        .status-cancelled {
          background: var(--danger-light);
          color: var(--danger-primary);
        }

        .status-cancelled:hover {
          background: var(--danger-primary);
          color: white;
        }

        .order-card-actions {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
        }

        .skeleton-actions {
          width: 40px;
          height: 120px;
          background: var(--border-color);
          border-radius: 6px;
          animation: pulse 1.5s infinite;
        }

        .btn-view,
        .btn-edit,
        .btn-delete {
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.1rem;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .btn-view {
          background: var(--accent-light);
          color: var(--accent-primary);
        }

        .btn-view:hover {
          filter: brightness(0.95);
        }

        .btn-edit {
          background: var(--accent-light);
          color: var(--accent-primary);
        }

        .btn-edit:hover {
          filter: brightness(0.95);
        }

        .btn-delete {
          background: var(--danger-light);
          color: var(--danger-primary);
        }

        .btn-delete:hover {
          filter: brightness(0.95);
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .btn-page {
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
        .btn-page:hover:not(:disabled) {
          background: var(--bg-tertiary);
          border-color: var(--border-color-hover);
        }
        .btn-page:disabled { opacity: 0.5; cursor: not-allowed; }

        .page-numbers { display: flex; gap: 0.25rem; }

        .page-number {
          width: 36px;
          height: 36px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
        }
        .page-number:hover { background: var(--bg-tertiary); }
        .page-number.active {
          background: var(--accent-primary);
          color: white;
          border-color: var(--accent-primary);
        }

        .modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: var(--modal-backdrop);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: var(--bg-secondary);
          border-radius: 8px;
          padding: 1.5rem;
          width: 100%;
          max-width: 700px;
          max-height: 90vh;
          overflow-y: auto;
          border: 1px solid var(--border-color);
        }

        .modal-view {
          max-width: 750px;
        }

        .modal-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }

        .modal-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .modal-icon {
          font-size: 1.5rem;
        }

        .modal-title h3 {
          margin: 0;
          font-size: 1.25rem;
          color: var(--text-primary);
        }

        .btn-close {
          width: 32px; height: 32px;
          border: none; background: transparent;
          font-size: 1.25rem; color: var(--text-secondary);
          cursor: pointer;
        }
        .btn-close:hover { color: var(--text-primary); }

        .view-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .view-header {
          display: flex;
          justify-content: center;
          padding: 1rem;
          background: var(--bg-tertiary);
          border-radius: 8px;
        }

        .view-status {
          font-size: 1.1rem;
          font-weight: 600;
          padding: 0.6rem 1.75rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .detail-item {
          padding: 1.25rem;
          background: var(--bg-tertiary);
          border-radius: 8px;
        }

        .detail-item label {
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text-secondary);
          display: block;
          margin-bottom: 0.6rem;
        }

        .detail-item p {
          margin: 0;
          font-size: 1.05rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .detail-value {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--accent-primary);
        }

        .detail-description {
          white-space: pre-wrap;
          word-break: break-word;
        }

        .full-width {
          grid-column: span 2;
        }

        .status-actions-section {
          padding: 1.25rem;
          background: var(--bg-tertiary);
          border-radius: 8px;
        }

        .status-actions-section h4 {
          margin: 0 0 1rem 0;
          font-size: 0.95rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .status-buttons {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .btn-status {
          padding: 0.65rem 1.25rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 600;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .btn-status:hover {
          transform: translateY(-2px);
        }

        .btn-in-progress {
          background: var(--warning-light);
          color: var(--warning-primary);
        }

        .btn-in-progress:hover {
          background: var(--warning-primary);
          color: white;
        }

        .btn-completed {
          background: var(--success-light);
          color: var(--success-primary);
        }

        .btn-completed:hover {
          background: var(--success-primary);
          color: white;
        }

        .btn-cancelled {
          background: var(--danger-light);
          color: var(--danger-primary);
        }

        .btn-cancelled:hover {
          background: var(--danger-primary);
          color: white;
        }

        .view-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .btn-delete-action {
          background: var(--danger-light);
          color: var(--danger-primary);
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .btn-delete-action:hover {
          background: var(--danger-primary);
          color: white;
        }

        .form-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
          min-width: 200px;
        }

        .form-field label {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .services-label {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .services-count {
          font-weight: 600;
          color: var(--accent-primary);
          font-size: 0.85rem;
        }

        .car-search-input {
          padding: 0.6rem 0.85rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.95rem;
          background: var(--bg-secondary);
          color: var(--text-primary);
        }

        .car-search-input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .car-select {
          padding: 0.6rem 0.85rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.95rem;
          background: var(--bg-secondary);
          color: var(--text-primary);
          max-height: 200px;
        }

        .car-select:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .no-results-hint {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-style: italic;
          padding: 0.5rem;
          background: var(--bg-tertiary);
          border-radius: 4px;
          text-align: center;
        }

        .status-new-only {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.6rem 0.85rem;
          background: var(--accent-light);
          border-radius: 6px;
        }

        .status-badge {
          font-size: 0.95rem;
          font-weight: 600;
          padding: 0.35rem 0.6rem;
          border-radius: 4px;
        }

        .status-new {
          background: var(--accent-light);
          color: var(--accent-primary);
        }

        .form-field input,
        .form-field textarea,
        .form-field select {
          padding: 0.6rem 0.85rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.95rem;
          background: var(--bg-secondary);
          color: var(--text-primary);
        }

        .form-field textarea {
          resize: vertical;
          font-family: inherit;
        }

        .form-field input:focus,
        .form-field select:focus,
        .form-field textarea:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .services-checkbox-list {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          max-height: 180px;
          overflow-y: auto;
          padding: 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
        }

        .service-checkbox {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.65rem 0.85rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          user-select: none;
        }

        .service-checkbox:hover {
          background: var(--bg-tertiary);
        }

        .service-checkbox.checked {
          background: var(--accent-light);
        }

        .checkbox-custom {
          width: 22px;
          height: 22px;
          border: 2px solid var(--border-color);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s;
          background: var(--bg-secondary);
        }

        .checkbox-custom.checked {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
        }

        .check-mark {
          color: white;
          font-size: 15px;
          font-weight: bold;
          line-height: 1;
        }

        .service-name {
          flex: 1;
          font-size: 0.95rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .service-price {
          font-size: 0.9rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .no-services-message {
          padding: 1.25rem;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .selected-services-list {
          margin-top: 0.6rem;
          padding: 0.75rem;
          background: var(--bg-tertiary);
          border-radius: 6px;
        }

        .selected-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .service-tag {
          display: inline-block;
          padding: 0.35rem 0.65rem;
          background: var(--accent-light);
          color: var(--accent-primary);
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .form-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .btn-cancel {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }
        .btn-cancel:hover { background: var(--bg-tertiary); }

        .btn-submit {
          background: var(--accent-primary);
          color: white;
        }
        .btn-submit:hover:not(:disabled) { background: var(--accent-hover); }
        .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        .skeleton { animation: pulse 1.5s infinite; background: var(--bg-tertiary); }
        @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.8; } }
        .skeleton-text { height: 1rem; background: var(--border-color); border-radius: 4px; }

        @media (max-width: 768px) {
          .actions-row { flex-direction: column; align-items: stretch; }
          .sort-controls { justify-content: center; margin-bottom: 0.5rem; }
          .actions-group { justify-content: center; }
          .orders-grid { grid-template-columns: 1fr; }
          .order-card { grid-template-columns: 60px 1fr; }
          .order-card-actions { grid-column: 2; flex-direction: row; justify-content: flex-end; }
          .filter-row { flex-direction: column; }
          .modal { min-width: 90%; margin: 1rem; }
          .form-row { flex-direction: column; }
          .pagination { flex-wrap: wrap; }
          .details-grid { grid-template-columns: 1fr; }
          .full-width { grid-column: span 1; }
          .view-actions { flex-direction: column; }
          .view-actions .btn { width: 100%; }
        }
      `}</style>
    </div>
  );
}