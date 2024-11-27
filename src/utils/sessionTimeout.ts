export const TIMEOUT_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
export const CONNECTION_TIMEOUT = 10000; // 10 seconds for initial connection

let timeoutId: NodeJS.Timeout;

export const resetTimeout = () => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  
  timeoutId = setTimeout(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('connection_status');
    window.location.href = '/';
  }, TIMEOUT_DURATION);
};

export const setupActivityListeners = () => {
  ['mousedown', 'keydown', 'touchstart', 'scroll'].forEach(event => {
    document.addEventListener(event, resetTimeout);
  });
};

export const cleanupActivityListeners = () => {
  ['mousedown', 'keydown', 'touchstart', 'scroll'].forEach(event => {
    document.removeEventListener(event, resetTimeout);
  });
};