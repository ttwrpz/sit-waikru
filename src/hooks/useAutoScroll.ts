import {useEffect, useRef, useState} from 'react';

export const useAutoScroll = (totalPages: number, nextPage: () => void) => {
    const [autoScroll, setAutoScroll] = useState<boolean>(true);
    const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (autoScroll && totalPages > 1) {
            autoScrollIntervalRef.current = setInterval(() => {
                nextPage();
            }, 15000);
        } else if (autoScrollIntervalRef.current) {
            clearInterval(autoScrollIntervalRef.current);
            autoScrollIntervalRef.current = null;
        }

        return () => {
            if (autoScrollIntervalRef.current) {
                clearInterval(autoScrollIntervalRef.current);
            }
        };
    }, [autoScroll, totalPages, nextPage]);

    const toggleAutoScroll = () => {
        setAutoScroll(prev => !prev);
    };

    return {autoScroll, toggleAutoScroll};
};