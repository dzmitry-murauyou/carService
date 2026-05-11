import { useTheme } from "../theme/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="btn btn-ghost" onClick={toggleTheme} type="button">
      {theme === "light" ? "Тёмная тема" : "Светлая тема"}
    </button>
  );
}

