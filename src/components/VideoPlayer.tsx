import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Lesson } from '../types';
import { Button } from './ui/button';

interface VideoPlayerProps {
  video: Lesson;
  onTakeQuiz?: () => void;
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  const [showQuiz, setShowQuiz] = useState(false);
  const quizContainerRef = useRef<HTMLDivElement>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (showQuiz) {
      setQuizCompleted(false);
      
      const timer = setTimeout(() => {
        setQuizCompleted(true);
      }, 60000); // Same delay as baseline quiz
      
      return () => clearTimeout(timer);
    }
  }, [showQuiz]);

  useEffect(() => {
    if (showQuiz && quizContainerRef.current && video.quizLink) {
      setQuizCompleted(false);
      quizContainerRef.current.innerHTML = '';
      const quizContainer = document.createElement('div');
      
      // Extract width and height from the embed code
      const widthMatch = video.quizLink.match(/data-width="([^"]+)"/);
      const heightMatch = video.quizLink.match(/data-height="([^"]+)"/);
      
      const width = widthMatch ? widthMatch[1] : '900';
      const height = heightMatch ? heightMatch[1] : '800';
      
      const iframe = document.createElement('iframe');
      const quizId = video.quizLink.match(/data-quiz="([^"]+)"/)?.[1];
      
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
  }, [showQuiz, video.quizLink]);

  return (
    <Card>
      <CardContent className="p-0">
        <div className="relative">
          {showQuiz ? (
            <div className="w-full min-h-[600px] bg-white rounded-lg p-4">
              <div ref={quizContainerRef} className="quiz-container" />
              {quizCompleted && (
                <Button
                  onClick={() => setShowQuiz(false)}
                  className="mt-4 w-full bg-primary hover:bg-primary/90"
                >
                  Back to Video
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                />
              </div>
              {video.quizLink && (
                <div className="absolute top-4 right-4 z-10">
                  <Button
                    onClick={() => setShowQuiz(true)}
                    className="bg-primary hover:bg-primary/90 shadow-lg"
                  >
                    Take Assessment Quiz
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}