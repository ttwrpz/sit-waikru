import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router';
import {useFeatureFlag} from '@/hooks/useFeatureFlag';

interface FeatureFreezeGuardProps {
    children: React.ReactNode;
}

const FeatureFreezeGuard: React.FC<FeatureFreezeGuardProps> = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {showSend} = useFeatureFlag();

    useEffect(() => {
        if (!showSend && location.pathname === '/studio') {
            navigate('/', {replace: true});
        }
    }, [showSend, location.pathname, navigate]);

    return <>{children}</>;
};

export default FeatureFreezeGuard;