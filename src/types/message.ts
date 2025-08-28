import React from "react";

interface FlowerData {
    id: string;
    emoji: string;
    name: string;
    anchorX: number;
    anchorY: number;
    size: number;
    rotation: number;
    flip: boolean;
}

interface Message {
    id: string;
    name: string;
    major: string;
    message: string;
    timestamp: number | string;
    status: string;
    reactions?: {
        [key: string]: number;
    };
    garland?: FlowerData[];
}

interface Reaction {
    icon: React.ReactNode;
    label: string;
    key: string;
    color: string;
}

export type {
    FlowerData,
    Message,
    Reaction
}