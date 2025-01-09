// API base URL configuration
//export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://pcnhsamsserver.netlify.app';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://amspcnhs.online/';

// Helper function to construct API URLs
export const getApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;
