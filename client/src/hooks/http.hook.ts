import { useEffect, useState } from 'react';
import header from "../components/Header/Header";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{} | string | null>(null);

  useEffect(() => {
    console.log('HTTP HOOK, loading = ', loading);
  }, [loading])

  const request = async (url: string, method = 'GET', body?: any, headers?: any) => {
    try {
      setLoading(true);

      if (body) {
        body = JSON.stringify(body);
        headers = {};
        headers['Content-Type'] = 'application/json';
      } else {
        body = null;
      }

      console.log('REQUEST body', body);
      console.log('REQUEST method', method);
      console.log('REQUEST url', url);

      const response = await fetch(url, { body, method, headers });
      const data = await response.json();

      if (!response.ok) {
        return new Error(data.message || 'Something went wrong ');
      }

      setLoading(false);
      return data;
    } catch (e: any) {
      setError(e);
      setLoading(false);
      console.error(e);
    }
  }

  const clearError = () => setError(null);

  return {loading, request, error, clearError}
}
