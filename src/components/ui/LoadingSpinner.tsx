import React from 'react';
import {IconRefresh} from '@tabler/icons-react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
    className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    text = "Loading...",
    className = ""
}) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-8 h-8'
    };

    return (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
            <IconRefresh className={`animate-spin -scale-y-100 text-blue-500 ${sizeClasses[size]}`}/>
            {text && <p className="text-gray-700 font-medium">{text}</p>}
        </div>
    );
};

export default LoadingSpinner;