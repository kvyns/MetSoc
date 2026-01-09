import { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';

export const useSheetData = (sheetKey, parserKey) => {
  const { cache, loading, error, fetchData } = useData();
  const [data, setData] = useState(cache[sheetKey] || []);
  const fetchedRef = useRef(false);

  useEffect(() => {
    // Only fetch if not in cache and not already fetched
    if (!cache[sheetKey] && !fetchedRef.current && !loading[sheetKey]) {
      fetchedRef.current = true;
      fetchData(sheetKey)
        .then(result => {
          if (result) setData(result);
        })
        .catch(console.error);
    } else if (cache[sheetKey]) {
      setData(cache[sheetKey]);
    }
  }, [sheetKey, cache, fetchData, loading]);

  return {
    data: cache[sheetKey] || data,
    loading: loading[sheetKey] || false,
    error: error[sheetKey]
  };
};
