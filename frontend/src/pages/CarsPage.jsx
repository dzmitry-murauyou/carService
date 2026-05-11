import { useEffect, useMemo, useState } from "react";
import { api } from "../api/carServiceApi";
import { useRequest } from "../hooks/useRequest";
import { EmptyState, Message } from "../components/UiBlocks";

const emptyCar = {
  brand: "",
  model: "",
  licensePlate: "",
  vin: "",
  year: "",
  clientId: ""
};

const ITEMS_PER_PAGE = 18;

export default function CarsPage() {
  const { loading, error, run, setError } = useRequest();
  const [initialLoading, setInitialLoading] = useState(true);

  const [cars, setCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [clients, setClients] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [form, setForm] = useState(emptyCar);
  const [sortBy, setSortBy] = useState("brand");
  const [sortDir, setSortDir] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const [clientSearchText, setClientSearchText] = useState("");

  const [search, setSearch] = useState({
    brand: "",
    model: "",
    licensePlate: "",
    clientFullName: "",
    yearFrom: "",
    yearTo: ""
  });

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const yearsList = [];
    for (let i = currentYear; i >= 1980; i--) {
      yearsList.push(i);
    }
    return yearsList;
  }, []);

  const isEditing = useMemo(() => Boolean(selected?.id), [selected]);

  const uniqueBrands = useMemo(() => {
    const brands = allCars.map(car => car.brand).filter(Boolean);
    return [...new Set(brands)];
  }, [allCars]);

  const getModelsByBrand = (brand) => {
    if (!brand) return [];
    const models = allCars
      .filter(car => car.brand === brand && car.model)
      .map(car => car.model);
    return [...new Set(models)];
  };

  const availableModels = useMemo(() => {
    return getModelsByBrand(form.brand);
  }, [form.brand, allCars]);

  const searchAvailableModels = useMemo(() => {
    return getModelsByBrand(search.brand);
  }, [search.brand, allCars]);

  const filteredCars = useMemo(() => {
    let filtered = [...allCars];
    if (search.brand) {
      filtered = filtered.filter(car => car.brand === search.brand);
    }
    if (search.model) {
      filtered = filtered.filter(car => car.model === search.model);
    }
    if (search.licensePlate) {
      const query = search.licensePlate.toLowerCase();
      filtered = filtered.filter(car =>
        car.licensePlate && car.licensePlate.toLowerCase().includes(query)
      );
    }
    if (search.clientFullName) {
      const query = search.clientFullName.toLowerCase();
      filtered = filtered.filter(car =>
        car.clientName && car.clientName.toLowerCase().includes(query)
      );
    }
    if (search.yearFrom) {
      filtered = filtered.filter(car => car.year >= parseInt(search.yearFrom));
    }
    if (search.yearTo) {
      filtered = filtered.filter(car => car.year <= parseInt(search.yearTo));
    }
    return filtered;
  }, [allCars, search]);

  const sortedCars = useMemo(() => {
    const sorted = [...filteredCars];
    sorted.sort((a, b) => {
      let valA, valB;
      if (sortBy === "brand") {
        valA = `${a.brand} ${a.model}`;
        valB = `${b.brand} ${b.model}`;
      } else if (sortBy === "licensePlate") {
        valA = a.licensePlate || "";
        valB = b.licensePlate || "";
      } else if (sortBy === "year") {
        valA = a.year || 0;
        valB = b.year || 0;
        return sortDir === "asc" ? valA - valB : valB - valA;
      } else if (sortBy === "clientName") {
        valA = a.clientName || "";
        valB = b.clientName || "";
      } else {
        valA = a[sortBy] || "";
        valB = b[sortBy] || "";
      }
      if (typeof valA === "string") {
        return sortDir === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortDir === "asc" ? valA - valB : valB - valA;
    });
    return sorted;
  }, [filteredCars, sortBy, sortDir]);

  const paginatedCars = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return sortedCars.slice(start, end);
  }, [sortedCars, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(sortedCars.length / ITEMS_PER_PAGE);
  }, [sortedCars.length]);

  function changeSort(field) {
    if (sortBy === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
  }

  async function loadInitial() {
    try {
      const [carsData, clientsData] = await Promise.all([
        api.cars.list(),
        api.clients.list()
      ]);
      setAllCars(carsData);
      setCars(carsData);
      setClients(clientsData);
    } catch (err) {
      console.error("loadInitial error:", err);
      setError(err.message || "Ошибка загрузки данных");
    } finally {
      setInitialLoading(false);
    }
  }

  useEffect(() => {
    loadInitial();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  function onSelect(car) {
    setSelected(car);
    setShowCreateForm(false);
    setForm({
      brand: car.brand || "",
      model: car.model || "",
      licensePlate: car.licensePlate || "",
      vin: car.vin || "",
      year: car.year || "",
      clientId: car.clientId || ""
    });
    const client = clients.find(c => c.id === car.clientId);
    setClientSearchText(client ? `${client.firstName} ${client.lastName}`.trim() : "");
  }

  function startCreate() {
    setSelected(null);
    setShowCreateForm(true);
    setError("");
    setForm(emptyCar);
    setClientSearchText("");
  }

  function validateForm() {
    if (!form.brand.trim()) {
      alert("Введите марку автомобиля");
      return false;
    }
    if (!form.model.trim()) {
      alert("Введите модель автомобиля");
      return false;
    }
    if (!form.licensePlate.trim()) {
      alert("Введите госномер");
      return false;
    }
    if (!form.vin.trim()) {
      alert("Введите VIN номер");
      return false;
    }
    if (!form.year) {
      alert("Выберите год выпуска");
      return false;
    }
    return true;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    const payload = {
      ...form,
      year: Number(form.year),
      clientId: form.clientId ? Number(form.clientId) : null
    };
    try {
      if (isEditing) {
        await run(() => api.cars.update(selected.id, payload));
        alert("Автомобиль успешно обновлён");
      } else {
        await run(() => api.cars.create(payload));
        alert("Автомобиль успешно добавлен");
        setShowCreateForm(false);
      }
      setSelected(null);
      setForm(emptyCar);
      setClientSearchText("");
      await loadInitial();
    } catch (err) {
      alert(err.message || "Ошибка при сохранении");
    }
  }

  async function onDelete(id) {
    if (!window.confirm("Удалить автомобиль?")) return;
    try {
      await run(() => api.cars.remove(id));
      alert("Автомобиль успешно удалён");
      if (selected?.id === id) {
        setSelected(null);
        setForm(emptyCar);
      }
      await loadInitial();
    } catch (err) {
      alert(err.message || "Ошибка при удалении");
    }
  }

  async function resetSearch() {
    setCurrentPage(1);
    setSearch({
      brand: "",
      model: "",
      licensePlate: "",
      clientFullName: "",
      yearFrom: "",
      yearTo: ""
    });
  }

  const showForm = isEditing || showCreateForm;
  const closeModal = () => {
    setSelected(null);
    setShowCreateForm(false);
    setForm(emptyCar);
    setClientSearchText("");
  };

  const isSearchActive = search.brand || search.model || search.licensePlate || search.clientFullName || search.yearFrom || search.yearTo;
  const isLoading = loading || initialLoading;

  const carIcons = ["🚗", "🚙", "🚘", "🚕", "🚐", "🚓", "🏎️", "🚔", "🚑", "🚒", "🚚", "🚛", "🚜", "🏍️", "🛵"];
  const getCarIcon = (id) => {
    const index = (id || 0) % carIcons.length;
    return carIcons[index];
  };

  const handleClientInputChange = (e) => {
    const inputValue = e.target.value;
    setClientSearchText(inputValue);

    const matchedClient = clients.find(c =>
      `${c.firstName} ${c.lastName}`.trim().toLowerCase() === inputValue.toLowerCase()
    );

    setForm((p) => ({
      ...p,
      clientId: matchedClient ? matchedClient.id : ""
    }));
  };

  return (
    <div className="cars-page">
      <div className="controls-container">

        <div className="filter-bar">
          <div className="filter-row">
            <div className="filter-field">
              <label>Марка</label>
              <select
                value={search.brand}
                onChange={(e) => setSearch((p) => ({ ...p, brand: e.target.value }))}
                className="filter-input"
              >
                <option value="">Все марки</option>
                {uniqueBrands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div className="filter-field">
              <label>Модель</label>
              <select
                value={search.model}
                onChange={(e) => setSearch((p) => ({ ...p, model: e.target.value }))}
                disabled={!search.brand}
                className="filter-input"
              >
                <option value="">Все модели</option>
                {search.brand && searchAvailableModels.map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>

            <div className="filter-field">
              <label>Госномер</label>
              <input
                type="text"
                placeholder="Поиск по номеру"
                value={search.licensePlate}
                onChange={(e) => setSearch((p) => ({ ...p, licensePlate: e.target.value }))}
                className="filter-input"
              />
            </div>

            <div className="filter-field">
              <label>Владелец</label>
              <input
                type="text"
                placeholder="Имя или фамилия"
                value={search.clientFullName}
                onChange={(e) => setSearch((p) => ({ ...p, clientFullName: e.target.value }))}
                className="filter-input"
              />
            </div>

            <div className="filter-field">
              <label>Год от</label>
              <select
                value={search.yearFrom}
                onChange={(e) => setSearch((p) => ({ ...p, yearFrom: e.target.value }))}
                className="filter-input"
              >
                <option value="">Любой</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div className="filter-field">
              <label>Год до</label>
              <select
                value={search.yearTo}
                onChange={(e) => setSearch((p) => ({ ...p, yearTo: e.target.value }))}
                className="filter-input"
              >
                <option value="">Любой</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="actions-row">
          <div className="sort-controls">
            <span className="sort-label">Сортировать:</span>
            <button
              className={`btn btn-sort ${sortBy === "brand" ? "active" : ""}`}
              onClick={() => changeSort("brand")}
            >
              По марке {sortBy === "brand" && (sortDir === "asc" ? "↑" : "↓")}
            </button>
            <button
              className={`btn btn-sort ${sortBy === "year" ? "active" : ""}`}
              onClick={() => changeSort("year")}
            >
              По году {sortBy === "year" && (sortDir === "asc" ? "↑" : "↓")}
            </button>
            <button
              className={`btn btn-sort ${sortBy === "clientName" ? "active" : ""}`}
              onClick={() => changeSort("clientName")}
            >
              По владельцу {sortBy === "clientName" && (sortDir === "asc" ? "↑" : "↓")}
            </button>
          </div>

          <div className="actions-group">
            {isSearchActive && (
              <button className="btn btn-ghost" type="button" onClick={resetSearch}>
                Сбросить фильтры
              </button>
            )}
            <button className="btn btn-primary btn-xl" type="button" onClick={startCreate}>
              + Добавить автомобиль
            </button>
          </div>
        </div>

      </div>

      {error && <Message type="error">{error}</Message>}

      {isLoading ? (
        <div className="cars-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="car-card skeleton">
              <div className="car-icon skeleton-icon"></div>
              <div className="car-info">
                <div className="car-name skeleton-text"></div>
                <div className="car-plate skeleton-text"></div>
                <div className="car-owner skeleton-text"></div>
              </div>
              <div className="car-actions skeleton-actions"></div>
            </div>
          ))}
        </div>
      ) : paginatedCars.length === 0 ? (
        <EmptyState>
          {isSearchActive ? "По вашему запросу ничего не найдено" : "Нет автомобилей"}
        </EmptyState>
      ) : (
        <>
          <div className="cars-grid">
            {paginatedCars.map((car) => (
              <div key={car.id} className="car-card">
                <div className="car-icon">
                  {getCarIcon(car.id)}
                </div>
                <div className="car-info">
                  <div className="car-name" title={`${car.brand} ${car.model}`}>
                    {car.brand} {car.model}
                  </div>
                  <div className="car-details">
                    <span className="car-plate" title={car.licensePlate}>{car.licensePlate}</span>
                    <span className="car-year">{car.year || "—"}</span>
                  </div>
                  {car.clientName && (
                    <div className="car-owner" title={car.clientName}>{car.clientName}</div>
                  )}
                </div>
                <div className="car-actions">
                  <button
                    className="btn btn-edit"
                    type="button"
                    onClick={() => onSelect(car)}
                    title="Редактировать"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-delete"
                    type="button"
                    onClick={() => onDelete(car.id)}
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
                <h3>{isEditing ? "Редактирование автомобиля" : "Добавление автомобиля"}</h3>
              </div>
              <button className="btn btn-close" type="button" onClick={closeModal}>
                ✕
              </button>
            </div>
            <form className="form-grid" onSubmit={onSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label>Марка *</label>
                  <input
                    type="text"
                    required
                    placeholder="Toyota"
                    list="brands-list"
                    value={form.brand}
                    onChange={(e) => setForm((p) => ({ ...p, brand: e.target.value, model: "" }))}
                  />
                  <datalist id="brands-list">
                    {uniqueBrands.map((brand) => (
                      <option key={brand} value={brand} />
                    ))}
                  </datalist>
                </div>

                <div className="form-field">
                  <label>Модель *</label>
                  <input
                    type="text"
                    required
                    placeholder="Camry"
                    list="models-list"
                    value={form.model}
                    onChange={(e) => setForm((p) => ({ ...p, model: e.target.value }))}
                    disabled={!form.brand}
                  />
                  <datalist id="models-list">
                    {form.brand && availableModels.map((model) => (
                      <option key={model} value={model} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Госномер *</label>
                  <input
                    required
                    placeholder="1234AB-5"
                    value={form.licensePlate}
                    onChange={(e) => setForm((p) => ({ ...p, licensePlate: e.target.value }))}
                  />
                </div>

                <div className="form-field">
                  <label>VIN *</label>
                  <input
                    required
                    placeholder="17 символов"
                    value={form.vin}
                    onChange={(e) => setForm((p) => ({ ...p, vin: e.target.value }))}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>Год выпуска *</label>
                  <select
                    required
                    value={form.year}
                    onChange={(e) => setForm((p) => ({ ...p, year: e.target.value }))}
                  >
                    <option value="">Выберите год</option>
                    {years.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Владелец</label>
                  <input
                    type="text"
                    placeholder="Начните вводить имя..."
                    list="clients-list"
                    value={clientSearchText}
                    onChange={handleClientInputChange}
                  />
                  <datalist id="clients-list">
                    {clients.map((client) => (
                      <option
                        key={client.id}
                        value={`${client.firstName} ${client.lastName}`.trim()}
                      />
                    ))}
                  </datalist>
                  {form.clientId && (
                    <span className="client-selected">✓ Выбран клиент</span>
                  )}
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

        .cars-page {
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

        .cars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1rem;
        }

        .car-card {
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

        .car-card:hover {
          box-shadow: var(--shadow-md);
          border-color: var(--border-color-hover);
        }

        .car-icon {
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

        .car-info {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .car-name {
          font-weight: 700;
          font-size: 1.35rem;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .car-details {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .car-plate {
          font-size: 1rem;
          color: var(--text-primary);
          background: var(--bg-tertiary);
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          font-family: monospace;
          font-weight: 500;
        }

        .car-year {
          font-size: 1rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .car-owner {
          font-size: 0.95rem;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .car-actions {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          flex-shrink: 0;
        }

        .btn-edit, .btn-delete {
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
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

        .form-field input, .form-field select {
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 0.875rem;
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
        .form-field input:focus, .form-field select:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        /* Client selected indicator */
        .client-selected {
          font-size: 0.75rem;
          color: var(--success-primary);
          font-weight: 500;
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
        .skeleton-actions { width: 36px; height: 72px; background: var(--border-color); border-radius: 6px; }
        .skeleton-icon { background: var(--border-color); border-radius: 8px; }

        @media (max-width: 768px) {
          .actions-row { flex-direction: column; align-items: stretch; }
          .sort-controls { justify-content: center; margin-bottom: 0.5rem; }
          .actions-group { justify-content: center; }
          .cars-grid { grid-template-columns: 1fr; }
          .car-card { grid-template-columns: 60px 1fr; }
          .car-actions { grid-column: 2; flex-direction: row; justify-content: flex-end; }
        }
      `}</style>
    </div>
  );
}