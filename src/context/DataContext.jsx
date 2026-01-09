import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { fetchSheetData } from '../services/sheets';

const DataContext = createContext(null);

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
const CACHE_PREFIX = 'metsoc_cache_';
const CACHE_VERSION = 'v2'; // Increment to invalidate old cache

// Load cache from localStorage
const loadFromLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(CACHE_PREFIX + CACHE_VERSION + '_' + key);
    if (!item) return null;
    
    const { data, timestamp } = JSON.parse(item);
    const now = Date.now();
    
    // Check if cache is still valid
    if (now - timestamp < CACHE_DURATION) {
      return data;
    }
    
    // Remove expired cache
    localStorage.removeItem(CACHE_PREFIX + CACHE_VERSION + '_' + key);
    return null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

// Save to localStorage
const saveToLocalStorage = (key, data) => {
  try {
    const item = {
      data,
      timestamp: Date.now(),
      version: CACHE_VERSION
    };
    localStorage.setItem(CACHE_PREFIX + CACHE_VERSION + '_' + key, JSON.stringify(item));
    
    // Clean up old versions
    Object.keys(localStorage).forEach(storageKey => {
      if (storageKey.startsWith(CACHE_PREFIX) && !storageKey.includes(CACHE_VERSION)) {
        localStorage.removeItem(storageKey);
      }
    });
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const DataProvider = ({ children }) => {
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});

  // Load initial cache from localStorage
  useEffect(() => {
    const initialCache = {};
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(CACHE_PREFIX)) {
        const sheetKey = key.replace(CACHE_PREFIX, '');
        const data = loadFromLocalStorage(sheetKey);
        if (data) {
          initialCache[sheetKey] = data;
        }
      }
    });
    if (Object.keys(initialCache).length > 0) {
      setCache(initialCache);
    }
  }, []);

  const fetchData = useCallback(async (sheetKey) => {
    // Check localStorage first
    const cachedData = loadFromLocalStorage(sheetKey);
    if (cachedData) {
      setCache(prev => ({ ...prev, [sheetKey]: cachedData }));
      return cachedData;
    }

    try {
      setLoading(prev => ({ ...prev, [sheetKey]: true }));
      setError(prev => ({ ...prev, [sheetKey]: null }));

      const data = await fetchSheetData(sheetKey);
      
      setCache(prev => ({ ...prev, [sheetKey]: data }));
      saveToLocalStorage(sheetKey, data);
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
      localStorage.removeItem(CACHE_PREFIX + sheetKey);
    } else {
      setCache({});
      // Clear all metsoc cache from localStorage
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
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
