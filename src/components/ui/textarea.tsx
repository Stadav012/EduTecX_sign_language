import * as React from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.ComponentProps<'textarea'> {
    label: string; // Add label prop
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, className, ...props }, ref) => {
        return (
            <div className='mb-4'>
                {' '}
                {/* Wrapping the textarea with a div for spacing */}
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                    {label}
                </label>
                <textarea
                    className={cn(
                        'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);
Textarea.displayName = 'Textarea';

export { Textarea };
