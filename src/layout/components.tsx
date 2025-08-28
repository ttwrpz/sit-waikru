import React from "react";

interface CopyrightProps {
    className?: string;
    showImage?: boolean;
}

const Copyright: React.FC<CopyrightProps> = ({
    className = "hidden min-[978px]:block fixed bottom-4 right-4 scale-65 origin-bottom-right select-none pointer-events-none",
    showImage = true
}) => {
    return (
        <div className={className}>
            {showImage && (
                <img
                    src="/sit30th.png"
                    alt="SIT 30th Years Anniversary"
                    className="max-w-xs mx-auto w-full"
                />
            )}
            <p className="text-gray-600 text-sm">
                &copy; {new Date().getFullYear()} School of Information Technology KMUTT
            </p>
        </div>
    );
};

export {Copyright};