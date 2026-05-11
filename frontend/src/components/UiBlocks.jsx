export function Section({ title, subtitle, actions, children }) {
  return (
    <section className="card">
      <div className="card-head">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p className="muted">{subtitle}</p> : null}
        </div>
        {actions ? <div className="actions">{actions}</div> : null}
      </div>
      {children}
    </section>
  );
}

export function Message({ type = "info", children }) {
  return <div className={`message ${type}`}>{children}</div>;
}

export function EmptyState({ children = "Записи не найдены." }) {
  return <div className="empty-state">{children}</div>;
}

