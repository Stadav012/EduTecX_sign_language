import { motion } from 'framer-motion';
import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LearningPath } from '@/types';
import { ChevronDown, ChevronUp, BookOpen, Monitor } from 'lucide-react';

const iconMap: { [key: string]: any } = {
    'book-open': BookOpen,
    monitor: Monitor,
};

export function SubjectCard({ subject, onClick }: SubjectCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const IconComponent = iconMap[subject.icon] || BookOpen;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="relative z-0"
        >
            <Card 
                className='hover:shadow-xl transition-all duration-300 w-[320px] relative overflow-hidden group'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className='absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none' />
                <CardHeader className="relative z-10">
                    <motion.div 
                        className='mx-auto mb-4 p-3 bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center'
                        animate={{ rotate: isHovered ? 360 : 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <IconComponent className='w-7 h-7 text-primary' />
                    </motion.div>
                    <CardTitle className='text-xl mb-2 text-left'>{subject.title}</CardTitle>
                    <CardDescription className={`text-sm text-gray-600 text-left ${isExpanded ? '' : 'line-clamp-3'}`}>
                        {subject.description}
                    </CardDescription>
                    {subject.description.length > 150 && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(!isExpanded);
                            }}
                            className="text-primary text-sm mt-2 flex items-center hover:underline relative z-20"
                        >
                            {isExpanded ? (
                                <>Show less <ChevronUp className="ml-1 w-4 h-4" /></>
                            ) : (
                                <>Read more <ChevronDown className="ml-1 w-4 h-4" /></>
                            )}
                        </motion.button>
                    )}
                </CardHeader>
                <CardContent className="relative z-10">
                    <motion.div 
                        whileHover={{ scale: 1.02 }} 
                        whileTap={{ scale: 0.98 }}
                        className="relative z-20"
                    >
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                onClick();
                            }}
                            className='w-full bg-primary hover:bg-primary/90'
                        >
                            Start Learning
                        </Button>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
