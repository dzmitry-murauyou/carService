import { useEffect, useMemo, useState } from "react";
import { api } from "../api/carServiceApi";
import { useRequest } from "../hooks/useRequest";
import { EmptyState, Message } from "../components/UiBlocks";

const emptyClient = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  registrationDate: ""
};

const ITEMS_PER_PAGE = 18;

export default function ClientsPage() {
  const { loading, error, run, setError } = useRequest();
  const [initialLoading, setInitialLoading] = useState(true);

  const [allClients, setAllClients] = useState([]);
  const [carsByClient, setCarsByClient] = useState({});
  const [selected, setSelected] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterPhone, setFilterPhone] = useState("");

  const [form, setForm] = useState(emptyClient);

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

  const normalizePhone = (phone) => {
    if (!phone) return "";
    return phone.replace(/^\+375/, "").replace(/\D/g, "");
  };

  const getInitials = (firstName, lastName) => {
    const f = firstName?.charAt(0) || "";
    const l = lastName?.charAt(0) || "";
    return (f + l).toUpperCase();
  };

  const filteredClients = useMemo(() => {
    let filtered = [...allClients];

    if (searchQuery && searchQuery.length >= 3) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(client =>
        client.firstName.toLowerCase().includes(query) ||
        client.lastName.toLowerCase().includes(query) ||
        `${client.firstName} ${client.lastName}`.toLowerCase().includes(query)
      );
    }

    if (filterPhone && filterPhone.trim()) {
      const phoneQuery = filterPhone.trim().replace(/\D/g, "");
      if (phoneQuery.length >= 3) {
        filtered = filtered.filter(client => {
          if (!client.phone) return false;
          const normalizedClientPhone = normalizePhone(client.phone);
          return normalizedClientPhone.includes(phoneQuery);
        });
      }
    }

    return filtered;
  }, [allClients, searchQuery, filterPhone]);

  const sortedClients = useMemo(() => {
    const sorted = [...filteredClients];

    sorted.sort((a, b) => {
      let valA, valB;

      if (sortBy === "name") {
        valA = `${a.firstName} ${a.lastName}`;
        valB = `${b.firstName} ${b.lastName}`;
      } else {
        valA = a[sortBy] || "";
        valB = b[sortBy] || "";
      }

      return sortDir === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

    return sorted;
  }, [filteredClients, sortBy, sortDir]);

  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return sortedClients.slice(start, end);
  }, [sortedClients, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(sortedClients.length / ITEMS_PER_PAGE);
  }, [sortedClients.length]);

  async function loadAllClients() {
    try {
      const data = await api.clients.list({});
      setAllClients(data || []);
    } catch (e) {
      console.error("loadAllClients error:", e);
      setError(e.message || "Ошибка загрузки данных");
      setAllClients([]);
    } finally {
      setInitialLoading(false);
    }
  }

  useEffect(() => {
    loadAllClients();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterPhone]);

  async function showDetails(client) {
    try {
      setSelected(client);
      setShowCreateForm(false);

      setForm({
        firstName: client.firstName || "",
        lastName: client.lastName || "",
        phone: client.phone || "",
        email: client.email || "",
        address: client.address || "",
        registrationDate: client.registrationDate || ""
      });

      if (!carsByClient[client.id]) {
        const cars = await api.cars.byClient(client.id);
        setCarsByClient((prev) => ({
          ...prev,
          [client.id]: cars || []
        }));
      }
    } catch (e) {
      console.error("showDetails error:", e);
    }
  }

  function startCreate() {
    setSelected(null);
    setForm(emptyClient);
    setShowCreateForm(true);
    setError("");
  }

  function clearFilters() {
    setSearchQuery("");
    setFilterPhone("");
    setCurrentPage(1);
  }

  function validateForm() {
    if (!form.firstName.trim()) {
      alert("Введите имя клиента");
      return false;
    }
    if (!form.lastName.trim()) {
      alert("Введите фамилию клиента");
      return false;
    }
    if (!form.phone.trim()) {
      alert("Введите номер телефона");
      return false;
    }
    return true;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      const payload = {
        ...form,
        registrationDate: form.registrationDate || null
      };

      if (isEditing) {
        await run(() => api.clients.update(selected.id, payload));
        alert("Клиент успешно обновлён");
      } else {
        await run(() => api.clients.create(payload));
        alert("Клиент успешно добавлен");
        setShowCreateForm(false);
      }

      setSelected(null);
      setForm(emptyClient);
      await loadAllClients();
    } catch (e) {
      alert(e.message || "Ошибка при сохранении");
    }
  }

  async function onPatchAddress() {
    if (!selected?.id) return;

    try {
      await run(() =>
        api.clients.patch(selected.id, { address: form.address })
      );
      alert("Адрес успешно обновлён");
      await loadAllClients();
    } catch (e) {
      alert(e.message || "Ошибка при обновлении адреса");
    }
  }

  async function onDelete(clientId) {
    if (!window.confirm("Удалить клиента?")) return;

    try {
      await run(() => api.clients.remove(clientId));

      if (selected?.id === clientId) {
        setSelected(null);
        setForm(emptyClient);
      }

      alert("Клиент успешно удалён");
      await loadAllClients();
    } catch (e) {
      alert(e.message || "Ошибка при удалении");
    }
  }

  const showForm = isEditing || showCreateForm;
  const closeModal = () => {
    setSelected(null);
    setShowCreateForm(false);
    setForm(emptyClient);
  };

  const isSearchActive = (searchQuery && searchQuery.length >= 3) || (filterPhone && filterPhone.replace(/\D/g, "").length >= 3);
  const isLoading = loading || initialLoading;

  function getClientWord(count) {
    if (count % 10 === 1 && count % 100 !== 11) return "клиент";
    if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) return "клиента";
    return "клиентов";
  }

  return (
    <div className="clients-page">
      <div className="controls-container">

        <div className="filter-bar">
          <div className="filter-row">
            <div className="filter-field">
              <label>Поиск по имени</label>
              <input
                type="text"
                placeholder="Минимум 3 символа"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="filter-input"
              />
            </div>

            <div className="filter-field">
              <label>Поиск по телефону</label>
              <input
                type="text"
                placeholder="3+ цифры, без +375"
                value={filterPhone}
                onChange={(e) => setFilterPhone(e.target.value)}
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
          </div>

          <div className="actions-group">
            {isSearchActive && (
              <button className="btn btn-ghost" type="button" onClick={clearFilters}>
                Сбросить фильтры
              </button>
            )}
            <button className="btn btn-primary btn-xl" type="button" onClick={startCreate}>
              + Добавить клиента
            </button>
          </div>
        </div>

      </div>

      {error && <Message type="error">{error}</Message>}

      {isLoading ? (
        <div className="clients-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="client-card skeleton">
              <div className="client-avatar skeleton-avatar"></div>
              <div className="client-info">
                <div className="client-name skeleton-text"></div>
                <div className="client-phone skeleton-text"></div>
                <div className="client-email skeleton-text"></div>
              </div>
              <div className="client-actions skeleton-actions"></div>
            </div>
          ))}
        </div>
      ) : sortedClients.length === 0 ? (
        <EmptyState>
          {isSearchActive ? "По вашему запросу ничего не найдено" : "Нет клиентов"}
        </EmptyState>
      ) : (
        <>
          <div className="clients-grid">
            {paginatedClients.map((c) => (
              <div key={c.id} className="client-card">
                <div className="client-avatar">
                  {getInitials(c.firstName, c.lastName)}
                </div>
                <div className="client-info">
                  <div className="client-name" title={`${c.firstName} ${c.lastName}`}>
                    {c.firstName} {c.lastName}
                  </div>
                  <div className="client-details">
                    <span className="detail-item phone" title={c.phone}>{c.phone}</span>
                    {c.email && (
                      <>
                        <span className="detail-separator">•</span>
                        <span className="detail-item email" title={c.email}>{c.email}</span>
                      </>
                    )}
                  </div>
                  {c.address && (
                    <div className="client-address" title={c.address}>{c.address}</div>
                  )}
                </div>
                <div className="client-actions">
                  <button
                    className="btn btn-edit"
                    type="button"
                    onClick={() => showDetails(c)}
                    title="Редактировать"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-delete"
                    type="button"
                    onClick={() => onDelete(c.id)}
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

          {selected?.id && (
            <div className="cars-section">
              <h3 className="section-title">Автомобили клиента: {selected.firstName} {selected.lastName}</h3>
              {(carsByClient[selected.id] || []).length === 0 ? (
                <EmptyState>У клиента пока нет автомобилей</EmptyState>
              ) : (
                <div className="cars-grid">
                  {carsByClient[selected.id].map((car) => (
                    <div key={car.id} className="car-card">
                      <div className="car-info">
                        <div className="car-name">{car.brand} {car.model}</div>
                        <div className="car-details">
                          <span className="car-plate">{car.licensePlate}</span>
                          <span className="car-year">{car.year || "—"}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {showForm && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-title">
                <h3>{isEditing ? "Редактирование клиента" : "Добавление клиента"}</h3>
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
                    placeholder="Иван"
                    value={form.firstName}
                    onChange={(e) => setForm(p => ({ ...p, firstName: e.target.value }))}
                  />
                </div>

                <div className="form-field">
                  <label>Фамилия *</label>
                  <input
                    required
                    placeholder="Иванов"
                    value={form.lastName}
                    onChange={(e) => setForm(p => ({ ...p, lastName: e.target.value }))}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Телефон *</label>
                  <input
                    required
                    placeholder="+375 XX XXX XX XX"
                    value={form.phone}
                    onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
                  />
                </div>

                <div className="form-field">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Адрес</label>
                  <input
                    placeholder="г. Минск, ул. Примерная 1"
                    value={form.address}
                    onChange={(e) => setForm(p => ({ ...p, address: e.target.value }))}
                  />
                </div>

                <div className="form-field">
                  <label>Дата регистрации</label>
                  <input
                    type="date"
                    value={form.registrationDate}
                    onChange={(e) => setForm(p => ({ ...p, registrationDate: e.target.value }))}
                  />
                </div>
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

        .clients-page {
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

        .clients-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1rem;
        }

        .client-card {
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

        .client-card:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--border-color-hover);
        }

        .client-card.skeleton {
          animation: none;
        }

        .client-avatar {
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

        .client-info {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .client-name {
          font-weight: 700;
          font-size: 1.15rem;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .client-details {
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
        }

        .detail-item.phone {
          max-width: 130px;
        }

        .detail-item.email {
          max-width: 180px;
        }

        .detail-separator {
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .client-address {
          font-size: 0.8rem;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .client-actions {
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

        .cars-section {
          margin-top: 2rem;
          padding: 1.5rem;
          background: var(--bg-secondary);
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }

        .section-title {
          margin: 0 0 1rem 0;
          font-size: 1.25rem;
          color: var(--text-primary);
          font-weight: 600;
        }

        .cars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }

        .car-card {
          padding: 1rem;
          background: var(--bg-tertiary);
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }

        .car-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .car-name {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 1rem;
        }

        .car-details {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .car-plate {
          font-size: 0.875rem;
          color: var(--text-primary);
          background: var(--bg-secondary);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-family: monospace;
        }

        .car-year {
          font-size: 0.875rem;
          color: var(--text-muted);
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

        .btn-address {
          background: var(--bg-tertiary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }
        .btn-address:hover { background: var(--border-color); }

        .btn-submit {
          background: var(--accent-primary);
          color: white;
        }
        .btn-submit:hover:not(:disabled) { background: var(--accent-hover); }
        .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        .skeleton { animation: pulse 1.5s infinite; background: var(--bg-terтиary); }
        @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.8; } }
        .skeleton-text { height: 1rem; background: var(--border-color); border-radius: 4px; }

        @media (max-width: 768px) {
          .actions-row { flex-direction: column; align-items: stretch; }
          .sort-controls { justify-content: center; margin-bottom: 0.5rem; }
          .actions-group { justify-content: center; }
          .clients-grid { grid-template-columns: 1fr; }
          .client-card { grid-template-columns: 60px 1fr; }
          .client-actions { grid-column: 2; flex-direction: row; justify-content: flex-end; }
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