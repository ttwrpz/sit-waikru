import {useEffect, useState} from 'react';
import type {Message} from '@/types/message';

export const useGarlandDimensions = (messages: Message[], currentPage: number) => {
    const [garlandDimensions, setGarlandDimensions] = useState<{
        [key: string]: { width: number; height: number }
    }>({});

    useEffect(() => {
        const updateGarlandDimensions = () => {
            const garlandElements = document.querySelectorAll('.message-garland');
            const newDimensions: { [key: string]: { width: number; height: number } } = {};

            garlandElements.forEach((element) => {
                const messageId = element.getAttribute('data-message-id');
                if (messageId) {
                    const rect = element.getBoundingClientRect();
                    const paddingLeft = window.innerWidth <= 480 ? 10 : 15;
                    const paddingTop = window.innerWidth <= 480 ? 10 : 15;
                    const paddingRight = window.innerWidth <= 480 ? 14 : 20;
                    const paddingBottom = window.innerWidth <= 480 ? 14 : 20;

                    newDimensions[messageId] = {
                        width: rect.width - paddingLeft - paddingRight,
                        height: rect.height - paddingTop - paddingBottom
                    };
                }
            });

            setGarlandDimensions(newDimensions);
        };

        setTimeout(updateGarlandDimensions, 100);

        let resizeTimeout: NodeJS.Timeout;
        const debouncedUpdate = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateGarlandDimensions, 150);
        };

        window.addEventListener('resize', debouncedUpdate);
        return () => {
            window.removeEventListener('resize', debouncedUpdate);
            clearTimeout(resizeTimeout);
        };
    }, [messages, currentPage]);

    return garlandDimensions;
};