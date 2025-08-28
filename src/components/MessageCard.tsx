import React from 'react';
import type {Message} from '@/types/message';
import {formatTimestamp} from '@/utils/messageUtils';
import {reactions} from '@/data/reactions';

interface MessageCardProps {
    message: Message;
    garlandDimensions: { [key: string]: { width: number; height: number } };
    reactionAnimations: Map<string, number>;
    onReaction: (messageId: string, reactionKey: string) => void;
    isSingleItem: boolean;
}

const MessageCard: React.FC<MessageCardProps> = ({
    message,
    garlandDimensions,
    reactionAnimations,
    onReaction,
    isSingleItem
}) => {
    return (
        <div
            className={`liquid-glass glass-card rounded-xl p-4 animate-fadeIn ${isSingleItem ? "col-span-3" : ""}`}
            style={{margin: '8px'}}
        >
            {message.garland && message.garland.length > 0 && (
                <div
                    className="message-garland relative mb-4"
                    data-message-id={message.id}
                >
                    {message.garland.map((flower, index) => {
                        const defaultDimensions = {
                            width: window.innerWidth <= 480 ? 190 : window.innerWidth <= 768 ? 230 : 270,
                            height: window.innerWidth <= 480 ? 107 : window.innerWidth <= 768 ? 129 : 152
                        };
                        const dimensions = garlandDimensions[message.id] || defaultDimensions;

                        const actualX = flower.anchorX * dimensions.width;
                        const actualY = flower.anchorY * dimensions.height;

                        const marginLeft = window.innerWidth <= 480 ? 10 : 15;
                        const marginTop = window.innerWidth <= 480 ? 10 : 15;
                        const marginRight = window.innerWidth <= 480 ? 14 : 20;
                        const marginBottom = window.innerWidth <= 480 ? 14 : 20;

                        const boundedX = Math.max(marginLeft, Math.min(actualX, dimensions.width - marginRight));
                        const boundedY = Math.max(marginTop, Math.min(actualY, dimensions.height - marginBottom));

                        const baseSize = flower.size * 0.6;
                        const responsiveSize = window.innerWidth <= 480 ?
                            Math.min(baseSize * 0.7, 1.2) :
                            window.innerWidth <= 768 ?
                                Math.min(baseSize * 0.75, 1.35) :
                                Math.min(baseSize, 1.6);

                        return (
                            <span
                                key={`message-${message.id}-flower-${flower.id}-${index}`}
                                className={`garland-flower ${flower.flip ? "flip" : ""}`}
                                style={{
                                    left: `${boundedX}px`,
                                    top: `${boundedY}px`,
                                    fontSize: `${responsiveSize}rem`,
                                    transform: `rotate(${flower.rotation || 0}deg) ${flower.flip ? 'scaleX(-1)' : ''}`,
                                    animationDelay: `${index * 0.2}s`,
                                    zIndex: index
                                }}
                            >
                                {flower.emoji}
                            </span>
                        );
                    })}
                </div>
            )}

            <div className="flex flex-row flex-wrap items-center justify-between gap-4 mb-4 select-none">
                <div className="flex items-center gap-2">
                    <div
                        className="size-6 bg-gradient-to-br from-slate-900 via-blue-600 to-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-xs">
                            {message.name.charAt(0).toUpperCase() || 'A'}
                        </span>
                    </div>
                    <div className="min-w-0 flex-1 text-xs">
                        <h3 className="font-semibold text-gray-900 truncate inline mr-2 w-fit">{message.name}</h3>
                        <span className="rounded-full inline-flex">
                            ({message.major})
                        </span>
                    </div>
                </div>

                <div className="text-xs text-gray-500 text-right flex-1/3">
                    <span className="block">
                        {formatTimestamp(message.timestamp)}
                    </span>
                </div>
            </div>

            <div className="mb-3">
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-5">
                    {message.message}
                </p>
            </div>

            <div className="border-t border-gray-200 pt-3">
                <div className="flex items-center gap-1 mb-2 flex-wrap">
                    {reactions.map((reaction) => {
                        const animationKey = `${message.id}-${reaction.key}`;
                        const isAnimating = reactionAnimations.has(animationKey);

                        return (
                            <button
                                key={reaction.key}
                                onClick={() => onReaction(message.id, reaction.key)}
                                className={`liquid-glass glass-btn flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-all duration-200 select-none ${
                                    isAnimating ? `reaction-${reaction.key} active` : ''
                                }`}
                                title={reaction.label}
                            >
                                <span className={reaction.color}>
                                    {reaction.icon}
                                </span>
                                <span className="font-medium text-gray-700">
                                    {message.reactions?.[reaction.key] || 0}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MessageCard;