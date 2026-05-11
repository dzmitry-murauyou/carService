import { useEffect, useMemo, useState } from "react";
import { api } from "../api/carServiceApi";
import { useRequest } from "../hooks/useRequest";
import { EmptyState, Message } from "../components/UiBlocks";

const emptyService = {
  name: "",
  description: "",
  price: "",
  duration: "",
  status: "active"
};

const ITEMS_PER_PAGE = 18;

export default function ServicesPage() {
  const { loading, error, run, setError } = useRequest();
  const [initialLoading, setInitialLoading] = useState(true);
  const [allServices, setAllServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyService);
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [reloadKey, setReloadKey] = useState(0);

  const isEditing = Boolean(selected?.id) && showForm;

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
      console.log("🔄 [ServicesPage] Загрузка списка услуг...");
      const data = await api.services.list();
      console.log("✅ [ServicesPage] Загружено услуг:", data?.length || 0);
      if (Array.isArray(data)) {
        setAllServices(data);
      } else {
        setAllServices([]);
      }
    } catch (e) {
      console.error("❌ [ServicesPage] loadAll error:", e);
      setError(e.message || "Ошибка загрузки данных");
      setAllServices([]);
    } finally {
      setInitialLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, [reloadKey]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredServices = useMemo(() => {
    let filtered = [...allServices];
    if (searchQuery && searchQuery.length >= 3) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((s) =>
        s.name.toLowerCase().includes(query) ||
        (s.description && s.description.toLowerCase().includes(query))
      );
    }
    return filtered;
  }, [allServices, searchQuery]);

  const sortedServices = useMemo(() => {
    const arr = [...filteredServices];
    arr.sort((a, b) => {
      let A, B;
      if (sortBy === "name") {
        A = a.name || "";
        B = b.name || "";
        return sortDir === "asc" ? A.localeCompare(B) : B.localeCompare(A);
      }
      if (sortBy === "price") {
        A = Number(a.price) || 0;
        B = Number(b.price) || 0;
        return sortDir === "asc" ? A - B : B - A;
      }
      if (sortBy === "duration") {
        A = a.duration || "";
        B = b.duration || "";
        return sortDir === "asc" ? A.localeCompare(B) : B.localeCompare(A);
      }
      return 0;
    });
    return arr;
  }, [filteredServices, sortBy, sortDir]);

  const paginatedServices = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return sortedServices.slice(start, end);
  }, [sortedServices, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(sortedServices.length / ITEMS_PER_PAGE);
  }, [sortedServices.length]);

  function startCreate() {
    console.log("📝 [ServicesPage] Открытие формы создания");
    setSelected(null);
    setForm({ ...emptyService });
    setShowForm(true);
    setError("");
  }

  function startEdit(service) {
    console.log("✏️ [ServicesPage] Открытие формы редактирования:", service);
    setSelected(service);
    setForm({
      name: service.name || "",
      description: service.description || "",
      price: service.price !== null && service.price !== undefined ? String(service.price) : "",
      duration: service.duration || "",
      status: service.status || "active"
    });
    setShowForm(true);
  }

  function validateForm() {
    if (!form.name.trim()) {
      alert("Введите название услуги");
      return false;
    }
    const priceNum = Number(form.price);
    if (!form.price || isNaN(priceNum) || priceNum <= 0) {
      alert("Введите корректную цену (больше 0)");
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
        name: form.name.trim(),
        description: form.description?.trim() || null,
        price: Number(form.price),
        duration: form.duration?.trim() || null,
        status: form.status || "active"
      };

      console.log("📤 [ServicesPage] Отправка данных:", payload);

      if (isEditing && selected?.id) {
        console.log("🔄 [ServicesPage] Обновление услуги ID:", selected.id);
        await run(() => api.services.update(selected.id, payload));
        console.log("✅ [ServicesPage] Услуга обновлена");
        alert("Услуга успешно обновлена");
      } else {
        console.log("➕ [ServicesPage] Создание новой услуги");
        const result = await run(() => api.services.create(payload));
        console.log("✅ [ServicesPage] Услуга создана, ID:", result?.id);
        alert("Услуга успешно добавлена");
      }

      setShowForm(false);
      setSelected(null);
      setForm({ ...emptyService });
      setReloadKey(prev => prev + 1);
    } catch (e) {
      console.error("❌ [ServicesPage] onSubmit error:", e);
      alert(e.message || "Ошибка при сохранении");
    }
  }

  async function onDelete(serviceId) {
    console.log("🗑️ [ServicesPage] onDelete вызван с ID:", serviceId, "Тип:", typeof serviceId);

    if (!serviceId) {
      console.error("❌ [ServicesPage] serviceId is null/undefined");
      alert("Ошибка: ID услуги не определен");
      return;
    }

    const numericId = Number(serviceId);
    if (isNaN(numericId)) {
      console.error("❌ [ServicesPage] serviceId is not a valid number:", serviceId);
      alert("Ошибка: Неверный формат ID");
      return;
    }

    if (!window.confirm("Удалить услугу?")) return;

    try {
      console.log("📤 [ServicesPage] Отправка DELETE запроса для ID:", numericId);
      await run(() => api.services.remove(numericId));
      console.log("✅ [ServicesPage] DELETE запрос выполнен успешно");

      if (selected?.id === serviceId) {
        setSelected(null);
      }

      alert("Услуга успешно удалена");
      setReloadKey(prev => prev + 1);
    } catch (e) {
      console.error("❌ [ServicesPage] onDelete error:", e);
      alert(e.message || "Ошибка при удалении");
    }
  }

  function clearFilters() {
    setSearchQuery("");
    setCurrentPage(1);
  }

  function closeModal() {
    setShowForm(false);
    setSelected(null);
    setForm({ ...emptyService });
  }

  const isFilterActive = searchQuery && searchQuery.length >= 3;
  const isLoading = loading || initialLoading;

  const getServiceIcon = (name) => {
    const icons = {
      "Диагностика": "🔍",
      "Ремонт": "🔧",
      "Замена": "🔄",
      "Проверка": "✅",
      "Настройка": "⚙️",
      "Чистка": "🧹",
      "Масло": "🛢️",
      "Фильтр": "🔬"
    };
    for (const [key, icon] of Object.entries(icons)) {
      if (name && name.includes(key)) return icon;
    }
    return "🔧";
  };

  return (
    <div className="services-page">
      <div className="controls-container">
        <div className="filter-bar">
          <div className="filter-row">
            <div className="filter-field">
              <label>Поиск</label>
              <input
                type="text"
                placeholder="По названию или описанию (3+ символа)"
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
              По названию {sortBy === "name" && (sortDir === "asc" ? "↑" : "↓")}
            </button>
            <button
              className={`btn btn-sort ${sortBy === "price" ? "active" : ""}`}
              onClick={() => changeSort("price")}
            >
              По цене {sortBy === "price" && (sortDir === "asc" ? "↑" : "↓")}
            </button>
            <button
              className={`btn btn-sort ${sortBy === "duration" ? "active" : ""}`}
              onClick={() => changeSort("duration")}
            >
              По длительности {sortBy === "duration" && (sortDir === "asc" ? "↑" : "↓")}
            </button>
          </div>

          <div className="actions-group">
            {isFilterActive && (
              <button className="btn btn-ghost" type="button" onClick={clearFilters}>
                Сбросить фильтры
              </button>
            )}
            <button className="btn btn-primary btn-xl" type="button" onClick={startCreate}>
              + Добавить услугу
            </button>
          </div>
        </div>
      </div>

      {error && <Message type="error">{error}</Message>}

      {isLoading ? (
        <div className="services-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="service-card skeleton">
              <div className="service-icon skeleton-icon"></div>
              <div className="service-info">
                <div className="service-name skeleton-text"></div>
                <div className="service-duration skeleton-text"></div>
                <div className="service-price skeleton-text"></div>
              </div>
              <div className="service-actions skeleton-actions"></div>
            </div>
          ))}
        </div>
      ) : sortedServices.length === 0 ? (
        <EmptyState>
          {isFilterActive ? "По вашему запросу ничего не найдено" : "Нет услуг"}
        </EmptyState>
      ) : (
        <>
          <div className="services-grid">
            {paginatedServices.map((s) => (
              <div key={s.id} className="service-card">
                <div className="service-icon">{getServiceIcon(s.name)}</div>
                <div className="service-info">
                  <div className="service-name" title={s.name}>{s.name}</div>
                  <div className="service-details">
                    {s.duration && <span className="service-duration">⏱️ {s.duration}</span>}
                    <span className="detail-separator">•</span>
                    <span className="service-price">{s.price} Br</span>
                  </div>
                </div>
                <div className="service-actions">
                  <button
                    className="btn btn-edit"
                    type="button"
                    onClick={() => startEdit(s)}
                    title="Редактировать"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-delete"
                    type="button"
                    onClick={() => onDelete(s.id)}
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
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-title">
                <h3>{isEditing ? "✏️ Редактирование услуги" : "➕ Добавление услуги"}</h3>
              </div>
              <button className="btn btn-close" type="button" onClick={closeModal}>
                ✕
              </button>
            </div>

            <form className="form-grid" onSubmit={onSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label>Название *</label>
                  <input
                    required
                    placeholder="Название услуги"
                    value={form.name}
                    onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                  />
                </div>

                <div className="form-field">
                  <label>Длительность</label>
                  <input
                    placeholder="Например: 60 мин"
                    value={form.duration}
                    onChange={(e) => setForm(p => ({ ...p, duration: e.target.value }))}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Цена *</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={form.price}
                    onChange={(e) => setForm(p => ({ ...p, price: e.target.value }))}
                  />
                </div>

                <div className="form-field">
                  <label>Статус</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm(p => ({ ...p, status: e.target.value }))}
                  >
                    <option value="active">Активна</option>
                    <option value="inactive">Неактивна</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label>Описание</label>
                <textarea
                  placeholder="Описание услуги"
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-cancel" onClick={closeModal}>
                  Отмена
                </button>
                <button className="btn btn-submit" disabled={loading} type="submit">
                  {isEditing ? "Сохранить изменения" : "Создать услугу"}
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

        .services-page {
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

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1rem;
        }

        .service-card {
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

        .service-card:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--border-color-hover);
        }

        .service-card.skeleton {
          animation: none;
        }

        .service-icon {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          flex-shrink: 0;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
        }

        .skeleton-icon {
          background: var(--border-color);
          animation: pulse 1.5s infinite;
        }

        .service-info {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .service-name {
          font-weight: 700;
          font-size: 1.35rem;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .service-details {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .service-duration,
        .service-price {
          font-size: 1rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .service-price {
          color: var(--text-primary);
        }

        .detail-separator {
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .service-actions {
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

        .form-field input,
        .form-field textarea,
        .form-field select {
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.875rem;
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
          .services-grid { grid-template-columns: 1fr; }
          .service-card { grid-template-columns: 60px 1fr; }
          .service-actions { grid-column: 2; flex-direction: row; justify-content: flex-end; }
          .filter-row { flex-direction: column; }
          .modal { min-width: 90%; margin: 1rem; }
          .form-row { flex-direction: column; }
          .pagination { flex-wrap: wrap; }
        }
      `}</style>
    </div>
  );
}