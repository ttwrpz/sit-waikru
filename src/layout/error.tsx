import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {IconAlertTriangle, IconBug, IconHome, IconRefresh} from '@tabler/icons-react';
import type {AppErrorBoundaryProps, ErrorFallbackProps} from '@/types/layout';
import PageWrapper from '@/components/layout/PageWrapper';

const DevErrorFallback: React.FC<ErrorFallbackProps> = ({error, resetErrorBoundary}) => {
    return (
        <PageWrapper>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="liquid-glass rounded-3xl p-8">
                    <div className="text-center mb-8">
                        <div
                            className="w-16 h-16 mx-auto glass-red rounded-full flex items-center justify-center mb-4 floating">
                            <IconBug className="w-8 h-8 text-red-600"/>
                        </div>
                        <h1 className="text-3xl font-bold gradient-text-red mb-2">
                            Development Error
                        </h1>
                        <p className="text-red-700 font-medium">
                            SIT WaiKru encountered an error during development
                        </p>
                    </div>

                    <div className="glass-red rounded-xl p-6 mb-6">
                        <h2 className="text-xl font-semibold text-red-800 mb-3">Error Message:</h2>
                        <p className="text-red-700 font-mono text-sm bg-red-50 p-3 rounded-lg">
                            {error.message}
                        </p>
                    </div>

                    <div className="liquid-glass rounded-xl p-6 mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Stack Trace:</h2>
                        <pre
                            className="text-xs text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
                            {error.stack}
                        </pre>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={resetErrorBoundary}
                            className="glass-btn glass-red flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-red-700 font-medium"
                        >
                            <IconRefresh className="w-5 h-5"/>
                            Try Again
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="glass-btn liquid-glass flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-gray-700 font-medium"
                        >
                            <IconHome className="w-5 h-5"/>
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

const ProdErrorFallback: React.FC<ErrorFallbackProps> = ({resetErrorBoundary}) => {
    return (
        <div
            className="min-h-svh flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="liquid-glass rounded-3xl p-8">
                    <div className="text-center mb-8">
                        <div
                            className="w-16 h-16 mx-auto glass-yellow rounded-full flex items-center justify-center mb-4 floating">
                            <IconAlertTriangle className="w-8 h-8 text-yellow-600"/>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Something went wrong
                        </h1>
                        <p className="text-gray-600 font-medium">
                            We're sorry, but SIT WaiKru encountered an unexpected error
                        </p>
                    </div>

                    <div className="glass-blue rounded-2xl p-6 text-center mb-8">
                        <p className="text-lg text-blue-700 font-medium italic">
                            "Even when things go wrong, we appreciate your patience and the dedication of our teachers"
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={resetErrorBoundary}
                            className="glass-btn glass-blue flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-blue-700 font-medium"
                        >
                            <IconRefresh className="w-5 h-5"/>
                            Try Again
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="glass-btn liquid-glass flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-gray-700 font-medium"
                        >
                            <IconHome className="w-5 h-5"/>
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AppErrorBoundary: React.FC<AppErrorBoundaryProps> = ({
    children,
    isDevelopment = process.env.NODE_ENV === 'development'
}) => {
    const ErrorFallback = isDevelopment ? DevErrorFallback : ProdErrorFallback;

    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error, errorInfo) => {
                if (isDevelopment) {
                    console.error('Error caught by boundary:', error, errorInfo);
                }
            }}
        >
            {children}
        </ErrorBoundary>
    );
};

export default AppErrorBoundary;
export {DevErrorFallback, ProdErrorFallback};