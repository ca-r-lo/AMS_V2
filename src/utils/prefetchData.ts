import { QueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config/api";

export const prefetchAllData = async (queryClient: QueryClient) => {
  try {
    // Prefetch dashboard data
    await queryClient.prefetchQuery({
      queryKey: ['dashboard'],
      queryFn: async () => {
        const response = await fetch(`${API_BASE_URL}/api/dashboard`);
        if (!response.ok) throw new Error('Failed to fetch dashboard data');
        return response.json();
      }
    });

    // Prefetch sections data
    await queryClient.prefetchQuery({
      queryKey: ['sections'],
      queryFn: async () => {
        const response = await fetch(`${API_BASE_URL}/api/sections`);
        if (!response.ok) throw new Error('Failed to fetch sections');
        return response.json();
      }
    });

    // Prefetch students data
    await queryClient.prefetchQuery({
      queryKey: ['students'],
      queryFn: async () => {
        const response = await fetch(`${API_BASE_URL}/api/students`);
        if (!response.ok) throw new Error('Failed to fetch students');
        return response.json();
      }
    });

    // Prefetch reports data
    await queryClient.prefetchQuery({
      queryKey: ['reports'],
      queryFn: async () => {
        const response = await fetch(`${API_BASE_URL}/api/reports`);
        if (!response.ok) throw new Error('Failed to fetch reports');
        return response.json();
      }
    });

    // Prefetch stats data
    await queryClient.prefetchQuery({
      queryKey: ['reportStats'],
      queryFn: async () => {
        const response = await fetch(`${API_BASE_URL}/api/stats`);
        if (!response.ok) throw new Error('Failed to fetch stats');
        return response.json();
      }
    });

    return true;
  } catch (error) {
    console.error('Error prefetching data:', error);
    return false;
  }
};