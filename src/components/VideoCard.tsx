import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lesson } from '@/types';
import { Play, ClipboardCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoCardProps {
  video: Lesson;
  onSelect: (video: Lesson) => void;
}

export function VideoCard({ video, onSelect }: VideoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="relative z-0 w-full max-w-[280px]"
    >
      <Card 
        className="overflow-hidden hover:shadow-lg transition-all duration-300 relative group bg-white/50 backdrop-blur-sm border border-gray-200/50 h-[440px] flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="p-0">
          <div className="aspect-video relative group cursor-pointer" onClick={() => onSelect(video)}>
            <img 
              src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <motion.div 
              className="absolute inset-0 bg-black/40 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Play className="w-12 h-12 text-white" />
            </motion.div>
          </div>
          <div className="p-4 flex-1">
            <CardTitle className="text-lg mb-2 min-h-[3rem] line-clamp-2">{video.title}</CardTitle>
            <div className={`relative ${isExpanded ? 'overflow-y-auto max-h-[120px] pr-2' : ''}`}>
              <CardDescription className={`text-sm text-gray-600 ${!isExpanded ? 'line-clamp-2' : ''}`}>
                {video.description}
              </CardDescription>
            </div>
            {video.description.length > 100 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="text-primary text-sm mt-2 flex items-center hover:underline"
              >
                {isExpanded ? (
                  <>Show less <ChevronUp className="ml-1 w-4 h-4" /></>
                ) : (
                  <>Read more <ChevronDown className="ml-1 w-4 h-4" /></>
                )}
              </motion.button>
            )}
          </div>
        </CardHeader>
        <div className="mt-auto w-full">
          <CardContent className="px-4 pb-2">
            <div className="text-sm text-gray-500 flex items-center">
              <Play className="w-4 h-4 mr-1" />
              {video.duration} minutes
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-2 gap-2">
            <Button 
              onClick={() => onSelect(video)} 
              className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90"
            >
              Watch Now
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-primary/20 text-primary hover:bg-primary/5"
              asChild
            >
              <a
                href={video.quizLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center"
              >
                Take Quiz
              </a>
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}