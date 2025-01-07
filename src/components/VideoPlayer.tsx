import React from 'react';
import { Card, CardContent } from './ui/card';
import { Video } from '../types';

interface VideoPlayerProps {
  video: Video;
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-w-16">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        </div>
      </CardContent>
    </Card>
  );
}