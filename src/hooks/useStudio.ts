import React, {useEffect, useRef, useState} from 'react';
import {push, ref, serverTimestamp} from 'firebase/database';
import {useNavigate} from 'react-router';
import {database} from '@/lib/firebase';
import type {FlowerData} from '@/types/message';
import type {CanvasDimensions, FormData} from '@/types/studio';
import {generateUniqueId} from '@/utils/studioUtils';

export const useStudio = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        name: '',
        major: 'CS',
        message: ''
    });

    const [garlandFlowers, setGarlandFlowers] = useState<FlowerData[]>([]);
    const [selectedSize, setSelectedSize] = useState<number>(2.5);
    const [draggedFlower, setDraggedFlower] = useState<{ emoji: string; name: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [canvasDimensions, setCanvasDimensions] = useState<CanvasDimensions>({width: 400, height: 300});
    const [isDragging, setIsDragging] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({x: 0, y: 0});
    const [selectedFlower, setSelectedFlower] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isCreatingPattern, setIsCreatingPattern] = useState<boolean>(false);

    const canvasRef = useRef<HTMLDivElement>(null);
    const patternTimeoutsRef = useRef<NodeJS.Timeout[]>([]);
    const clearPatternTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const updateCanvasDimensions = () => {
            if (canvasRef.current) {
                const rect = canvasRef.current.getBoundingClientRect();
                setCanvasDimensions({width: rect.width, height: rect.height});
            }
        };

        updateCanvasDimensions();
        window.addEventListener('resize', updateCanvasDimensions);
        return () => window.removeEventListener('resize', updateCanvasDimensions);
    }, []);

    const clearAllPatternTimeouts = () => {
        patternTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
        patternTimeoutsRef.current = [];

        if (clearPatternTimeoutRef.current) {
            clearTimeout(clearPatternTimeoutRef.current);
            clearPatternTimeoutRef.current = null;
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const addFlowerToCanvas = (emoji: string, x: number, y: number) => {
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const anchorX = Math.max(0.05, Math.min(0.95, x / rect.width));
        const anchorY = Math.max(0.05, Math.min(0.95, y / rect.height));

        const newFlower: FlowerData = {
            id: generateUniqueId(),
            emoji,
            name: emoji,
            anchorX,
            anchorY,
            size: selectedSize,
            rotation: Math.random() * 20 - 10,
            flip: false
        };

        setGarlandFlowers(prev => [...prev, newFlower]);
    };

    const deleteFlower = (id: string) => {
        setGarlandFlowers(prev => prev.filter(f => f.id !== id));
    };

    const rotateFlower = (id: string) => {
        setGarlandFlowers(prev => prev.map(f =>
            f.id === id ? {...f, rotation: f.rotation + 15} : f
        ));
    };

    const flipFlower = (id: string) => {
        setGarlandFlowers(prev => prev.map(f =>
            f.id === id ? {...f, flip: !f.flip} : f
        ));
    };

    const clearCanvas = () => {
        clearAllPatternTimeouts();
        setIsCreatingPattern(false);
        setGarlandFlowers([]);
    };

    const createTraditionalGarland = () => {
        const loopFlowers = ['🌼', '🌸', '🌺', '🌷', '🌸'];
        const tailFlowers = ['🌹', '💐', '🌸'];
        const loopCount = 28;

        const radiusX = 0.10;
        const radiusY = 0.18;
        const centerX = 0.45;
        const centerY = 0.35;

        for (let i = 0; i < loopCount; i++) {
            const angle = (i / loopCount) * 2 * Math.PI;
            const anchorX = centerX + radiusX * Math.cos(angle);
            const anchorY = centerY + radiusY * Math.sin(angle);

            const timeout = setTimeout(() => {
                const newFlower: FlowerData = {
                    id: generateUniqueId(),
                    emoji: loopFlowers[i % loopFlowers.length],
                    name: loopFlowers[i % loopFlowers.length],
                    anchorX: Math.max(0.05, Math.min(0.95, anchorX)),
                    anchorY: Math.max(0.05, Math.min(0.95, anchorY)),
                    size: selectedSize,
                    rotation: Math.random() * 20 - 10,
                    flip: false
                };
                setGarlandFlowers(prev => [...prev, newFlower]);
            }, i * 20);

            patternTimeoutsRef.current.push(timeout);
        }

        const tailLength = 5;
        const tailSpacingY = 0.055;
        const tailStartY = centerY + radiusY + 0.04;

        const tails = [
            {centerX: centerX - 0.045, curveX: -0.008},
            {centerX: centerX, curveX: 0},
            {centerX: centerX + 0.045, curveX: 0.008}
        ];

        tails.forEach((tail, tailIndex) => {
            for (let i = 0; i < tailLength; i++) {
                const anchorX = tail.centerX + i * tail.curveX;
                const anchorY = tailStartY + i * tailSpacingY;

                const timeout = setTimeout(() => {
                    const newFlower: FlowerData = {
                        id: generateUniqueId(),
                        emoji: tailFlowers[(i + tailIndex) % tailFlowers.length],
                        name: tailFlowers[(i + tailIndex) % tailFlowers.length],
                        anchorX: Math.max(0.05, Math.min(0.95, anchorX)),
                        anchorY: Math.max(0.05, Math.min(0.95, anchorY)),
                        size: selectedSize,
                        rotation: Math.random() * 20 - 10,
                        flip: false
                    };
                    setGarlandFlowers(prev => [...prev, newFlower]);
                }, (loopCount + i + tailIndex * tailLength) * 20);

                patternTimeoutsRef.current.push(timeout);
            }
        });

        const finalTimeout = setTimeout(() => {
            setIsCreatingPattern(false);
            patternTimeoutsRef.current = [];
        }, (loopCount + tailLength * 3) * 20 + 100);

        patternTimeoutsRef.current.push(finalTimeout);
    };

    const createHeartPattern = () => {
        const flowers = ['💖', '🌹', '🌸', '🌺'];
        const totalPoints = 36;

        for (let i = 0; i < totalPoints; i++) {
            const t = (i / totalPoints) * 2 * Math.PI;

            const scaleX = 0.015;
            const scaleY = 0.025;
            const heartX = scaleX * 16 * Math.pow(Math.sin(t), 3);
            const heartY = -scaleY * (
                13 * Math.cos(t) -
                5 * Math.cos(2 * t) -
                2 * Math.cos(3 * t) -
                Math.cos(4 * t)
            );

            const anchorX = 0.45 + heartX;
            const anchorY = 0.36 + heartY;

            const timeout = setTimeout(() => {
                const newFlower: FlowerData = {
                    id: generateUniqueId(),
                    emoji: flowers[i % flowers.length],
                    name: flowers[i % flowers.length],
                    anchorX: Math.max(0.05, Math.min(0.95, anchorX)),
                    anchorY: Math.max(0.05, Math.min(0.95, anchorY)),
                    size: selectedSize,
                    rotation: Math.random() * 20 - 10,
                    flip: false
                };
                setGarlandFlowers(prev => [...prev, newFlower]);
            }, i * 35);

            patternTimeoutsRef.current.push(timeout);
        }

        const finalTimeout = setTimeout(() => {
            setIsCreatingPattern(false);
            patternTimeoutsRef.current = [];
        }, totalPoints * 35 + 100);

        patternTimeoutsRef.current.push(finalTimeout);
    };

    const createPattern = (type: string) => {
        if (isCreatingPattern) return;
        clearAllPatternTimeouts();

        setIsCreatingPattern(true);
        setGarlandFlowers([]);

        clearPatternTimeoutRef.current = setTimeout(() => {
            switch (type) {
                case 'garland':
                    createTraditionalGarland();
                    break;
                case 'heart':
                    createHeartPattern();
                    break;
            }
        }, 100);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (garlandFlowers.length === 0) {
            alert('🪷 Please create a garland first! ✨');
            return;
        }

        setIsSubmitting(true);

        try {
            const messageData = {
                name: formData.name || 'Anonymous',
                major: formData.major,
                message: formData.message,
                garland: garlandFlowers,
                timestamp: serverTimestamp(),
                status: 'sent'
            };

            await push(ref(database, 'messages'), messageData);

            setFormData({name: '', major: 'CS', message: ''});
            setGarlandFlowers([]);

            navigate('/');
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        garlandFlowers,
        selectedSize,
        draggedFlower,
        isSubmitting,
        canvasDimensions,
        isDragging,
        dragOffset,
        selectedFlower,
        isMobile,
        isCreatingPattern,
        canvasRef,
        setSelectedSize,
        setDraggedFlower,
        setIsDragging,
        setDragOffset,
        setSelectedFlower,
        setGarlandFlowers,
        handleInputChange,
        addFlowerToCanvas,
        deleteFlower,
        rotateFlower,
        flipFlower,
        clearCanvas,
        createPattern,
        handleSubmit
    };
};