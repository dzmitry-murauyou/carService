import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { to: "/clients", label: "Клиенты" },
  { to: "/cars", label: "Автомобили" },
  { to: "/orders", label: "Заказы" },
  { to: "/services", label: "Услуги" },
  { to: "/mechanics", label: "Механики" },
  { to: "/spares", label: "Запчасти" },
  { to: "/", label: "Статистика" }
];

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">TorqueLine</span>
          <span className="brand-sub">Панель автосервиса</span>
        </div>
        <ThemeToggle />
      </header>
      <nav className="nav-pills">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) => `nav-pill ${isActive ? "active" : ""}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <main className="page">{children}</main>
    </div>
  );
}