import React, { createContext, useContext, useState, useCallback } from 'react';
import { fetchSheetData } from '../services/sheets';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});

  const fetchData = useCallback(async (sheetKey) => {
    try {
      setLoading(prev => ({ ...prev, [sheetKey]: true }));
      setError(prev => ({ ...prev, [sheetKey]: null }));

      const data = await fetchSheetData(sheetKey);
      
      setCache(prev => ({ ...prev, [sheetKey]: data }));
      return data;
    } catch (err) {
      setError(prev => ({ ...prev, [sheetKey]: err.message }));
      return [];
    } finally {
      setLoading(prev => ({ ...prev, [sheetKey]: false }));
    }
  }, []);

  const clearCache = useCallback((sheetKey) => {
    if (sheetKey) {
      setCache(prev => {
        const newCache = { ...prev };
        delete newCache[sheetKey];
        return newCache;
      });
    } else {
      setCache({});
    }
  }, []);

  const value = {
    cache,
    loading,
    error,
    fetchData,
    clearCache
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export default DataContext;
