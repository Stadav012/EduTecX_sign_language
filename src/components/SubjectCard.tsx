import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LearningPath } from '@/types';

interface SubjectCardProps {
    subject: LearningPath;
    onClick: () => void;
}

export function SubjectCard({ subject, onClick }: SubjectCardProps) {
    const IconComponent = subject.icon;

    return (
        <Card className='hover:shadow-lg transition-all duration-300 max-w-md'>
            <CardHeader className='text-center'>
                <div className='mx-auto mb-4 p-3 bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center'>
                    {IconComponent && (
                        <IconComponent className='w-7 h-7 text-primary' />
                    )}
                </div>
                <CardTitle className='text-xl mb-2'>{subject.title}</CardTitle>
                <CardDescription className='text-sm text-gray-600'>
                    {subject.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button
                    onClick={onClick}
                    className='w-full bg-primary hover:bg-primary/90'
                >
                    Start Learning
                </Button>
            </CardContent>
        </Card>
    );
}
