import { useCallback, useState } from "react";

export function useRequest(initialLoading = false) {
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState("");

  const run = useCallback(async (fn) => {
    setLoading(true);
    setError("");
    try {
      return await fn();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, setError, run };
}
