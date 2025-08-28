import {useEffect, useState} from 'react';
import {onValue, ref} from 'firebase/database';
import {database} from '@/lib/firebase';
import type {Message} from '@/types/message';

export const useMessages = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const messagesRef = ref(database, 'messages');

        const unsubscribe = onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const messagesList: Message[] = Object.entries(data).map(([id, message]: [string, any]) => ({
                    id,
                    ...message,
                    reactions: message.reactions || {}
                })).sort((a, b) => {
                    const aTime = typeof a.timestamp === 'number' ? a.timestamp : new Date(a.timestamp).getTime();
                    const bTime = typeof b.timestamp === 'number' ? b.timestamp : new Date(b.timestamp).getTime();
                    return bTime - aTime;
                });
                setMessages(messagesList);
            } else {
                setMessages([]);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return {messages, isLoading};
};