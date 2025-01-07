import type { LearningPath, Lesson } from '@/types';
import { BookOpen, Monitor } from 'lucide-react';

export const mockLearningPaths: LearningPath[] = [
    {
        id: '1',
        title: 'Mathematics',
        description:
            'Learn essential mathematical concepts through interactive lessons and practice exercises',
        icon: BookOpen, // Pass the component directly
        slug: 'mathematics',
    },
    {
        id: '2',
        title: 'Information & Communication Technology',
        description:
            'Master digital skills and programming with hands-on tutorials and real-world projects',
        icon: Monitor, // Pass the component directly
        slug: 'ict',
    },
    {
        id: '3',
        title: 'Science',
        description:
            'Explore the wonders of the natural world and the universe with engaging experiments and activities',
        icon: Monitor, // Pass the component directly
        slug: 'science',
    },
];

export const mockLessons: Lesson[] = [
    {
        id: '1',
        title: 'Introduction to Algebra',
        description: 'Learn the basics of algebraic expressions and equations',
        youtubeId: 'NybHckSEQBI',
        pathId: '1',
        topic: 'Algebra',
        duration: 15,
        quizLink: 'https://forms.gle/example1',
        order: 1,
    },
    {
        id: '2',
        title: 'Basic HTML & CSS',
        description: 'Understanding the fundamentals of web development',
        youtubeId: 'G3e-cpL7ofc',
        pathId: '2',
        topic: 'Web Development',
        duration: 15,
        quizLink: 'https://forms.gle/example2',
        order: 1,
    },
    {
        id: '3',
        title: 'Introduction to Physics',
        description: 'Learn the basics of physics',
        youtubeId: 'NybHckSEQBI',
        pathId: '3',
        topic: 'Physics',
        duration: 15,
        quizLink: 'https://forms.gle/example3',
        order: 1,
    },
];
