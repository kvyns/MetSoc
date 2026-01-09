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

  // Prefetch data for likely next routes based on current location
  useEffect(() => {
    const currentPath = location.pathname;
    const nextRoutes = [];

    // Smart prefetch based on current location
    if (currentPath === '/' || currentPath === '/metsoc' || currentPath === '/metsoc/') {
      nextRoutes.push('/events', '/updates');
    } else if (currentPath.includes('/events')) {
      nextRoutes.push('/updates', '/teams');
    } else if (currentPath.includes('/about')) {
      nextRoutes.push('/teams', '/research');
    }

    // Prefetch with a small delay to not interfere with current page
    setTimeout(() => {
      nextRoutes.forEach(route => {
        const dataKeys = routeDataMap[route] || [];
        dataKeys.forEach(key => {
          if (!cache[key]) {
            fetchData(key).catch(console.error);
          }
        });
      });
    }, 300);
  }, [location.pathname, cache, fetchData]);
};

export default usePrefetch;
};

export default usePrefetch;
