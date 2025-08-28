import React, {useRef} from 'react';
import {IconMessage, IconRefresh} from '@tabler/icons-react';
import {Copyright} from '@/layout/components';
import {useMessages} from '@/hooks/useMessages';
import {useReactions} from '@/hooks/useReactions';
import {usePagination} from '@/hooks/usePagination';
import {useAutoScroll} from '@/hooks/useAutoScroll';
import {useFullscreen} from '@/hooks/useFullscreen';
import {useGarlandDimensions} from '@/hooks/useGarlandDimensions';
import {useFeatureFlag} from '@/hooks/useFeatureFlag';
import MessageCard from '@/components/MessageCard';
import NavigationControls from '@/components/NavigationControls';
import FloatingControls from '@/components/FloatingControls';

const Page: React.FC = () => {
    const {messages, isLoading} = useMessages();
    const {reactionAnimations, handleReaction} = useReactions();
    const {showSend} = useFeatureFlag();

    const {
        currentPage,
        totalPages,
        isSingleItem,
        nextPage,
        prevPage,
        goToPage,
        getCurrentPageItems
    } = usePagination(messages.length);

    const {autoScroll, toggleAutoScroll} = useAutoScroll(totalPages, nextPage);
    const {isFullscreen, toggleFullscreen} = useFullscreen();
    const garlandDimensions = useGarlandDimensions(messages, currentPage);

    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const currentPageMessages = getCurrentPageItems(messages);

    if (isLoading) {
        return (
            <div
                className="min-h-svh bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="liquid-glass rounded-3xl p-8 text-center">
                    <div
                        className="w-16 h-16 mx-auto glass-blue rounded-full flex items-center justify-center mb-4 floating">
                        <IconMessage className="w-8 h-8 text-blue-600 animate-pulse"/>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <IconRefresh className="w-5 h-5 animate-spin -scale-y-100 text-blue-500"/>
                        <p className="text-lg text-gray-700 font-medium">Loading messages...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-svh bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
            <div className="max-w-7xl mx-auto px-4 pt-16">
                <div className="text-center">
                    <h1 className="font-tan-pearl text-5xl font-bold gradient-text-blue mb-1 leading-relaxed">
                        SIT WaiKru
                    </h1>
                    <p className="text-gray-600 text-sm">
                        &copy; {new Date().getFullYear()} School of Information Technology KMUTT
                    </p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 pb-16 h-full flex-1 flex items-center justfiy-center">
                {messages.length === 0 ? (
                    <div className="text-center py-16 pb-28">
                        <div className="liquid-glass rounded-3xl p-8 mx-auto w-fit">
                            <div
                                className="w-24 h-24 mx-auto glass-purple rounded-full flex items-center justify-center mb-6 floating">
                                <IconMessage className="w-12 h-12 text-purple-600"/>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                No Messages Yet
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Be the first to share your appreciation for our wonderful teachers and professors!
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-full">
                        <div ref={messagesContainerRef} className="relative overflow-hidden">
                            <div
                                className="grid gap-6 grid-cols-1 min-[978px]:grid-cols-2 lg:grid-cols-3 px-4 sm:px-8 py-6 md:py-12 transition-all duration-500 ease-in-out"
                                style={{
                                    gridTemplateColumns:
                                        window.innerWidth <= 580 ? 'repeat(1, minmax(0, 1fr))' :
                                            window.innerWidth <= 978 ? 'repeat(2, minmax(0, 1fr))' :
                                                'repeat(3, minmax(0, 1fr))',
                                    justifyContent: isSingleItem ? 'center' : 'start',
                                    justifyItems: isSingleItem ? 'center' : 'stretch',
                                }}
                            >
                                {currentPageMessages.map((message) => (
                                    <MessageCard
                                        key={message.id}
                                        message={message}
                                        garlandDimensions={garlandDimensions}
                                        reactionAnimations={reactionAnimations}
                                        onReaction={handleReaction}
                                        isSingleItem={isSingleItem}
                                    />
                                ))}
                            </div>
                        </div>

                        <NavigationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPrevPage={prevPage}
                            onNextPage={nextPage}
                            onGoToPage={goToPage}
                        />
                    </div>
                )}
            </main>

            <FloatingControls
                showSend={showSend}
                totalPages={totalPages}
                autoScroll={autoScroll}
                isFullscreen={isFullscreen}
                onToggleAutoScroll={toggleAutoScroll}
                onToggleFullscreen={toggleFullscreen}
            />

            <Copyright/>
        </div>
    );
};

export default Page;