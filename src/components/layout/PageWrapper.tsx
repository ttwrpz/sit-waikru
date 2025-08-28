import React from 'react';
import type {BaseLayoutProps} from '@/types/layout';

const PageWrapper: React.FC<BaseLayoutProps> = ({children}) => {
    return (
        <div className="min-h-svh bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {children}
        </div>
    );
};

export default PageWrapper;