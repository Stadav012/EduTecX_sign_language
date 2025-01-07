import { API_BASE_URL } from '@/config/api';
import type { ApiResponse, LearningPath, Lesson } from '@/types';

class ApiService {
  private async fetch<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return { data: null as T, error: (error as Error).message };
    }
  }

  async getLearningPaths(): Promise<ApiResponse<LearningPath[]>> {
    return this.fetch<LearningPath[]>('/learning-paths');
  }

  async getLearningPathBySlug(slug: string): Promise<ApiResponse<LearningPath>> {
    return this.fetch<LearningPath>(`/learning-paths/${slug}`);
  }

  async getLessonsByPathId(pathId: string): Promise<ApiResponse<Lesson[]>> {
    return this.fetch<Lesson[]>(`/learning-paths/${pathId}/lessons`);
  }

  async getLesson(id: string): Promise<ApiResponse<Lesson>> {
    return this.fetch<Lesson>(`/lessons/${id}`);
  }
}

export const apiService = new ApiService();