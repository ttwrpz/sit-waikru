import React from 'react';

interface PageHeaderProps {
    title?: string;
    showCopyright?: boolean;
    className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
    title = "SIT WaiKru",
    showCopyright = true,
    className = "max-w-7xl mx-auto px-4 pt-16"
}) => {
    return (
        <div className={className}>
            <div className="text-center">
                <h1 className="font-tan-pearl text-5xl font-bold gradient-text-blue mb-1 leading-relaxed">
                    {title}
                </h1>
                {showCopyright && (
                    <p className="text-gray-600 text-sm">
                        &copy; {new Date().getFullYear()} School of Information Technology KMUTT
                    </p>
                )}
            </div>
        </div>
    );
};

export default PageHeader;