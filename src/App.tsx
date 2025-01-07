import React, { useState } from 'react';
import { Video, LearningPath } from './types';
import { VideoPlayer } from './components/VideoPlayer';
import { SubjectCard } from './components/SubjectCard';
import { VideoCard } from './components/VideoCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { ArrowLeft } from 'lucide-react';
import { Button } from './components/ui/button';
import { useLearningPaths } from './hooks/useLearningPaths';
import { useLessons } from './hooks/useLessons';

export default function App() {
    const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    const {
        paths,
        loading: pathsLoading,
        error: pathsError,
    } = useLearningPaths();
    const {
        lessons,
        loading: lessonsLoading,
        error: lessonsError,
    } = useLessons(selectedPath?._id ?? '');

    if (pathsLoading) return <LoadingSpinner />;
    if (pathsError) return <ErrorMessage message={pathsError} />;

    return (
        <div className='min-h-screen bg-gray-50'>
            <header className='bg-white border-b'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between'>
                    <h1 className='text-5xl font-bold text-gray-900'>
                        EduTecX
                    </h1>
                    {selectedPath && (
                        <Button
                            variant='ghost'
                            onClick={() => {
                                setSelectedPath(null);
                                setSelectedVideo(null);
                            }}
                            className='flex items-center space-x-2 text-gray-600 hover:text-gray-900'
                        >
                            <ArrowLeft className='w-4 h-4' />
                            <span>Back to Learning Paths</span>
                        </Button>
                    )}
                </div>
            </header>

            <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 '>
                <div className='h-[50rem] px-10 w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center'>
                    {!selectedPath ? (
                        <div className='space-y-8'>
                            <div className='text-center max-w-2xl mx-auto mb-12'>
                                <h2 className='text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8'>
                                    Choose Your Learning Path
                                </h2>
                                <p className='text-lg text-gray-600'>
                                    Select a path to start your learning journey
                                    with curated video lessons
                                </p>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center'>
                                {paths.map((path) => (
                                    <SubjectCard
                                        key={path._id}
                                        subject={path}
                                        onClick={() => setSelectedPath(path)}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className='space-y-8'>
                            {selectedVideo ? (
                                <div className='max-w-4xl mx-auto space-y-6'>
                                    <VideoPlayer video={selectedVideo} />
                                    <div className='bg-white rounded-lg shadow p-6 space-y-4'>
                                        <h2 className='text-2xl font-semibold text-gray-900'>
                                            {selectedVideo.title}
                                        </h2>
                                        <p className='text-gray-600'>
                                            {selectedVideo.description}
                                        </p>
                                        <Button
                                            asChild
                                            className='bg-primary hover:bg-primary/90'
                                        >
                                            <a
                                                href={selectedVideo.quizLink}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='inline-flex items-center justify-center'
                                            >
                                                Take Assessment Quiz
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className='space-y-8'>
                                    <div>
                                        <h2 className='text-2xl font-bold mb-2 text-gray-900'>
                                            {selectedPath.title}
                                        </h2>
                                        <p className='text-lg text-gray-600'>
                                            {selectedPath.description}
                                        </p>
                                    </div>
                                    {lessonsLoading ? (
                                        <LoadingSpinner />
                                    ) : lessonsError ? (
                                        <ErrorMessage message={lessonsError} />
                                    ) : (
                                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center'>
                                            {lessons.map((lesson) => (
                                                <VideoCard
                                                    key={lesson.id}
                                                    video={lesson}
                                                    onSelect={setSelectedVideo}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
