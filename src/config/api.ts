// This will be replaced with your actual API URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  learningPaths: '/learning-paths',
  lessons: '/lessons',
} as const;