export interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  pathId: string;
  topic: string;
  duration: number;
  quizLink: string;
  order: number;
}

export interface ApiResponse<T> {
  data: T;
  error: string | null;
}