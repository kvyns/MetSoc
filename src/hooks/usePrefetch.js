import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';

// Map routes to their data dependencies
const routeDataMap = {
  '/': ['updates', 'gallery', 'events'],
  '/events': ['events'],
  '/updates': ['updates'],
  '/research': ['research'],
  '/teams': ['teams', 'teams2024'],
  '/edvantage': ['edvantage']
};

export const usePrefetch = () => {
  const location = useLocation();
  const { fetchData, cache } = useData();

  useEffect(() => {
    // Prefetch common routes data
    const prefetchRoutes = ['/', '/events', '/updates'];
    
    prefetchRoutes.forEach(route => {
      const dataKeys = routeDataMap[route] || [];
      dataKeys.forEach(key => {
        // Only prefetch if not already in cache
        if (!cache[key]) {
          setTimeout(() => {
            fetchData(key).catch(console.error);
          }, 100); // Small delay to not block main thread
        }
      });
    });
  }, []);

  // Prefetch data for likely next routes
  useEffect(() => {
    const currentPath = location.pathname;
    const nextRoutes = [];

    // Smart prefetch based on current location
    if (currentPath === '/' || currentPath === '/metsoc' || currentPath === '/metsoc/') {
      nextRoutes.push('/events', '/about');
    } else if (currentPath.includes('/events')) {
      nextRoutes.push('/updates', '/teams');
    } else if (currentPath.includes('/about')) {
      nextRoutes.push('/teams', '/research');
    }

    nextRoutes.forEach(route => {
      const dataKeys = routeDataMap[route] || [];
      dataKeys.forEach(key => {
        if (!cache[key]) {
          setTimeout(() => {
            fetchData(key).catch(console.error);
          }, 500);
        }
      });
    });
  }, [location.pathname, cache, fetchData]);
};

export default usePrefetch;
