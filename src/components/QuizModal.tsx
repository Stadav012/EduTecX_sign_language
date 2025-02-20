import React, { useRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuizModalProps {
  quizEmbed: string;
  onClose: () => void;
  onComplete: () => void;
}

export function QuizModal({ quizEmbed, onClose, onComplete }: QuizModalProps) {
  const quizContainerRef = useRef<HTMLDivElement>(null);
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    if (quizContainerRef.current) {
      const quizContainer = document.createElement('div');
      const iframe = document.createElement('iframe');
      const quizId = quizEmbed.match(/data-quiz="([^"]+)"/)?.[1];
      const widthMatch = quizEmbed.match(/data-width="([^"]+)"/);
      const heightMatch = quizEmbed.match(/data-height="([^"]+)"/);
      
      const width = widthMatch ? widthMatch[1] : '900';
      const height = heightMatch ? heightMatch[1] : '800';
      
      if (quizId) {
        iframe.src = `https://www.classmarker.com/online-test/start/?quiz=${quizId}&iframe=1&width=${width}&height=${height}`;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.minHeight = '600px';
        iframe.style.border = 'none';
        iframe.allow = 'fullscreen';
        
        quizContainer.style.width = '100%';
        quizContainer.style.height = '100%';
        quizContainer.appendChild(iframe);
        quizContainerRef.current.appendChild(quizContainer);
      }
    }

    const timer = setTimeout(() => {
      setShowContinue(true);
    }, 60000);

    return () => clearTimeout(timer);
  }, [quizEmbed]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-5xl h-[90vh] flex flex-col relative">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Baseline Quiz</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <div 
            ref={quizContainerRef} 
            className="w-full h-full"
          />
        </div>

        {showContinue && (
          <div className="p-4 border-t bg-white">
            <Button 
              onClick={onComplete}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Continue to Lesson
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}