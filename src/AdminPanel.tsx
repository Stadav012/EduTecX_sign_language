import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from './components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from './components/Modal';
import { Textarea } from './components/ui/textarea';
import type { LearningPath, Lesson } from './types';

export default function AdminPanel() {
    const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
    const [showPathModal, setShowPathModal] = useState(false);
    const [showLessonModal, setShowLessonModal] = useState(false);
    const [pathForm, setPathForm] = useState<LearningPath | null>(null);
    const [lessonForm, setLessonForm] = useState<Lesson | null>(null);

    const baseUrl = 'https://edu-tec-x-sign-backend.vercel.app/api';

    // Get token from localStorage
    const token = localStorage.getItem('adminToken'); // Adjust as needed for your token storage

    // Fetch Learning Paths
    useEffect(() => {
        if (token) {
            axios
                .get(`${baseUrl}/paths`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => setLearningPaths(response.data))
                .catch((err) => {
                    console.error('Failed to fetch learning paths:', err);
                    if (err.response && err.response.status === 403) {
                        alert(
                            'You are not authorized to access this resource.'
                        );
                    }
                });
        }
    }, [token]);

    // Fetch Lessons when a Learning Path is selected
    useEffect(() => {
        if (selectedPath && token) {
            axios
                .get(`${baseUrl}/lessons/${selectedPath._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => setLessons(response.data))
                .catch((err) => console.error('Failed to fetch lessons:', err));
        }
    }, [selectedPath, token]);

    // Save or Update Learning Path
    const handleSavePath = () => {
        if (pathForm && token) {
            const apiCall = pathForm._id
                ? axios.put(`${baseUrl}/paths/${pathForm._id}`, pathForm, {
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
                  })
                : axios.post(`${baseUrl}/paths`, pathForm, {
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
                  });

            apiCall
                .then(() => {
                    // Refresh learning paths
                    axios
                        .get(`${baseUrl}/paths`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then((response) => setLearningPaths(response.data));
                    setPathForm(null);
                    setShowPathModal(false);
                })
                .catch((err) =>
                    console.error('Failed to save learning path:', err)
                );
        }
    };

    // Delete Learning Path
    const handleDeletePath = (id: string) => {
        if (token) {
            axios
                .delete(`${baseUrl}/paths/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    setLearningPaths((prev) =>
                        prev.filter((p) => p._id !== id)
                    ); // Use _id instead of id
                    setLessons(
                        (prev) => prev.filter((lesson) => lesson.pathId !== id) // Use _id instead of id
                    );
                })
                .catch((err) =>
                    console.error('Failed to delete learning path:', err)
                );
        }
    };

    // Save or Update Lesson
    const handleSaveLesson = () => {
        if (lessonForm && token) {
            const updatedLesson = {
                ...lessonForm,
                order: lessonForm.order || lessons.length + 1, // Set default order
            };

            const apiCall = updatedLesson._id
                ? axios.put(
                      `${baseUrl}/lessons/${updatedLesson._id}`,
                      updatedLesson,
                      {
                          headers: {
                              Authorization: `Bearer ${token}`,
                          },
                      }
                  )
                : axios.post(`${baseUrl}/lessons`, updatedLesson, {
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
                  });

            apiCall
                .then(() => {
                    if (selectedPath) {
                        axios
                            .get(`${baseUrl}/lessons/${selectedPath._id}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            })
                            .then((response) => setLessons(response.data))
                            .catch((err) =>
                                console.error('Failed to fetch lessons:', err)
                            );
                    }
                    setLessonForm(null);
                    setShowLessonModal(false);
                })
                .catch((err) => console.error('Failed to save lesson:', err));
        }
    };

    // Delete Lesson
    const handleDeleteLesson = (id: string) => {
        if (token) {
            axios
                .delete(`${baseUrl}/lessons/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() =>
                    setLessons((prev) => prev.filter((l) => l._id !== id))
                ) // Use _id instead of id
                .catch((err) => console.error('Failed to delete lesson:', err));
        }
    };

    return (
        <div className='min-h-screen bg-gray-50 p-8'>
            <header className='flex items-center justify-between mb-8'>
                <h1 className='text-4xl font-bold text-gray-900'>
                    Admin Panel
                </h1>
                <Button onClick={() => setShowPathModal(true)}>
                    Add Learning Path
                </Button>
            </header>
            <main className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {!selectedPath ? (
                    learningPaths.map((path) => (
                        <div
                            key={path._id} // Use _id instead of id
                            className='bg-white shadow p-6 rounded-lg'
                        >
                            <h2 className='text-2xl font-bold mb-4'>
                                {path.title}
                            </h2>
                            <p className='text-gray-600 mb-4'>
                                {path.description}
                            </p>
                            <div className='flex items-center space-x-2'>
                                <Button
                                    onClick={() => {
                                        setPathForm(path);
                                        setShowPathModal(true);
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant='destructive'
                                    onClick={() => handleDeletePath(path._id)} // Use _id instead of id
                                >
                                    Delete
                                </Button>
                                <Button onClick={() => setSelectedPath(path)}>
                                    Manage Lessons
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <section className='mt-8'>
                        <Button
                            onClick={() => setSelectedPath(null)}
                            className='mb-4'
                        >
                            Go Back to Learning Paths
                        </Button>
                        <h2 className='text-3xl font-bold mb-4'>
                            Lessons for {selectedPath.title}
                        </h2>
                        <Button
                            className='mb-4'
                            onClick={() => {
                                setLessonForm({
                                    pathId: selectedPath._id, // Use _id instead of id
                                } as Lesson);
                                setShowLessonModal(true);
                            }}
                        >
                            Add Lesson
                        </Button>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                            {lessons
                                .filter(
                                    (lesson) =>
                                        lesson.pathId === selectedPath._id // Use _id instead of id
                                )
                                .map((lesson) => (
                                    <div
                                        key={lesson._id} // Use _id instead of id
                                        className='bg-white shadow p-6 rounded-lg'
                                    >
                                        <h3 className='text-xl font-bold'>
                                            {lesson.title}
                                        </h3>
                                        <p className='text-gray-600 mb-2'>
                                            {lesson.description}
                                        </p>
                                        <div className='flex items-center space-x-2'>
                                            <Button
                                                onClick={() => {
                                                    setLessonForm(lesson);
                                                    setShowLessonModal(true);
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant='destructive'
                                                onClick={() =>
                                                    handleDeleteLesson(
                                                        lesson._id // Use _id instead of id
                                                    )
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </section>
                )}
            </main>
            {/* Modals for Learning Path and Lesson */}
            {showPathModal && (
                <Modal onClose={() => setShowPathModal(false)}>
                    <h2 className='text-2xl font-bold mb-4'>
                        {pathForm?._id ? 'Edit' : 'Add'} Learning Path
                    </h2>
                    {/* Form inputs for Learning Path */}
                    <Input
                        label='Title'
                        value={pathForm?.title ?? ''}
                        onChange={(e) =>
                            setPathForm(
                                (prev) =>
                                    ({
                                        ...prev,
                                        title: e.target.value,
                                    } as LearningPath)
                            )
                        }
                    />
                    <Textarea
                        label='Description'
                        value={pathForm?.description ?? ''}
                        onChange={(e) =>
                            setPathForm(
                                (prev) =>
                                    ({
                                        ...prev,
                                        description: e.target.value,
                                    } as LearningPath)
                            )
                        }
                    />
                    <Input
                        label='Slug'
                        value={pathForm?.slug ?? ''}
                        onChange={(e) =>
                            setPathForm(
                                (prev) =>
                                    ({
                                        ...prev,
                                        slug: e.target.value,
                                    } as LearningPath)
                            )
                        }
                    />
                    <Button onClick={handleSavePath}>Save</Button>
                </Modal>
            )}

            {showLessonModal && (
                <Modal onClose={() => setShowLessonModal(false)}>
                    <h2 className='text-2xl font-bold mb-4'>
                        {lessonForm?._id ? 'Edit' : 'Add'} Lesson
                    </h2>
                    {/* Form inputs for Lesson */}
                    <Input
                        label='Title'
                        value={lessonForm?.title ?? ''}
                        onChange={(e) =>
                            setLessonForm(
                                (prev) =>
                                    ({
                                        ...prev,
                                        title: e.target.value,
                                    } as Lesson)
                            )
                        }
                    />
                    <Textarea
                        label='Description'
                        value={lessonForm?.description ?? ''}
                        onChange={(e) =>
                            setLessonForm(
                                (prev) =>
                                    ({
                                        ...prev,
                                        description: e.target.value,
                                    } as Lesson)
                            )
                        }
                    />
                    <Input
                        label='Topic'
                        value={lessonForm?.topic ?? ''}
                        onChange={(e) =>
                            setLessonForm(
                                (prev) =>
                                    ({
                                        ...prev,
                                        topic: e.target.value,
                                    } as Lesson)
                            )
                        }
                    />
                    <Input
                        label='Duration (minutes)'
                        type='number'
                        value={lessonForm?.duration ?? ''}
                        onChange={(e) =>
                            setLessonForm(
                                (prev) =>
                                    ({
                                        ...prev,
                                        duration: Number(e.target.value),
                                    } as Lesson)
                            )
                        }
                    />
                    <Input
                        label='YouTube ID'
                        value={lessonForm?.youtubeId ?? ''}
                        onChange={(e) =>
                            setLessonForm(
                                (prev) =>
                                    ({
                                        ...prev,
                                        youtubeId: e.target.value,
                                    } as Lesson)
                            )
                        }
                    />
                    <Input
                        label='Quiz Link'
                        value={lessonForm?.quizLink ?? ''}
                        onChange={(e) =>
                            setLessonForm(
                                (prev) =>
                                    ({
                                        ...prev,
                                        quizLink: e.target.value,
                                    } as Lesson)
                            )
                        }
                    />
                    {/* Set the pathId to the selectedPath's _id */}
                    <Input
                        label='Path ID'
                        value={lessonForm?.pathId ?? selectedPath?._id}
                        readOnly // Optional, prevent user from editing pathId
                    />
                    {/* Calculate order based on existing lessons */}
                    <Input
                        label='Order'
                        type='number'
                        value={lessonForm?.order ?? lessons.length + 1} // Set default order to the next available index
                        onChange={(e) =>
                            setLessonForm(
                                (prev) =>
                                    ({
                                        ...prev,
                                        order: Number(e.target.value),
                                    } as Lesson)
                            )
                        }
                    />
                    <Button onClick={handleSaveLesson}>Save</Button>
                </Modal>
            )}
        </div>
    );
}
