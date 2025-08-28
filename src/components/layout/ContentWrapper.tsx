import React from 'react';
import type {BaseLayoutProps} from '@/types/layout';

interface ContentWrapperProps extends BaseLayoutProps {
    className?: string;
    as?: keyof React.JSX.IntrinsicElements;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({
    children,
    className = "max-w-7xl mx-auto px-4 pb-16 h-full flex-1 flex items-center justify-center",
    as: Component = "main"
}) => {
    return (
        <Component className={className}>
            {children}
        </Component>
    );
};

export default ContentWrapper;