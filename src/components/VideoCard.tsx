import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lesson } from '@/types';
import { motion } from 'framer-motion';
import { QuizModal } from './QuizModal';

interface VideoCardProps {
  video: Lesson;
  onSelect: (video: Lesson) => void;
}

export function VideoCard({ video, onSelect }: VideoCardProps) {
  const [showBaselineQuiz, setShowBaselineQuiz] = useState(false);
  const [hasCompletedBaseline, setHasCompletedBaseline] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

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

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-[280px]"
      >
        <Card className="h-[440px] overflow-hidden relative bg-white/50 backdrop-blur-sm border border-gray-200/50">
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
            <p className="text-sm text-gray-600 line-clamp-3">
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
        </Card>
      </motion.div>

      {showBaselineQuiz && video.baselineQuiz && (
        <QuizModal
          quizEmbed={video.baselineQuiz}
          onClose={() => setShowBaselineQuiz(false)}
          onComplete={handleQuizComplete}
        />
      )}
    </>
  );
}