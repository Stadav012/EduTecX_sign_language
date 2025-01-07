import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lesson } from '@/types';
import { Play, ClipboardCheck } from 'lucide-react';

interface VideoCardProps {
  video: Lesson;
  onSelect: (video: Lesson) => void;
}

export function VideoCard({ video, onSelect }: VideoCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 max-w-sm">
      <CardHeader className="p-0">
        <div className="aspect-video relative group">
          <img 
            src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
            alt={video.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Play className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="p-6">
          <CardTitle className="text-lg line-clamp-2 mb-2">{video.title}</CardTitle>
          <CardDescription className="text-sm line-clamp-2 text-gray-600">{video.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-2">
        <div className="text-sm text-gray-500 flex items-center">
          <Play className="w-4 h-4 mr-1" />
          {video.duration} minutes
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-2 gap-2">
        <Button 
          onClick={() => onSelect(video)} 
          className="flex-1 bg-primary hover:bg-primary/90"
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
    </Card>
  );
}