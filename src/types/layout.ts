import React from "react";

export interface BaseLayoutProps {
    children: React.ReactNode;
}

export interface ErrorFallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
}

export interface AppErrorBoundaryProps extends BaseLayoutProps {
    isDevelopment?: boolean;
}