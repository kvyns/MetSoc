import { useState, useEffect } from 'react';
import { fetchSheetData } from '../services/sheets';

export const useSheetData = (sheetKey) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSheetData(sheetKey);
        console.log('Sheet Response:', response); // Debug log
        setData(response);
      } catch (err) {
        console.error('Sheet Error:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sheetKey]);

  return { data, loading, error };
};
