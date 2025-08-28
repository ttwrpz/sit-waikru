import React from "react";
import {IconArrowLeft, IconHeart, IconHome} from '@tabler/icons-react';
import PageWrapper from '@/components/layout/PageWrapper';

interface NotFoundPageProps {
    onGoHome?: () => void;
    onGoBack?: () => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({
    onGoHome = () => window.location.href = '/',
    onGoBack = () => window.history.back()
}) => {
    return (
        <PageWrapper>
            <div className="min-h-svh flex items-center justify-center">
                <main className="max-w-4xl mx-auto px-4 py-16">
                    <div className="text-center">
                        <div className="relative mb-8">
                            <div className="text-9xl font-bold text-gray-200 select-none">
                                404
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div
                                    className="w-24 h-24 glass-blue rounded-full flex items-center justify-center bounce-404">
                                    <IconHeart className="w-12 h-12 text-blue-600"/>
                                </div>
                            </div>
                        </div>

                        <div className="liquid-glass rounded-3xl p-8 mb-8">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    Page Not Found
                                </h2>
                                <p className="md:text-xl text-gray-600 mb-6 font-medium">
                                    The page you're looking for seems to have wandered off,
                                    just like students before Teacher Appreciation Day!
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={onGoHome}
                                    className="glass-btn glass-blue flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-blue-700 font-medium"
                                >
                                    <IconHome className="w-5 h-5"/>
                                    Go to Home Page
                                </button>
                                <button
                                    onClick={onGoBack}
                                    className="glass-btn liquid-glass flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-gray-700 font-medium"
                                >
                                    <IconArrowLeft className="w-5 h-5"/>
                                    Go Back
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </PageWrapper>
    );
};

export default NotFoundPage;