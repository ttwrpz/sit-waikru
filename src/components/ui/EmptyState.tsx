import React from 'react';

interface EmptyStateProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    iconColor?: string;
    className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    icon,
    title,
    description,
    iconColor = "text-purple-600",
    className = "text-center py-16 pb-28"
}) => {
    return (
        <div className={className}>
            <div className="liquid-glass rounded-3xl p-8 mx-auto w-fit">
                <div
                    className={`w-24 h-24 mx-auto glass-purple rounded-full flex items-center justify-center mb-6 floating`}>
                    <div className={iconColor}>
                        {icon}
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {title}
                </h2>
                <p className="text-gray-600 text-lg">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default EmptyState;