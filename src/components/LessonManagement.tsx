import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';

export function LessonManagement() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pathInfo, setPathInfo] = useState<any>(null);
  const baseUrl = 'https://edu-tec-x-sign-backend.vercel.app/api';
  const token = localStorage.getItem('adminToken');
  const { pathId } = useParams(); // Get pathId from URL

  useEffect(() => {
    async function fetchLessons() {
      try {
        console.log('Fetching lessons for path:', pathId); 
        const [pathResponse, lessonsResponse] = await Promise.all([
          axios.get(`${baseUrl}/paths/${pathId}`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${baseUrl}/paths/${pathId}/lessons`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setPathInfo(pathResponse.data);
        setLessons(lessonsResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load lessons');
      } finally {
        setLoading(false);
      }
    }

    if (token && pathId) {
      fetchLessons();
    } else {
      setError('Authentication required or invalid path');
      setLoading(false);
    }
  }, [token, pathId]);

  const handleDelete = async (lessonId: string) => {
    try {
      await axios.delete(`${baseUrl}/lessons/${lessonId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLessons(lessons.filter(lesson => lesson._id !== lessonId));
    } catch (err) {
      console.error('Error deleting lesson:', err);
      setError('Failed to delete lesson');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="text-xl">Loading lessons...</div>
    </div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="text-red-500 text-xl">{error}</div>
    </div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Lesson Management</h1>
          {pathInfo && <p className="text-gray-600">Path: {pathInfo.title}</p>}
        </div>
        <Button
          onClick={() => window.location.href = `/admin/paths/${pathId}/lessons/new`}
          className="bg-blue-500 text-white"
        >
          Add New Lesson
        </Button>
      </div>

      {lessons.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No lessons found. Click "Add New Lesson" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons.map((lesson) => (
            <div key={lesson._id} className="border rounded-lg p-4 shadow">
              <h2 className="text-xl font-semibold mb-2">{lesson.title}</h2>
              <p className="text-gray-600 mb-4">{lesson.description}</p>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => window.location.href = `/admin/lessons/edit/${lesson._id}`}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this lesson?')) {
                      handleDelete(lesson._id);
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}