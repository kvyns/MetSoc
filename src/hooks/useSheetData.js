import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';

export const useSheetData = (sheetKey, parserKey) => {
  const { cache, loading, error, fetchData } = useData();
  const [data, setData] = useState(cache[sheetKey] || []);

  useEffect(() => {
    if (!cache[sheetKey]) {
      fetchData(sheetKey)
        .then(result => setData(result))
        .catch(console.error);
    }
  }, [sheetKey, cache, fetchData]);

  return {
    data: cache[sheetKey] || data,
    loading: loading[sheetKey] || false,
    error: error[sheetKey]
  };
};
