import { useState, useEffect } from 'react';
import axios from 'axios';
import { Lesson } from '../types';

export const useLessons = (pathId: string) => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!pathId) return;

        const fetchLessons = async () => {
            try {
                const response = await axios.get(
                    `https://edu-tec-x-sign-backend.vercel.app/api/lessons/${pathId}`
                );
                setLessons(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch lessons');
                setLoading(false);
            }
        };

        fetchLessons();
    }, [pathId]);

    return { lessons, loading, error };
};
