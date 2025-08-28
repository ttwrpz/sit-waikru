import {useState} from 'react';
import {get, ref, set} from 'firebase/database';
import {database} from '@/lib/firebase';

export const useReactions = () => {
    const [reactionAnimations, setReactionAnimations] = useState<Map<string, number>>(new Map());

    const handleReaction = async (messageId: string, reactionKey: string) => {
        try {
            const reactionRef = ref(database, `messages/${messageId}/reactions/${reactionKey}`);
            const snapshot = await get(reactionRef);
            const currentCount = snapshot.val() || 0;
            await set(reactionRef, currentCount + 1);

            const animationKey = `${messageId}-${reactionKey}`;
            const animationId = Date.now();

            setReactionAnimations(prev => new Map(prev).set(animationKey, animationId));

            const animationDurations = {
                love: 800,
                like: 400,
                amazing: 600,
                inspiring: 1000,
                wonderful: 700
            };

            setTimeout(() => {
                setReactionAnimations(prev => {
                    const newMap = new Map(prev);
                    if (newMap.get(animationKey) === animationId) {
                        newMap.delete(animationKey);
                    }
                    return newMap;
                });
            }, animationDurations[reactionKey as keyof typeof animationDurations] || 500);
        } catch (error) {
            console.error('Error adding reaction:', error);
        }
    };

    return {reactionAnimations, handleReaction};
};