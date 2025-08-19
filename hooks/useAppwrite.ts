import { useCallback, useEffect, useRef, useState } from "react";

interface UseAppwriteOptions {
  immediate?: boolean;
}

// Simple hook for functions without parameters
const useAppwrite = <T>(
  fn: () => Promise<T>,
  options: UseAppwriteOptions = {}
) => {
  const { immediate = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<string | null>(null);

  const fnRef = useRef(fn);
  fnRef.current = fn;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fnRef.current();
      setData(result);
    } catch (err: any) {
      setError(err.message || "An error occurred");
      console.error("useAppwrite error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [immediate, fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

// Hook for functions that take parameters
export const useAppwriteWithParams = <T, P>(
  fn: (params: P) => Promise<T>,
  params: P,
  options: UseAppwriteOptions = {}
) => {
  const { immediate = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<string | null>(null);

  const fnRef = useRef(fn);
  const paramsRef = useRef(params);
  fnRef.current = fn;
  paramsRef.current = params;

  const fetchData = useCallback(async (customParams?: P) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fnRef.current(customParams || paramsRef.current);
      setData(result);
    } catch (err: any) {
      setError(err.message || "An error occurred");
      console.error("useAppwriteWithParams error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Track if this is the first render
  const isFirstRender = useRef(true);

  useEffect(() => {
    paramsRef.current = params;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (immediate) {
        fetchData(params);
      }
    } else {
      // Refetch on params change after first render
      fetchData(params);
    }
  }, [params, fetchData, immediate]);

  const refetch = useCallback(
    (newParams?: P) => {
      fetchData(newParams);
    },
    [fetchData]
  );

  return { data, loading, error, refetch };
};

export default useAppwrite;
