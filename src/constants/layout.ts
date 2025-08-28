export const LAYOUT_CONSTANTS = {
    SITE_NAME: "SIT WaiKru",
    COPYRIGHT_TEXT: "School of Information Technology KMUTT",

    BREAKPOINTS: {
        MOBILE: 580,
        TABLET: 978,
        DESKTOP: 1024
    },

    PAGINATION: {
        MOBILE_ITEMS: 1,
        TABLET_ITEMS: 2,
        DESKTOP_ITEMS: 3
    },

    AUTOSCROLL_INTERVAL: 15000,

    GARLAND_DIMENSIONS: {
        MOBILE: {width: 190, height: 107},
        TABLET: {width: 230, height: 129},
        DESKTOP: {width: 270, height: 152}
    },

    PADDING: {
        MOBILE: {left: 10, top: 10, right: 14, bottom: 14},
        TABLET: {left: 15, top: 15, right: 20, bottom: 20},
        DESKTOP: {left: 15, top: 15, right: 20, bottom: 20}
    }
} as const;

export const FEATURE_FLAGS = {
    CUTOFF_DATE: "2025-08-16T23:59:59+07:00"
} as const;