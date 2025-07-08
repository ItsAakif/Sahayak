// Performance optimization utilities for code splitting and lazy loading

// Preload components based on user interaction patterns
export const preloadComponent = (componentImport) => {
  const componentImportFunc = componentImport;
  
  // Preload on mouse enter or focus
  const preload = () => {
    componentImportFunc();
  };

  return {
    preload,
    component: componentImportFunc
  };
};

// Preload critical components after initial load
export const preloadCriticalComponents = () => {
  // Preload most commonly used components
  setTimeout(() => {
    import('../components/ContentGenerator');
    import('../components/WorksheetGenerator');
  }, 2000);

  // Preload other components after a delay
  setTimeout(() => {
    import('../components/KnowledgeBase');
    import('../components/VisualAidGenerator');
    import('../components/ResultDisplay');
  }, 5000);
};

// Performance monitoring
export const measureComponentLoadTime = (componentName, startTime) => {
  const endTime = performance.now();
  const loadTime = endTime - startTime;
  
  console.log(`Component ${componentName} loaded in ${loadTime.toFixed(2)}ms`);
  
  // In production, you could send this to analytics
  if (process.env.NODE_ENV === 'production') {
    // Analytics.track('component_load_time', {
    //   component: componentName,
    //   loadTime: loadTime
    // });
  }
};

// Intersection Observer for lazy loading optimization
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  if ('IntersectionObserver' in window) {
    return new IntersectionObserver(callback, defaultOptions);
  }
  
  // Fallback for browsers without IntersectionObserver
  return {
    observe: () => callback([{ isIntersecting: true }]),
    unobserve: () => {},
    disconnect: () => {}
  };
};

// Bundle size optimization helpers
export const getComponentSize = async (componentImport) => {
  const startTime = performance.now();
  await componentImport();
  const endTime = performance.now();
  
  return {
    loadTime: endTime - startTime,
    timestamp: new Date().toISOString()
  };
};

// Memory usage monitoring
export const monitorMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = performance.memory;
    return {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      usagePercentage: ((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100).toFixed(2)
    };
  }
  
  return null;
};

// Resource hints for better performance
export const addResourceHints = () => {
  // Preconnect to external domains
  const preconnectDomains = [
    'https://generativelanguage.googleapis.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];

  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    document.head.appendChild(link);
  });
};

// Initialize performance optimizations
export const initializePerformanceOptimizations = () => {
  // Add resource hints
  addResourceHints();
  
  // Preload critical components
  preloadCriticalComponents();
  
  // Monitor memory usage in development
  if (process.env.NODE_ENV === 'development') {
    setInterval(() => {
      const memoryInfo = monitorMemoryUsage();
      if (memoryInfo && memoryInfo.usagePercentage > 80) {
        console.warn('High memory usage detected:', memoryInfo);
      }
    }, 30000); // Check every 30 seconds
  }
};

export default {
  preloadComponent,
  preloadCriticalComponents,
  measureComponentLoadTime,
  createIntersectionObserver,
  getComponentSize,
  monitorMemoryUsage,
  addResourceHints,
  initializePerformanceOptimizations
};