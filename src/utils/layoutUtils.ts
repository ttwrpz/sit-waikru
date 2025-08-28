import {LAYOUT_CONSTANTS} from '@/constants/layout';

export const getResponsiveItemsPerPage = (): number => {
    if (window.innerWidth <= LAYOUT_CONSTANTS.BREAKPOINTS.MOBILE) {
        return LAYOUT_CONSTANTS.PAGINATION.MOBILE_ITEMS;
    }
    if (window.innerWidth <= LAYOUT_CONSTANTS.BREAKPOINTS.TABLET) {
        return LAYOUT_CONSTANTS.PAGINATION.TABLET_ITEMS;
    }
    return LAYOUT_CONSTANTS.PAGINATION.DESKTOP_ITEMS;
};

export const getResponsiveGarlandDimensions = () => {
    if (window.innerWidth <= 480) {
        return LAYOUT_CONSTANTS.GARLAND_DIMENSIONS.MOBILE;
    }
    if (window.innerWidth <= 768) {
        return LAYOUT_CONSTANTS.GARLAND_DIMENSIONS.TABLET;
    }
    return LAYOUT_CONSTANTS.GARLAND_DIMENSIONS.DESKTOP;
};

export const getResponsivePadding = () => {
    if (window.innerWidth <= 480) {
        return LAYOUT_CONSTANTS.PADDING.MOBILE;
    }
    if (window.innerWidth <= 768) {
        return LAYOUT_CONSTANTS.PADDING.TABLET;
    }
    return LAYOUT_CONSTANTS.PADDING.DESKTOP;
};

export const getResponsiveFlowerSize = (baseSize: number): number => {
    const scaledSize = baseSize * 0.6;

    if (window.innerWidth <= 480) {
        return Math.min(scaledSize * 0.7, 1.2);
    }
    if (window.innerWidth <= 768) {
        return Math.min(scaledSize * 0.75, 1.35);
    }
    return Math.min(scaledSize, 1.6);
};

export const getGridTemplateColumns = (): string => {
    if (window.innerWidth <= LAYOUT_CONSTANTS.BREAKPOINTS.MOBILE) {
        return 'repeat(1, minmax(0, 1fr))';
    }
    if (window.innerWidth <= LAYOUT_CONSTANTS.BREAKPOINTS.TABLET) {
        return 'repeat(2, minmax(0, 1fr))';
    }
    return 'repeat(3, minmax(0, 1fr))';
};