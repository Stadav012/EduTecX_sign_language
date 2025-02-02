import React, { useState, useMemo, useCallback } from 'react';
import { Video, LearningPath } from './types';
import { VideoPlayer } from './components/VideoPlayer';
import { SubjectCard } from './components/SubjectCard';
import { VideoCard } from './components/VideoCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { ArrowLeft, ArrowRight, ChevronLeft } from 'lucide-react';
import { Button } from './components/ui/button';
import { useLearningPaths } from './hooks/useLearningPaths';
import { useLessons } from './hooks/useLessons';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedBackground } from './components/AnimatedBackground';

export default function App() {
    const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<Lesson | null>(null);

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

    const sortedLessons = useMemo(() => {
        return [...(lessons || [])].sort((a, b) => a.order - b.order);
    }, [lessons]);

    const currentIndex = useMemo(() => {
        return sortedLessons.findIndex(
            (lesson) => lesson._id === selectedVideo?._id
        );
    }, [sortedLessons, selectedVideo]);

    const handlePreviousVideo = useCallback(() => {
        if (currentIndex > 0 && sortedLessons.length > 0) {
            const prevLesson = sortedLessons[currentIndex - 1];
            setSelectedVideo(prevLesson);
        }
    }, [currentIndex, sortedLessons]);

    const handleNextVideo = useCallback(() => {
        if (currentIndex < sortedLessons.length - 1) {
            const nextLesson = sortedLessons[currentIndex + 1];
            setSelectedVideo(nextLesson);
        }
    }, [currentIndex, sortedLessons]);

    if (pathsLoading) return <LoadingSpinner />;
    if (pathsError) return <ErrorMessage message={pathsError} />;

    return (
        <div className="min-h-screen relative overflow-hidden">
            <AnimatedBackground />
            
            <header className='bg-white/80 backdrop-blur-sm border-b sticky top-0 z-[100]'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between'>
                    <h1 className='text-5xl font-bold text-gray-900'>EduTecX</h1>
                    {selectedPath && (
                        <Button
                            variant='ghost'
                            onClick={() => {
                                if (selectedVideo) {
                                    setSelectedVideo(null);
                                } else {
                                    setSelectedPath(null);
                                }
                            }}
                            className='flex items-center space-x-2 text-gray-600 hover:text-gray-900'
                        >
                            <ChevronLeft className='w-4 h-4' />
                            <span>Back to Learning Paths</span>
                        </Button>
                    )}
                </div>
            </header>

            <main className='relative z-10'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                    <AnimatePresence mode="wait">
                        {!selectedPath ? (
                            <motion.div 
                                className='space-y-8'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className='text-center max-w-3xl mx-auto mb-16'>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1 }}
                                        className="relative"
                                    >
                                        <motion.div
                                            className="absolute -inset-x-20 top-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent h-[120%] w-[120%] blur-3xl opacity-50"
                                            animate={{
                                                x: ['-100%', '100%'],
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 8,
                                                ease: "linear",
                                            }}
                                        />
                                        <motion.h2 
                                            className='text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-500 py-8'
                                            initial={{ scale: 0.9 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            Choose Your Learning Path
                                        </motion.h2>
                                    </motion.div>
                                    <motion.p 
                                        className='text-lg text-gray-600 mt-4'
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        Select a path to start your learning journey
                                    </motion.p>
                                </div>
                                <motion.div 
                                    className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[720px] mx-auto px-4'
                                    variants={{
                                        hidden: { opacity: 0 },
                                        show: {
                                            opacity: 1,
                                            transition: {
                                                staggerChildren: 0.2
                                            }
                                        }
                                    }}
                                    initial="hidden"
                                    animate="show"
                                >
                                    {paths.map((path, index) => (
                                        <motion.div
                                            key={path._id}
                                            variants={{
                                                hidden: { opacity: 0, y: 20 },
                                                show: { opacity: 1, y: 0 }
                                            }}
                                            className="flex justify-center"
                                        >
                                            <SubjectCard
                                                subject={path}
                                                onClick={() => setSelectedPath(path)}
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        ) : (
                            <div className='space-y-8 relative z-10'>
                                {selectedVideo ? (
                                    <div className='max-w-4xl mx-auto space-y-6'>
                                        <div className='flex items-center justify-between mb-4'>
                                            <div className='text-sm text-gray-500'>
                                                Lesson {currentIndex + 1} of {sortedLessons.length}
                                            </div>
                                            <div className='flex gap-2'>
                                                <Button
                                                    variant='outline'
                                                    onClick={handlePreviousVideo}
                                                    disabled={currentIndex <= 0}
                                                    className='flex items-center'
                                                >
                                                    <ArrowLeft className='w-4 h-4 mr-2' />
                                                    Previous
                                                </Button>
                                                <Button
                                                    variant='outline'
                                                    onClick={handleNextVideo}
                                                    disabled={currentIndex >= sortedLessons.length - 1}
                                                    className='flex items-center'
                                                >
                                                    Next
                                                    <ArrowRight className='w-4 h-4 ml-2' />
                                                </Button>
                                            </div>
                                        </div>
                                        <VideoPlayer video={selectedVideo} />
                                        <div className='bg-white rounded-lg shadow p-6 space-y-4'>
                                            <h2 className='text-2xl font-semibold text-gray-900'>
                                                {selectedVideo.title}
                                            </h2>
                                            <p className='text-gray-600'>{selectedVideo.description}</p>
                                            <Button asChild className='bg-primary hover:bg-primary/90'>
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
                                            <motion.div 
                                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
                                                variants={{
                                                    hidden: { opacity: 0 },
                                                    show: {
                                                        opacity: 1,
                                                        transition: {
                                                            staggerChildren: 0.1
                                                        }
                                                    }
                                                }}
                                                initial="hidden"
                                                animate="show"
                                            >
                                                {sortedLessons.map((lesson) => (
                                                    <motion.div
                                                        key={lesson.id}
                                                        variants={{
                                                            hidden: { opacity: 0, y: 20 },
                                                            show: { opacity: 1, y: 0 }
                                                        }}
                                                        className="flex justify-center"
                                                    >
                                                        <VideoCard
                                                            video={lesson}
                                                            onSelect={(video) => setSelectedVideo(video)}
                                                        />
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
