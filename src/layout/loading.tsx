import React from 'react';
import {IconHeart} from '@tabler/icons-react';
import PageWrapper from '@/components/layout/PageWrapper';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface LoadingLayoutProps {
    message?: string;
    showQuote?: boolean;
}

const LoadingLayout: React.FC<LoadingLayoutProps> = ({
    message = "Welcome to SIT WaiKru Website...",
    showQuote = true
}) => {
    return (
        <PageWrapper>
            <div className="flex items-center justify-center p-4 min-h-svh">
                <div className="liquid-glass rounded-3xl p-8 text-center flex flex-col gap-4">
                    <div
                        className="size-24 mx-auto glass-blue rounded-full flex items-center justify-center mb-4 floating">
                        <IconHeart className="size-12 text-blue-600 animate-pulse"/>
                    </div>

                    <LoadingSpinner text={message} className="text-lg"/>

                    {showQuote && (
                        <div className="glass-purple rounded-xl p-4">
                            <p className="text-sm text-purple-700 font-medium italic">
                                "Thank you for your dedication to education and inspiring students every day"
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </PageWrapper>
    );
};

export default LoadingLayout;