import { useEffect, useMemo, useState } from "react";
import { api } from "../api/carServiceApi";
import { useRequest } from "../hooks/useRequest";
import { EmptyState, Message } from "../components/UiBlocks";

const emptyMechanic = {
  firstName: "",
  lastName: "",
  phone: "",
  hireDate: "",
  serviceIds: []
};

const ITEMS_PER_PAGE = 18;

export default function MechanicsPage() {
  const { loading, error, run, setError } = useRequest();
  const [initialLoading, setInitialLoading] = useState(true);

  const [allMechanics, setAllMechanics] = useState([]);
  const [services, setServices] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [selected, setSelected] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [form, setForm] = useState({ ...emptyMechanic, serviceIds: [] });

  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const isEditing = useMemo(() => Boolean(selected?.id), [selected]);

  function changeSort(field) {
    if (sortBy === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
  }

  async function loadAll() {
    try {
      const [mData, sData] = await Promise.all([
        api.mechanics.list(),
        api.services.list()
      ]);
      setAllMechanics(mData || []);
      setServices(sData || []);
    } catch (e) {
      console.error("loadAll error:", e);
      setError(e.message || "Ошибка загрузки данных");
      setAllMechanics([]);
    } finally {
      setInitialLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredMechanics = useMemo(() => {
    let filtered = [...allMechanics];

    if (searchQuery && searchQuery.length >= 2) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((m) =>
        (m.firstName || "").toLowerCase().includes(q) ||
        (m.lastName || "").toLowerCase().includes(q) ||
        (m.phone || "").toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [allMechanics, searchQuery]);

  const sortedMechanics = useMemo(() => {
    const sorted = [...filteredMechanics];

    sorted.sort((a, b) => {
      let A, B;

      if (sortBy === "name") {
        A = `${a.firstName} ${a.lastName}`;
        B = `${b.firstName} ${b.lastName}`;
        return sortDir === "asc"
          ? A.localeCompare(B)
          : B.localeCompare(A);
      }

      if (sortBy === "phone") {
        A = a.phone || "";
        B = b.phone || "";
        return sortDir === "asc"
          ? A.localeCompare(B)
          : B.localeCompare(A);
      }

      if (sortBy === "hireDate") {
        A = a.hireDate || "";
        B = b.hireDate || "";
        return sortDir === "asc"
          ? A.localeCompare(B)
          : B.localeCompare(A);
      }

      if (sortBy === "services") {
        A = (a.serviceNames || []).length;
        B = (b.serviceNames || []).length;
        return sortDir === "asc" ? A - B : B - A;
      }
      return 0;
    });

    return sorted;
  }, [filteredMechanics, sortBy, sortDir]);

  const paginatedMechanics = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return sortedMechanics.slice(start, end);
  }, [sortedMechanics, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(sortedMechanics.length / ITEMS_PER_PAGE);
  }, [sortedMechanics.length]);

  function onSelect(mechanic) {
    setSelected(mechanic);
    setShowCreateForm(false);

    const validIds = (mechanic.serviceIds || [])
      .filter(id => id != null && id !== "" && id !== "null" && id !== "undefined")
      .map(id => String(id));

    setForm({
      firstName: mechanic.firstName || "",
      lastName: mechanic.lastName || "",
      phone: mechanic.phone || "",
      hireDate: mechanic.hireDate || "",
      serviceIds: validIds
    });
  }

  function startCreate() {
    setSelected(null);
    setForm({
      firstName: "",
      lastName: "",
      phone: "",
      hireDate: "",
      serviceIds: []
    });
    setShowCreateForm(true);
    setError("");
  }

  function clearSearch() {
    setSearchQuery("");
    setCurrentPage(1);
  }

  function validateForm() {
    if (!form.firstName.trim()) {
      alert("Введите имя механика");
      return false;
    }
    if (!form.lastName.trim()) {
      alert("Введите фамилию механика");
      return false;
    }
    return true;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      const currentFormState = { ...form };

      const validServiceIds = (currentFormState.serviceIds || [])
        .filter(id => id != null && id !== "" && id !== "null" && id !== "undefined")
        .map(id => Number(id));

      const payload = {
        firstName: currentFormState.firstName,
        lastName: currentFormState.lastName,
        phone: currentFormState.phone || null,
        hireDate: currentFormState.hireDate || null,
        serviceIds: validServiceIds
      };

      if (isEditing) {
        await run(() => api.mechanics.update(selected.id, payload));
        alert("Механик успешно обновлён");
      } else {
        await run(() => api.mechanics.create(payload));
        alert("Механик успешно добавлен");
        setShowCreateForm(false);
      }

      setSelected(null);
      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        hireDate: "",
        serviceIds: []
      });
      await loadAll();
    } catch (e) {
      console.error("❌ Ошибка сохранения:", e);
      alert(e.message || "Ошибка при сохранении");
    }
  }

  async function onDelete(id) {
    if (!window.confirm("Удалить механика?")) return;

    try {
      await run(() => api.mechanics.remove(id));

      if (selected?.id === id) {
        setSelected(null);
        setForm({
          firstName: "",
          lastName: "",
          phone: "",
          hireDate: "",
          serviceIds: []
        });
      }

      alert("Механик успешно удалён");
      await loadAll();
    } catch (e) {
      console.error("❌ Ошибка удаления:", e);
      alert(e.message || "Ошибка при удалении");
    }
  }

  const showForm = isEditing || showCreateForm;

  const closeModal = () => {
    setSelected(null);
    setShowCreateForm(false);
    setForm({
      firstName: "",
      lastName: "",
      phone: "",
      hireDate: "",
      serviceIds: []
    });
  };

  const isSearchActive = searchQuery && searchQuery.length >= 2;
  const isLoading = loading || initialLoading;

  function getMechanicWord(count) {
    if (count % 10 === 1 && count % 100 !== 11) return "механик";
    if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) return "механика";
    return "механиков";
  }

  const getInitials = (firstName, lastName) => {
    const f = firstName?.charAt(0) || "";
    const l = lastName?.charAt(0) || "";
    return (f + l).toUpperCase();
  };

  const toggleService = (serviceId) => {
    if (serviceId == null) return;

    const stringId = String(serviceId);

    setForm(prev => {
      const currentIds = Array.isArray(prev.serviceIds) ? prev.serviceIds : [];
      const exists = currentIds.includes(stringId);

      const newServiceIds = exists
        ? currentIds.filter(id => id !== stringId)
        : [...currentIds, stringId];

      return {
        ...prev,
        serviceIds: newServiceIds
      };
    });
  };

  const isServiceSelected = (serviceId) => {
    if (serviceId == null) return false;
    const ids = Array.isArray(form.serviceIds) ? form.serviceIds : [];
    return ids.includes(String(serviceId));
  };

  const selectedServiceNames = useMemo(() => {
    if (!Array.isArray(form.serviceIds)) return [];
    return form.serviceIds
      .map(id => services.find(s => String(s.id) === id)?.name)
      .filter(Boolean);
  }, [form.serviceIds, services]);

  return (
    <div className="mechanics-page">
      <div className="controls-container">

        <div className="filter-bar">
          <div className="filter-row">
            <div className="filter-field">
              <label>Поиск</label>
              <input
                type="text"
                placeholder="По имени, фамилии или телефону (2+ символа)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="filter-input"
              />
            </div>
          </div>
        </div>

        <div className="actions-row">
          <div className="sort-controls">
            <span className="sort-label">Сортировать:</span>
            <button
              className={`btn btn-sort ${sortBy === "name" ? "active" : ""}`}
              onClick={() => changeSort("name")}
            >
              По имени {sortBy === "name" && (sortDir === "asc" ? "↑" : "↓")}
            </button>
            <button
              className={`btn btn-sort ${sortBy === "phone" ? "active" : ""}`}
              onClick={() => changeSort("phone")}
            >
              По телефону {sortBy === "phone" && (sortDir === "asc" ? "↑" : "↓")}
            </button>
            <button
              className={`btn btn-sort ${sortBy === "hireDate" ? "active" : ""}`}
              onClick={() => changeSort("hireDate")}
            >
              По дате найма {sortBy === "hireDate" && (sortDir === "asc" ? "↑" : "↓")}
            </button>
            <button
              className={`btn btn-sort ${sortBy === "services" ? "active" : ""}`}
              onClick={() => changeSort("services")}
            >
              По услугам {sortBy === "services" && (sortDir === "asc" ? "↑" : "↓")}
            </button>
          </div>

          <div className="actions-group">
            {isSearchActive && (
              <button className="btn btn-ghost" type="button" onClick={clearSearch}>
                Сбросить фильтры
              </button>
            )}
            <button className="btn btn-primary btn-xl" type="button" onClick={startCreate}>
              + Добавить механика
            </button>
          </div>
        </div>

      </div>

      {error && <Message type="error">{error}</Message>}

      {isLoading ? (
        <div className="mechanics-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="mechanic-card skeleton">
              <div className="mechanic-avatar skeleton-avatar"></div>
              <div className="mechanic-info">
                <div className="mechanic-name skeleton-text"></div>
                <div className="mechanic-phone skeleton-text"></div>
                <div className="mechanic-services skeleton-text"></div>
              </div>
              <div className="mechanic-actions skeleton-actions"></div>
            </div>
          ))}
        </div>
      ) : sortedMechanics.length === 0 ? (
        <EmptyState>
          {isSearchActive ? "По вашему запросу ничего не найдено" : "Нет механиков"}
        </EmptyState>
      ) : (
        <>
          <div className="mechanics-grid">
            {paginatedMechanics.map((m) => (
              <div key={m.id} className="mechanic-card">
                <div className="mechanic-avatar">
                  {getInitials(m.firstName, m.lastName)}
                </div>
                <div className="mechanic-info">
                  <div className="mechanic-name" title={`${m.firstName} ${m.lastName}`}>
                    {m.firstName} {m.lastName}
                  </div>
                  <div className="mechanic-details">
                    <span className="detail-item" title={m.phone}>{m.phone || "—"}</span>
                    {m.hireDate && (
                      <>
                        <span className="detail-separator">•</span>
                        <span className="detail-item">{m.hireDate}</span>
                      </>
                    )}
                  </div>
                  <div className="mechanic-services" title={(m.serviceNames || []).join(", ")}>
                    {(m.serviceNames || []).length > 0
                      ? `${(m.serviceNames || []).length} усл.`
                      : "Нет услуг"}
                  </div>
                </div>
                <div className="mechanic-actions">
                  <button
                    className="btn btn-edit"
                    type="button"
                    onClick={() => onSelect(m)}
                    title="Редактировать"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-delete"
                    type="button"
                    onClick={() => onDelete(m.id)}
                    title="Удалить"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
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

      {showForm && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()} key={`form-${selected?.id || 'new'}`}>
            <div className="modal-head">
              <div className="modal-title">
                <h3>{isEditing ? "Редактирование механика" : "Добавление механика"}</h3>
              </div>
              <button className="btn btn-close" type="button" onClick={closeModal}>
                ✕
              </button>
            </div>

            <form className="form-grid" onSubmit={onSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label>Имя *</label>
                  <input
                    required
                    placeholder="Имя"
                    value={form.firstName}
                    onChange={(e) => setForm(p => ({ ...p, firstName: e.target.value }))}
                  />
                </div>

                <div className="form-field">
                  <label>Фамилия *</label>
                  <input
                    required
                    placeholder="Фамилия"
                    value={form.lastName}
                    onChange={(e) => setForm(p => ({ ...p, lastName: e.target.value }))}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Телефон</label>
                  <input
                    placeholder="+375 XX XXX XX XX"
                    value={form.phone}
                    onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
                  />
                </div>

                <div className="form-field">
                  <label>Дата найма</label>
                  <input
                    type="date"
                    value={form.hireDate}
                    onChange={(e) => setForm(p => ({ ...p, hireDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="services-label">
                  Услуги
                  {form.serviceIds && form.serviceIds.length > 0 && (
                    <span className="services-count">({form.serviceIds.length} выбрано)</span>
                  )}
                </label>

                <div className="services-checkbox-list">
                  {services.length === 0 ? (
                    <div className="no-services-message">Нет доступных услуг</div>
                  ) : (
                    services.map((service, index) => {
                      const serviceId = service.id != null ? service.id : `temp-${index}`;
                      const isSelected = isServiceSelected(serviceId);

                      return (
                        <div
                          key={service.id != null ? `service-${service.id}` : `service-${index}`}
                          className={`service-checkbox ${isSelected ? 'checked' : ''}`}
                          onClick={() => toggleService(serviceId)}
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

              <div className="form-actions">
                <button type="button" className="btn btn-cancel" onClick={closeModal}>
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
          --danger-light: #fef2f2;
          --danger-hover: #fee2e2;
          --success-primary: #16a34a;
          --success-light: #f0fdf4;
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
          --danger-light: rgba(239, 68, 68, 0.15);
          --danger-hover: rgba(239, 68, 68, 0.25);
          --success-primary: #22c55e;
          --success-light: rgba(34, 197, 94, 0.15);
          --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
          --modal-backdrop: rgba(0, 0, 0, 0.7);
        }

        .mechanics-page {
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

        .mechanics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1rem;
        }

        .mechanic-card {
          display: grid;
          grid-template-columns: 60px 1fr auto;
          align-items: center;
          gap: 1.25rem;
          padding: 1.25rem;
          background: var(--bg-secondary);
          border-radius: 8px;
          border: 1px solid var(--border-color);
          transition: all 0.2s ease;
        }

        .mechanic-card:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--border-color-hover);
        }

        .mechanic-card.skeleton {
          animation: none;
        }

        .mechanic-avatar {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          font-weight: 700;
          font-size: 1.5rem;
          flex-shrink: 0;
          background: var(--bg-tertiary);
        }

        .skeleton-avatar {
          background: var(--border-color);
          animation: pulse 1.5s infinite;
        }

        .mechanic-info {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .mechanic-name {
          font-weight: 700;
          font-size: 1.15rem;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mechanic-details {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .detail-item {
          font-size: 0.85rem;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 130px;
        }

        .detail-separator {
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .mechanic-services {
          font-size: 0.8rem;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mechanic-actions {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          flex-shrink: 0;
        }

        .skeleton-actions {
          width: 36px;
          height: 72px;
          background: var(--border-color);
          border-radius: 6px;
          animation: pulse 1.5s infinite;
        }

        .btn-edit,
        .btn-delete {
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
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

        .services-label {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .services-count {
          font-weight: 600;
          color: var(--accent-primary);
          font-size: 0.8rem;
        }

        .services-checkbox-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-height: 200px;
          overflow-y: auto;
          padding: 0.5rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-secondary);
        }

        .service-checkbox {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0.75rem;
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
          width: 20px;
          height: 20px;
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
          font-size: 14px;
          font-weight: bold;
          line-height: 1;
        }

        .service-name {
          flex: 1;
          font-size: 0.875rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .service-price {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .no-services-message {
          padding: 1rem;
          text-align: center;
          color: var(--text-muted);
          font-size: 0.875rem;
        }

        .selected-services-list {
          margin-top: 0.5rem;
          padding: 0.5rem;
          background: var(--bg-tertiary);
          border-radius: 6px;
        }

        .selected-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .service-tag {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          background: var(--accent-light);
          color: var(--accent-primary);
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
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
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          border: 1px solid var(--border-color);
        }

        .modal-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }
        .modal-title h3 { margin: 0; font-size: 1.25rem; color: var(--text-primary); }

        .btn-close {
          width: 32px; height: 32px;
          border: none; background: transparent;
          font-size: 1.25rem; color: var(--text-secondary);
          cursor: pointer;
        }
        .btn-close:hover { color: var(--text-primary); }

        .form-grid { display: flex; flex-direction: column; gap: 1rem; }
        .form-row { display: flex; gap: 1rem; flex-wrap: wrap; }
        .form-field { display: flex; flex-direction: column; gap: 0.25rem; flex: 1; min-width: 200px; }
        .form-field label { font-size: 0.875rem; font-weight: 500; color: var(--text-primary); }

        .form-field input {
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.875rem;
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
        .form-field input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
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
          .mechanics-grid { grid-template-columns: 1fr; }
          .mechanic-card { grid-template-columns: 60px 1fr; }
          .mechanic-actions { grid-column: 2; flex-direction: row; justify-content: flex-end; }
          .filter-row { flex-direction: column; }
          .modal { min-width: 90%; margin: 1rem; }
          .form-row { flex-direction: column; }
          .pagination { flex-wrap: wrap; }
          .detail-item { max-width: 100%; }
        }
      `}</style>
    </div>
  );
}