import { useEffect, useMemo, useState } from "react";
import { api } from "../api/carServiceApi";
import { useRequest } from "../hooks/useRequest";
import { EmptyState, Message } from "../components/UiBlocks";
import { Link } from "react-router-dom";

const statConfig = {
  clients: {
    label: "Клиенты",
    path: "/clients",
    icon: "👥"
  },
  cars: {
    label: "Автомобили",
    path: "/cars",
    icon: "🚗"
  },
  orders: {
    label: "Заказы",
    path: "/orders",
    icon: "📋"
  },
  mechanics: {
    label: "Механики",
    path: "/mechanics",
    icon: "🔧"
  },
  services: {
    label: "Услуги",
    path: "/services",
    icon: "⚙️"
  },
  spares: {
    label: "Запчасти",
    path: "/spares",
    icon: "📦"
  }
};

export default function DashboardPage() {
  const { loading, error, run } = useRequest();
  const [initialLoading, setInitialLoading] = useState(true);
  const [allStats, setAllStats] = useState({});

  async function loadStats() {
    try {
      // Загружаем каждый эндпоинт отдельно с обработкой ошибок
      const clients = await api.clients.list().catch(e => {
        console.warn("Clients error:", e);
        return [];
      });

      const cars = await api.cars.list().catch(e => {
        console.warn("Cars error:", e);
        return [];
      });

      const orders = await api.orders.list().catch(e => {
        console.warn("Orders error:", e);
        return [];
      });

      const mechanics = await api.mechanics.list().catch(e => {
        console.warn("Mechanics error:", e);
        return [];
      });

      const services = await api.services.all().catch(e => {
        console.warn("Services error:", e);
        return [];
      });

      const spares = await api.spares.list().catch(e => {
        console.warn("Spares error:", e);
        return [];
      });

      setAllStats({
        clients: clients?.length || 0,
        cars: cars?.length || 0,
        orders: orders?.length || 0,
        mechanics: mechanics?.length || 0,
        services: services?.length || 0,
        spares: spares?.length || 0
      });
    } catch (e) {
      console.error("loadStats error:", e);
      setAllStats({});
    } finally {
      setInitialLoading(false);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  const sortedStats = useMemo(() => {
    return Object.entries(allStats).filter(([_, value]) => value !== undefined);
  }, [allStats]);

  const totalRecords = useMemo(() => {
    return Object.values(allStats).reduce((sum, val) => sum + (val || 0), 0);
  }, [allStats]);

  function getWord(count) {
    if (count === 1) return "запись";
    if (count >= 2 && count <= 4) return "записи";
    return "записей";
  }

  const isLoading = loading || initialLoading;

  return (
    <div className="dashboard-page">
      <div className="controls-container">
        <div className="stats-row">
          <div className="stat-badge">
            <span className="stat-value">{sortedStats.length}</span>
            <span className="stat-label">разделов</span>
          </div>
          <div className="stat-badge">
            <span className="stat-value">{totalRecords}</span>
            <span className="stat-label">{getWord(totalRecords)}</span>
          </div>
        </div>
      </div>

      {error && <Message type="error">{error}</Message>}

      {isLoading ? (
        <div className="stats-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="stat-card skeleton">
              <div className="stat-icon skeleton-icon"></div>
              <div className="stat-info">
                <div className="stat-label skeleton-text"></div>
                <div className="stat-value skeleton-text"></div>
              </div>
            </div>
          ))}
        </div>
      ) : sortedStats.length === 0 ? (
        <EmptyState>Нет данных для отображения</EmptyState>
      ) : (
        <div className="stats-grid">
          {sortedStats.map(([key, value]) => {
            const config = statConfig[key] || {
              label: key,
              path: "/",
              icon: "📊"
            };

            return (
              <Link key={key} to={config.path} className="stat-card-link">
                <div className="stat-card">
                  <div className="stat-icon">
                    <span className="stat-emoji">{config.icon}</span>
                  </div>
                  <div className="stat-info">
                    <div className="stat-label">{config.label}</div>
                    <div className="stat-value">{value}</div>
                    <div className="stat-subtitle">{getWord(value)}</div>
                  </div>
                  <div className="stat-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
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

        .dashboard-page {
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

        .stats-row {
          display: flex;
          gap: 1rem;
        }

        .stat-badge {
          display: flex;
          flex-direction: column;
          background: linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-secondary) 100%);
          padding: 0.75rem 1.25rem;
          border-radius: 8px;
          min-width: 140px;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
        }

        .stat-badge .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: var(--accent-primary);
          line-height: 1;
          letter-spacing: -0.5px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .stat-badge .stat-label {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-top: 0.35rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1rem;
        }

        .stat-card-link {
          text-decoration: none;
          color: inherit;
        }

        .stat-card {
          background: var(--bg-secondary);
          border-radius: 8px;
          padding: 1.25rem;
          display: grid;
          grid-template-columns: 60px 1fr auto;
          align-items: center;
          gap: 1.25rem;
          transition: all 0.2s ease;
          border: 1px solid var(--border-color);
          height: 100%;
        }

        .stat-card-link:hover .stat-card {
          box-shadow: var(--shadow-md);
          border-color: var(--border-color-hover);
          transform: translateY(-2px);
        }

        .stat-card.skeleton {
          animation: none;
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-tertiary);
          border-radius: 8px;
          flex-shrink: 0;
          color: var(--text-secondary);
        }

        .stat-emoji {
          font-size: 2rem;
          line-height: 1;
        }

        .skeleton-icon {
          background: var(--border-color);
          animation: pulse 1.5s infinite;
        }

        .stat-info {
          flex: 1;
          min-width: 0;
        }

        .stat-info .stat-label {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .stat-info .stat-value {
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-secondary);
          line-height: 1;
        }

        .stat-info .stat-subtitle {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-top: 0.25rem;
          font-weight: 500;
        }

        .stat-arrow {
          opacity: 0;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .stat-arrow svg {
          width: 24px;
          height: 24px;
          color: var(--text-muted);
        }

        .stat-card-link:hover .stat-arrow {
          opacity: 1;
        }

        .stat-card-link:hover .stat-arrow svg {
          color: var(--accent-primary);
        }

        .skeleton-text {
          height: 1rem;
          background: var(--border-color);
          border-radius: 4px;
          animation: pulse 1.5s infinite;
        }

        .skeleton-text:last-child {
          width: 60%;
          height: 1.5rem;
          margin-top: 0.5rem;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .stat-card {
            grid-template-columns: 60px 1fr;
          }

          .stat-arrow {
            grid-column: 2;
            opacity: 1;
          }

          .stats-row {
            flex-wrap: wrap;
          }

          .stat-badge {
            min-width: 120px;
          }

          .stat-badge .stat-value {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
}