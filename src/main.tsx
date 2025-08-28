import {StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import routes from '~react-pages';
import {BrowserRouter, useRoutes} from 'react-router';
import ErrorLayout from "./layout/error.tsx";
import LoadingLayout from "./layout/loading.tsx";
import FeatureFreezeGuard from "./components/FeatureFreezeGuard.tsx";

const container = document.getElementById('root');

if (!container) {
    throw new Error('Root container not found');
}

const root = (container as any).__reactRoot ?? createRoot(container);
(container as any).__reactRoot = root;

export const App = () => {
    const PageContent = useRoutes(routes);
    return (
        <FeatureFreezeGuard>
            <Suspense fallback={<LoadingLayout/>}>{PageContent}</Suspense>
        </FeatureFreezeGuard>
    );
};

root.render(
    <StrictMode>
        <ErrorLayout>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ErrorLayout>
    </StrictMode>,
);