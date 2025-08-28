import {IconFlame, IconHeart, IconSparkles, IconStar, IconThumbUp} from '@tabler/icons-react';
import type {Reaction} from '@/types/message';

export const reactions: Reaction[] = [
    {icon: <IconHeart className="w-4 h-4"/>, label: "Love", key: "love", color: "text-red-500"},
    {icon: <IconThumbUp className="w-4 h-4"/>, label: "Like", key: "like", color: "text-blue-500"},
    {icon: <IconStar className="w-4 h-4"/>, label: "Amazing", key: "amazing", color: "text-yellow-500"},
    {icon: <IconFlame className="w-4 h-4"/>, label: "Inspiring", key: "inspiring", color: "text-orange-500"},
    {icon: <IconSparkles className="w-4 h-4"/>, label: "Wonderful", key: "wonderful", color: "text-purple-500"}
];