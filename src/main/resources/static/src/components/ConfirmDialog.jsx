export const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-backdrop" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="confirm-actions">
          <button className="btn btn-ghost" onClick={onCancel}>Отмена</button>
          <button className="btn btn-danger" onClick={onConfirm}>Удалить</button>
        </div>
      </div>
      <style jsx>{`
        .confirm-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1050;
        }
        .confirm-dialog {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          min-width: 400px;
        }
        .confirm-dialog h3 {
          margin: 0 0 0.5rem 0;
        }
        .confirm-dialog p {
          margin: 0 0 1.5rem 0;
          color: #666;
        }
        .confirm-actions {
          display: flex;
          gap: 0.5rem;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
};