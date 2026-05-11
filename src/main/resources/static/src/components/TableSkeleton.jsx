export const TableSkeleton = ({ rows = 5, columns = 6 }) => {
  return (
    <div className="skeleton-table">
      <table className="table">
        <tbody>
          {Array(rows).fill().map((_, i) => (
            <tr key={i}>
              {Array(columns).fill().map((_, j) => (
                <td key={j}>
                  <div className="skeleton-cell"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .skeleton-table {
          width: 100%;
        }
        .skeleton-cell {
          height: 20px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 4px;
        }
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};