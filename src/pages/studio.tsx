import React, {useEffect} from 'react';
import {IconHome, IconSend} from '@tabler/icons-react';
import {Link, useNavigate} from 'react-router';
import {Copyright} from '@/layout/components';
import {useStudio} from '@/hooks/useStudio';
import {useStudioDragHandlers} from '@/hooks/useStudioDragHandlers';
import {useFeatureFlag} from '@/hooks/useFeatureFlag';
import StudioPanel from '@/components/studio/StudioPanel';
import Canvas from '@/components/studio/Canvas';
import MessageForm from '@/components/studio/MessageForm';

const Page: React.FC = () => {
    const navigate = useNavigate();
    const {showSend} = useFeatureFlag();

    useEffect(() => {
        if (!showSend) {
            navigate('/', {replace: true});
        }
    }, [showSend, navigate]);

    const {
        formData,
        garlandFlowers,
        selectedSize,
        draggedFlower,
        isSubmitting,
        canvasDimensions,
        isDragging,
        selectedFlower,
        isMobile,
        canvasRef,
        setSelectedSize,
        setSelectedFlower,
        handleInputChange,
        addFlowerToCanvas,
        deleteFlower,
        rotateFlower,
        flipFlower,
        clearCanvas,
        createPattern,
        handleSubmit
    } = useStudio();

    const {
        handleDragStart,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleMouseDown,
        handleTouchStart
    } = useStudioDragHandlers({
        isMobile,
        canvasRef,
        garlandFlowers,
        dragOffset: {x: 0, y: 0},
        selectedFlower,
        addFlowerToCanvas,
        setDraggedFlower: () => {
        },
        setIsDragging: () => {
        },
        setDragOffset: () => {
        },
        setSelectedFlower,
        setGarlandFlowers: () => {
        }
    });

    const handleFlowerClick = (e: React.MouseEvent, flowerId: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (!(e.target as HTMLElement).closest('.control-btn')) {
            setSelectedFlower(selectedFlower === flowerId ? null : flowerId);
        }
    };

    return (
        <div className="min-h-svh bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="max-w-7xl mx-auto px-4 pt-8">
                <div className="text-center">
                    <h1 className="font-tan-pearl text-5xl font-bold gradient-text-blue mb-1 leading-relaxed">
                        SIT WaiKru
                    </h1>
                    <p className="text-gray-600 text-sm">
                        &copy; {new Date().getFullYear()} School of Information Technology KMUTT
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="max-lg:order-2 lg:col-span-1">
                        <StudioPanel
                            selectedSize={selectedSize}
                            isMobile={isMobile}
                            onSizeChange={setSelectedSize}
                            onFlowerSelect={handleDragStart}
                            onCreatePattern={createPattern}
                            onClearCanvas={clearCanvas}
                        />
                    </div>

                    <div className="max-lg:order-1 lg:col-span-2">
                        <Canvas
                            canvasRef={canvasRef}
                            garlandFlowers={garlandFlowers}
                            canvasDimensions={canvasDimensions}
                            isDragging={isDragging}
                            isMobile={isMobile}
                            selectedFlower={selectedFlower}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, draggedFlower)}
                            onMouseDown={handleMouseDown}
                            onTouchStart={handleTouchStart}
                            onFlowerClick={handleFlowerClick}
                            onRotateFlower={rotateFlower}
                            onFlipFlower={flipFlower}
                            onDeleteFlower={deleteFlower}
                        />
                    </div>

                    <MessageForm
                        formData={formData}
                        onInputChange={handleInputChange}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>

            <Copyright/>

            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
                <div className="liquid-glass rounded-full px-4 py-2 flex items-center justify-evenly gap-4">
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || garlandFlowers.length === 0 || formData.message.trim().length === 0}
                        className={`glass-btn flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                            isSubmitting || garlandFlowers.length === 0 || formData.message.trim().length === 0
                                ? 'bg-gray-400 text-gray-300 cursor-not-allowed'
                                : 'glass-green text-green-700'
                        }`}
                    >
                        <IconSend className="w-4 h-4"/>
                        <span className="hidden sm:inline">
                            {isSubmitting ? "Sending..." : "Send Your Appreciation"}
                        </span>
                    </button>

                    <Link
                        to="/"
                        className="glass-btn glass-yellow flex items-center gap-2 px-4 py-2 rounded-full text-sm text-yellow-700 font-medium"
                    >
                        <IconHome className="w-4 h-4"/>
                        <span className="hidden sm:inline">Go Back</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Page;