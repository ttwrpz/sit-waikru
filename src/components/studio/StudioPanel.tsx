import React from 'react';
import {IconTrash} from '@tabler/icons-react';
import {flowers} from '@/data/flowers';

interface StudioPanelProps {
    selectedSize: number;
    isMobile: boolean;
    onSizeChange: (size: number) => void;
    onFlowerSelect: (flower: { emoji: string; name: string }) => void;
    onCreatePattern: (type: string) => void;
    onClearCanvas: () => void;
}

const StudioPanel: React.FC<StudioPanelProps> = ({
    selectedSize,
    isMobile,
    onSizeChange,
    onFlowerSelect,
    onCreatePattern,
    onClearCanvas
}) => {
    return (
        <div className="liquid-glass rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
                Decoration Studio
            </h3>

            <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Flowers & Decorations</h4>
                <div className="grid grid-cols-4 gap-2">
                    {flowers.map((flower, index) => (
                        <div
                            key={`flower-seed-${index}`}
                            className="flower-seed liquid-glass glass-btn p-3 rounded-xl text-center cursor-grab select-none"
                            draggable={!isMobile}
                            onDragStart={() => !isMobile && onFlowerSelect(flower)}
                            onClick={() => isMobile && onFlowerSelect(flower)}
                            title={flower.name}
                        >
                            <span className="sm:text-xl md:text-2xl">{flower.emoji}</span>
                        </div>
                    ))}
                </div>
                {isMobile && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        Tap flowers to add them to canvas
                    </p>
                )}
            </div>

            <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Size: {selectedSize}x
                </h4>
                <input
                    type="range"
                    min="1.5"
                    max="3"
                    step="0.25"
                    value={selectedSize}
                    onChange={(e) => onSizeChange(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg appearance-none cursor-pointer"
                />
            </div>

            <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Template Patterns</h4>
                <div className="grid grid-cols-2 gap-2 user-select">
                    <button
                        onClick={() => onCreatePattern('garland')}
                        className="liquid-glass glass-btn p-2 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:text-blue-700"
                    >
                        🌼 Garland
                    </button>
                    <button
                        onClick={() => onCreatePattern('heart')}
                        className="liquid-glass glass-btn p-2 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:text-blue-700"
                    >
                        💖 Heart
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
                <button
                    onClick={onClearCanvas}
                    className="liquid-glass glass-btn glass-orange p-3 rounded-lg text-orange-700 font-medium hover:text-orange-800 flex items-center justify-center gap-2 text-sm"
                >
                    <IconTrash className="w-4 h-4"/>
                    Clear Canvas
                </button>
            </div>
        </div>
    );
};

export default StudioPanel;