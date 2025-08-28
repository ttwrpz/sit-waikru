export const getTotalReactions = (reactions: { [key: string]: number } = {}) => {
    return Object.values(reactions).reduce((sum, count) => sum + count, 0);
};

export const formatTimestamp = (timestamp: number | string): string => {
    const date = typeof timestamp === 'number' ? new Date(timestamp) : new Date(timestamp);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};