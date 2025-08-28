import React from 'react';
import {Link} from 'react-router';
import {IconMaximize, IconMinimize, IconPlayerPause, IconPlayerPlay, IconSend} from '@tabler/icons-react';

interface FloatingControlsProps {
    showSend: boolean;
    totalPages: number;
    autoScroll: boolean;
    isFullscreen: boolean;
    onToggleAutoScroll: () => void;
    onToggleFullscreen: () => void;
}

const FloatingControls: React.FC<FloatingControlsProps> = ({
    showSend,
    totalPages,
    autoScroll,
    isFullscreen,
    onToggleAutoScroll,
    onToggleFullscreen
}) => {
    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="liquid-glass rounded-full px-4 py-2 flex items-center justify-evenly gap-4 select-none">
                {showSend && (
                    <Link
                        to="/studio"
                        className="glass-btn glass-green flex items-center gap-2 px-4 py-2 rounded-full text-sm text-green-700 font-medium"
                        title="Send Message"
                    >
                        <IconSend className="w-4 h-4"/>
                        <span className="hidden sm:inline">
                            <span className="max-[978px]:hidden">Send</span> Message
                        </span>
                    </Link>
                )}

                {totalPages > 1 && (
                    <button
                        onClick={onToggleAutoScroll}
                        className={`glass-btn flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                            autoScroll
                                ? 'glass-orange text-orange-700'
                                : 'glass-yellow text-yellow-700'
                        }`}
                        title={autoScroll ? 'Pause auto scroll' : 'Start auto scroll'}
                    >
                        {autoScroll ? <IconPlayerPause className="w-4 h-4"/> : <IconPlayerPlay className="w-4 h-4"/>}
                        <span className="hidden sm:inline">{autoScroll ? 'Pause' : 'Play'}</span>
                    </button>
                )}

                <button
                    onClick={onToggleFullscreen}
                    className="glass-btn glass-blue flex items-center gap-2 px-4 py-2 rounded-full text-sm text-blue-700 font-medium cursor-pointer"
                    title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                >
                    {isFullscreen ? <IconMinimize className="w-4 h-4"/> : <IconMaximize className="w-4 h-4"/>}
                    <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
                </button>
            </div>
        </div>
    );
};

export default FloatingControls;