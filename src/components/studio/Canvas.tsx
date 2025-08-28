import React from 'react';
import {IconFlipVertical, IconFlower, IconRotate, IconTrash} from '@tabler/icons-react';
import type {FlowerData} from '@/types/message';
import type {CanvasDimensions} from '@/types/studio';

interface CanvasProps {
    canvasRef: React.RefObject<HTMLDivElement | null>;
    garlandFlowers: FlowerData[];
    canvasDimensions: CanvasDimensions;
    isDragging: string | null;
    isMobile: boolean;
    selectedFlower: string | null;
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
    onMouseDown?: (e: React.MouseEvent, flowerId: string) => void;
    onTouchStart?: (e: React.TouchEvent, flowerId: string) => void;
    onFlowerClick?: (e: React.MouseEvent, flowerId: string) => void;
    onRotateFlower: (id: string) => void;
    onFlipFlower: (id: string) => void;
    onDeleteFlower: (id: string) => void;
}

const Canvas: React.FC<CanvasProps> = ({
    canvasRef,
    garlandFlowers,
    canvasDimensions,
    isDragging,
    isMobile,
    selectedFlower,
    onDragOver,
    onDragLeave,
    onDrop,
    onMouseDown,
    onTouchStart,
    onFlowerClick,
    onRotateFlower,
    onFlipFlower,
    onDeleteFlower
}) => {
    return (
        <div className="liquid-glass rounded-2xl space-y-4 p-6 mb-6">
            <div className="flex flex-row flex-wrap justify-between mb-4">
                <div className="flex-2/3 space-y-1">
                    <h3 className="text-xl font-bold text-gray-900">
                        Garland Canvas
                    </h3>
                    {garlandFlowers.length === 0 && (
                        <p className="text-sm text-gray-500">
                            Please create a garland first before sending your message
                        </p>
                    )}
                </div>

                <div className="text-right flex-1/3">
                    <div className="text-xl font-bold text-blue-700 space-y-1">
                        {garlandFlowers.length}
                    </div>
                    <div className="text-xs text-blue-600">Decoration in Canvas</div>
                </div>
            </div>

            <div
                ref={canvasRef}
                className="garland-canvas relative"
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                {garlandFlowers.length === 0 && (
                    <div className="absolute inset-0 p-4 flex items-center justify-center text-gray-400">
                        <div className="text-center">
                            <IconFlower className="size-4 md:size-12 mb-3 text-center mx-auto"/>
                            <div className="text-sm md:text-md font-semibold mb-2">
                                Drag flowers & decorations here
                            </div>
                            <div className="text-xs md:text-sm">
                                Craft a beautiful traditional garland for Teacher Appreciation Day
                            </div>
                        </div>
                    </div>
                )}

                {garlandFlowers.map((flower) => {
                    const actualX = flower.anchorX * canvasDimensions.width;
                    const actualY = flower.anchorY * canvasDimensions.height;

                    const baseSize = flower.size * 0.6;
                    const responsiveSize = window.innerWidth <= 480 ?
                        Math.min(baseSize * 0.75, 1.8) :
                        window.innerWidth <= 768 ?
                            Math.min(baseSize * 1.25, 2.5) :
                            Math.min(baseSize * 1.6, 3);

                    return (
                        <div
                            key={flower.id + isMobile}
                            className={`placed-flower ${isDragging === flower.id ? 'dragging' : ''}`}
                            style={{
                                left: actualX + 'px',
                                top: actualY + 'px',
                                fontSize: responsiveSize + 'rem',
                                transformOrigin: 'center'
                            }}
                            onMouseDown={!isMobile ? (e) => onMouseDown?.(e, flower.id) : undefined}
                            onTouchStart={isMobile ? (e) => onTouchStart?.(e, flower.id) : undefined}
                            onClick={isMobile ? (e) => onFlowerClick?.(e, flower.id) : undefined}
                        >
                            <div className="flower-controls" hidden={isDragging === flower.id}>
                                <button className="control-btn" onClick={() => onRotateFlower(flower.id)}>
                                    <IconRotate className="w-3 h-3"/>
                                </button>
                                <button className="control-btn" onClick={() => onFlipFlower(flower.id)}>
                                    <IconFlipVertical className="w-3 h-3"/>
                                </button>
                                <button className="control-btn" onClick={() => onDeleteFlower(flower.id)}>
                                    <IconTrash className="w-3 h-3"/>
                                </button>
                            </div>
                            <span
                                className="flower-emoji"
                                style={{
                                    transform: `rotate(${flower.rotation}deg) ${flower.flip ? 'scaleX(-1)' : ''}`,
                                    transformOrigin: 'center',
                                    display: 'inline-block'
                                }}
                            >
                                {flower.emoji}
                            </span>
                        </div>
                    );
                })}
            </div>
            {isMobile && garlandFlowers.length > 0 && (
                <p className="text-xs text-gray-500 mt-2 text-center">
                    Tap flowers to select them and see controls
                </p>
            )}
        </div>
    );
};

export default Canvas;