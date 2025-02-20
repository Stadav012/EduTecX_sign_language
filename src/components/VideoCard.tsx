import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lesson } from '@/types';
import { motion } from 'framer-motion';

interface VideoCardProps {
  video: Lesson;
  onSelect: (video: Lesson) => void;
}

export function VideoCard({ video, onSelect }: VideoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBaselineQuiz, setShowBaselineQuiz] = useState(false);
  const [hasCompletedBaseline, setHasCompletedBaseline] = useState(false);
  const quizContainerRef = useRef<HTMLDivElement>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizTimer, setQuizTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (showBaselineQuiz) {
      setQuizCompleted(false);
      
      const timer = setTimeout(() => {
        setQuizCompleted(true);
      }, 60000); // 1 minute delay
      
      return () => clearTimeout(timer);
    }
  }, [showBaselineQuiz]);

  useEffect(() => {
    if (showBaselineQuiz && quizContainerRef.current && video.baselineQuiz) {
      setQuizCompleted(false); // Reset quiz completion state
      quizContainerRef.current.innerHTML = '';
      const quizContainer = document.createElement('div');
      
      // Extract width and height from the embed code
      const widthMatch = video.baselineQuiz.match(/data-width="([^"]+)"/);
      const heightMatch = video.baselineQuiz.match(/data-height="([^"]+)"/);
      
      const width = widthMatch ? widthMatch[1] : '900';
      const height = heightMatch ? heightMatch[1] : '800';
      
      const iframe = document.createElement('iframe');
      const quizId = video.baselineQuiz.match(/data-quiz="([^"]+)"/)?.[1];
      
      if (quizId) {
        iframe.src = `https://www.classmarker.com/online-test/start/?quiz=${quizId}&iframe=1&width=${width}&height=${height}`;
        iframe.style.width = `${width}px`;
        iframe.style.height = `${height}px`;
        iframe.style.maxWidth = '100%';
        iframe.style.border = 'none';
        iframe.allow = 'fullscreen';
        
        quizContainer.appendChild(iframe);
        quizContainerRef.current.appendChild(quizContainer);
      }
    }
  }, [showBaselineQuiz, video.baselineQuiz]);

  const handleStartLesson = () => {
    if (video.baselineQuiz && !hasCompletedBaseline) {
      setShowBaselineQuiz(true);
    } else {
      onSelect(video);
    }
  };

  const handleQuizComplete = () => {
    setShowBaselineQuiz(false);
    setHasCompletedBaseline(true);
    onSelect(video);
  };

  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          width: showBaselineQuiz ? '100%' : '280px',
          maxWidth: showBaselineQuiz ? '1200px' : '280px'
        }}
        transition={{ duration: 0.3 }}
        className="relative z-0"
      >
        <Card className={`overflow-hidden transition-all duration-300 relative bg-white/50 backdrop-blur-sm border border-gray-200/50 ${
          showBaselineQuiz ? 'h-[90vh] md:h-[650px]' : 'h-[440px]'
        }`}>
          {showBaselineQuiz ? (
            <div className="flex flex-col h-full">
              <CardHeader className="pb-2 flex-shrink-0">
                <CardTitle className="text-xl font-bold">Baseline Quiz</CardTitle>
                <CardDescription>
                  Please complete this quiz before starting the lesson
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-0 overflow-y-auto -mx-2 px-2">
                <div 
                  ref={quizContainerRef}
                  className="quiz-container w-full min-h-full"
                />
              </CardContent>
              {quizCompleted && (
                <div className="sticky bottom-0 w-full p-4 bg-white border-t flex-shrink-0">
                  <Button 
                    onClick={handleQuizComplete}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Continue to Lesson
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="relative w-full aspect-video overflow-hidden">
                <img
                  src={thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  Duration: {video.duration} minutes
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className={`text-sm text-gray-600 ${isExpanded ? '' : 'line-clamp-3'}`}>
                  {video.description}
                </p>
              </CardContent>
              <CardFooter className="p-4">
                <Button
                  onClick={handleStartLesson}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {video.baselineQuiz && !hasCompletedBaseline ? 'Take Baseline Quiz' : 'Start Lesson'}
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </motion.div>
  );
}