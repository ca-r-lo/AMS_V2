// API base URL configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Helper function to construct API URLs
export const getApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;