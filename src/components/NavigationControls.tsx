import React from 'react';
import {IconChevronLeft, IconChevronRight} from '@tabler/icons-react';

interface NavigationControlsProps {
    currentPage: number;
    totalPages: number;
    onPrevPage: () => void;
    onNextPage: () => void;
    onGoToPage: (page: number) => void;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
    currentPage,
    totalPages,
    onPrevPage,
    onNextPage,
    onGoToPage
}) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-4 mb-4 md:my-8">
            <button
                onClick={onPrevPage}
                className="liquid-glass glass-btn p-3 rounded-full hover:scale-105 transition-transform duration-200"
                disabled={totalPages <= 1}
            >
                <IconChevronLeft className="w-5 h-5 text-gray-700"/>
            </button>

            <p className="md:hidden text-xs text-gray-500">
                Page {currentPage + 1} of {totalPages}
            </p>

            <div className="hidden md:flex items-center gap-2">
                {Array.from({length: totalPages}, (_, i) => (
                    <button
                        key={i}
                        onClick={() => onGoToPage(i)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            i === currentPage
                                ? 'bg-blue-500 scale-125'
                                : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                    />
                ))}
            </div>

            <button
                onClick={onNextPage}
                className="liquid-glass glass-btn p-3 rounded-full hover:scale-105 transition-transform duration-200"
                disabled={totalPages <= 1}
            >
                <IconChevronRight className="w-5 h-5 text-gray-700"/>
            </button>
        </div>
    );
};

export default NavigationControls;