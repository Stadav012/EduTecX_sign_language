import * as React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
    label: string; // Add label prop
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, className, type, ...props }, ref) => {
        return (
            <div className='mb-4'>
                {' '}
                {/* Wrapping the input field with a div for spacing */}
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                    {label}
                </label>
                <input
                    type={type}
                    className={cn(
                        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);
Input.displayName = 'Input';

export { Input };
