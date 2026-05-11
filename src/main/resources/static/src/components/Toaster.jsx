export const Toaster = ({ toasts, removeToast }) => {
  return (
    <div className="toaster-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          {toast.message}
          <button className="toast-close" onClick={() => removeToast(toast.id)}>×</button>
        </div>
      ))}
      <style jsx>{`
        .toaster-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1100;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .toast {
          padding: 12px 20px;
          border-radius: 8px;
          color: white;
          font-size: 14px;
          animation: slideIn 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .toast-success { background: #28a745; }
        .toast-error { background: #dc3545; }
        .toast-info { background: #17a2b8; }
        .toast-close {
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          opacity: 0.8;
        }
        .toast-close:hover {
          opacity: 1;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};