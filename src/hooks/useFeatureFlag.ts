import {useEffect, useState} from 'react';
import {FEATURE_FLAGS} from "@/constants/layout.ts";

export const useFeatureFlag = () => {
    const [showSend, setShowSend] = useState(false);

    useEffect(() => {
        const now = new Date();
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const utcPlus7 = new Date(utc + 7 * 3600000);
        const cutoff = new Date(FEATURE_FLAGS.CUTOFF_DATE);

        setShowSend(utcPlus7 <= cutoff);
    }, []);

    return {showSend};
};