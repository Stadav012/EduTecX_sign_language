import { useState, useEffect } from 'react';
import axios from 'axios';
import { LearningPath } from '../types';

export const useLearningPaths = () => {
    const [paths, setPaths] = useState<LearningPath[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLearningPaths = async () => {
            try {
                const response = await axios.get(
                    'https://edu-tec-x-sign-backend.vercel.app/api/paths'
                );
                console.log('API Response:', response.data);
                setPaths(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch learning paths');
                setLoading(false);
            }
        };

        fetchLearningPaths();
    }, []);

    return { paths, loading, error };
};
