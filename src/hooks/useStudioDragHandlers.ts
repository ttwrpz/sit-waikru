import React, {useCallback} from 'react';
import type {FlowerData} from '@/types/message';
import {createSparkleEffect} from '@/utils/studioUtils';

interface UseStudioDragHandlersProps {
    isMobile: boolean;
    canvasRef: React.RefObject<HTMLDivElement | null>;
    garlandFlowers: FlowerData[];
    dragOffset: { x: number; y: number };
    selectedFlower: string | null;
    addFlowerToCanvas: (emoji: string, x: number, y: number) => void;
    setDraggedFlower: (flower: { emoji: string; name: string } | null) => void;
    setIsDragging: (id: string | null) => void;
    setDragOffset: (offset: { x: number; y: number }) => void;
    setSelectedFlower: (id: string | null) => void;
    setGarlandFlowers: React.Dispatch<React.SetStateAction<FlowerData[]>>;
}

export const useStudioDragHandlers = ({
    isMobile,
    canvasRef,
    garlandFlowers,
    dragOffset,
    selectedFlower,
    addFlowerToCanvas,
    setDraggedFlower,
    setIsDragging,
    setDragOffset,
    setSelectedFlower,
    setGarlandFlowers
}: UseStudioDragHandlersProps) => {

    const handleDragStart = (flower: { emoji: string; name: string }) => {
        if (isMobile) {
            if (canvasRef.current) {
                const rect = canvasRef.current.getBoundingClientRect();
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                addFlowerToCanvas(flower.emoji, centerX, centerY);

                if ('vibrate' in navigator) {
                    navigator.vibrate(50);
                }
            }
            return;
        }

        setDraggedFlower(flower);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        if (canvasRef.current) {
            canvasRef.current.classList.add('drag-active');
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        if (canvasRef.current && !canvasRef.current.contains(e.relatedTarget as Node)) {
            canvasRef.current.classList.remove('drag-active');
        }
    };

    const handleDrop = (e: React.DragEvent, draggedFlower: { emoji: string; name: string } | null) => {
        e.preventDefault();
        if (canvasRef.current) {
            canvasRef.current.classList.remove('drag-active');
        }

        if (draggedFlower && canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            addFlowerToCanvas(draggedFlower.emoji, x, y);
            createSparkleEffect(e.clientX, e.clientY);
        }
        setDraggedFlower(null);
    };

    const handleMouseDown = useCallback((e: React.MouseEvent, flowerId: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.target && (e.target as HTMLElement).closest('.control-btn')) {
            return;
        }

        if (isMobile) {
            setSelectedFlower(selectedFlower === flowerId ? null : flowerId);
            return;
        }

        setIsDragging(flowerId);
        const canvas = canvasRef.current;
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const flower = garlandFlowers.find(f => f.id === flowerId);
            if (flower) {
                const actualX = flower.anchorX * rect.width;
                const actualY = flower.anchorY * rect.height;
                setDragOffset({
                    x: e.clientX - rect.left - actualX,
                    y: e.clientY - rect.top - actualY
                });
            }
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (canvasRef.current) {
                const rect = canvasRef.current.getBoundingClientRect();
                const flower = garlandFlowers.find(f => f.id === flowerId);

                if (flower) {
                    const baseSize = flower.size * 0.6;
                    const responsiveSize = window.innerWidth <= 480 ?
                        Math.min(baseSize * 0.75, 1.8) :
                        window.innerWidth <= 768 ?
                            Math.min(baseSize * 1.25, 2.5) :
                            Math.min(baseSize * 1.6, 3);

                    const flowerSizeInPixels = responsiveSize * 16;
                    const flowerSizeRatio = flowerSizeInPixels / rect.width;
                    const flowerHeightRatio = (flowerSizeInPixels * 1.2) / rect.height;

                    const newX = e.clientX - rect.left - dragOffset.x;
                    const newY = e.clientY - rect.top - dragOffset.y;

                    const newAnchorX = Math.max(0.01, Math.min(1 - flowerSizeRatio - 0.01, newX / rect.width));
                    const newAnchorY = Math.max(0.01, Math.min(1 - flowerHeightRatio - 0.01, newY / rect.height));

                    setGarlandFlowers(prev => prev.map(f =>
                        f.id === flowerId ? {...f, anchorX: newAnchorX, anchorY: newAnchorY} : f
                    ));
                }
            }
        };

        const handleMouseUp = () => {
            setIsDragging(null);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [garlandFlowers, dragOffset, isMobile, selectedFlower]);

    const handleTouchStart = useCallback((e: React.TouchEvent, flowerId: string) => {
        e.stopPropagation();

        if (e.target && (e.target as HTMLElement).closest('.control-btn')) {
            return;
        }

        const touch = e.touches[0];
        setIsDragging(flowerId);
        setSelectedFlower(null);

        const canvas = canvasRef.current;
        if (canvas) {
            const rect = canvas.getBoundingClientRect();
            const flower = garlandFlowers.find(f => f.id === flowerId);
            if (flower) {
                const actualX = flower.anchorX * rect.width;
                const actualY = flower.anchorY * rect.height;
                setDragOffset({
                    x: touch.clientX - rect.left - actualX,
                    y: touch.clientY - rect.top - actualY
                });
            }
        }

        if ('vibrate' in navigator) {
            navigator.vibrate(30);
        }

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            const touch = e.touches[0];

            if (canvasRef.current) {
                const rect = canvasRef.current.getBoundingClientRect();
                const flower = garlandFlowers.find(f => f.id === flowerId);

                if (flower) {
                    const baseSize = flower.size * 0.6;
                    const responsiveSize = window.innerWidth <= 480 ?
                        Math.min(baseSize * 0.75, 1.8) :
                        window.innerWidth <= 768 ?
                            Math.min(baseSize * 1.25, 2.5) :
                            Math.min(baseSize * 1.6, 3);

                    const flowerSizeInPixels = responsiveSize * 16;
                    const flowerSizeRatio = flowerSizeInPixels / rect.width;
                    const flowerHeightRatio = (flowerSizeInPixels * 1.2) / rect.height;

                    const newX = touch.clientX - rect.left - dragOffset.x;
                    const newY = touch.clientY - rect.top - dragOffset.y;

                    const newAnchorX = Math.max(0.01, Math.min(1 - flowerSizeRatio - 0.01, newX / rect.width));
                    const newAnchorY = Math.max(0.01, Math.min(1 - flowerHeightRatio - 0.01, newY / rect.height));

                    setGarlandFlowers(prev => prev.map(f =>
                        f.id === flowerId ? {...f, anchorX: newAnchorX, anchorY: newAnchorY} : f
                    ));
                }
            }
        };

        const handleTouchEnd = () => {
            setIsDragging(null);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };

        document.addEventListener('touchmove', handleTouchMove, {passive: false});
        document.addEventListener('touchend', handleTouchEnd);
    }, [garlandFlowers, dragOffset]);

    return {
        handleDragStart,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleMouseDown,
        handleTouchStart
    };
};