<div align="center">

# SIT WaiKru

**School of Information Technology | King Mongkut's University of Technology Thonburi**

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-11.10.0-FFCA28?style=flat-square&logo=firebase&logoColor=white)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[![Build Status](https://img.shields.io/badge/Build-Passing-success?style=flat-square)](https://github.com)
[![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=flat-square)](https://github.com)
[![License](https://img.shields.io/badge/License-Educational-orange?style=flat-square)](https://github.com)
[![Deployment](https://img.shields.io/badge/Deployment-Production-green?style=flat-square)](https://firebase.google.com/)

</div>

## Overview

SIT WaiKru is a modern web application designed to celebrate and honor the dedication of teachers and professors at the School of Information Technology, King Mongkut's University of Technology Thonburi (KMUTT). The platform provides an interactive digital space where students can create personalized appreciation messages accompanied by traditional Thai garland decorations.

## Features

### Core Functionality
- **Interactive Message Creation**: Students can compose heartfelt appreciation messages for their educators
- **Digital Garland Studio**: A creative canvas where users can design traditional Thai garlands using flowers and decorative elements
- **Real-time Message Display**: Dynamic carousel showcasing submitted messages with responsive pagination
- **Reaction System**: Community engagement through reaction buttons (Love, Like, Amazing, Inspiring, Wonderful)
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Technical Features
- **Real-time Database Integration**: Firebase Realtime Database for live message synchronization
- **Feature Flag Management**: Time-based access control for message submission
- **Glass Morphism UI**: Modern liquid glass design aesthetic
- **Progressive Web App**: Enhanced mobile experience with offline capabilities
- **Auto-scroll Functionality**: Automatic message carousel with manual controls
- **Fullscreen Mode**: Immersive viewing experience for public displays

## Technology Stack

### Frontend
- **React 19.1.0**: Modern React with latest features and performance improvements
- **TypeScript 5.8.3**: Type-safe development with enhanced IDE support
- **Vite 7.0.4**: Next-generation build tool with fast development server
- **Tailwind CSS 4.1.11**: Utility-first CSS framework for rapid UI development
- **React Router 7.6.3**: Declarative routing for single-page applications

### Backend & Database
- **Firebase 11.10.0**: Comprehensive backend-as-a-service platform
- **Firebase Realtime Database**: NoSQL cloud database for real-time data synchronization
- **Firebase Hosting**: Static web hosting with global CDN

### Development Tools
- **ESLint**: Code linting with TypeScript support
- **Rolldown**: Rust-based bundler for optimized production builds
- **PNPM**: Efficient package manager with workspace support

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/          # Layout wrapper components
│   ├── studio/          # Studio-specific components
│   └── ui/              # Generic UI components
├── hooks/               # Custom React hooks
├── layout/              # Application layout components
├── pages/               # Route-based page components
├── styles/              # Modular CSS stylesheets
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── data/                # Static data and constants
└── lib/                 # Third-party library configurations
```

## Installation and Setup

### Prerequisites
- Node.js 20.x or higher
- PNPM package manager
- Firebase project with Realtime Database enabled

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ttwrpz/sit-waikru
   cd sit-waikru
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure Firebase**
    - Create a Firebase project at https://console.firebase.google.com
    - Enable Realtime Database
    - Copy your Firebase configuration to `src/config.ts`

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Access the application**
    - Open http://localhost:5173 in your browser
    - The development server supports hot module replacement

### Production Deployment

1. **Build the application**
   ```bash
   pnpm build
   ```

2. **Preview production build**
   ```bash
   pnpm preview
   ```

3. **Deploy to Firebase Hosting**
   ```bash
   firebase deploy
   ```

## Configuration

### Environment Variables
The application uses Firebase configuration stored in `src/config.ts`. Update the following values with your Firebase project settings:

```typescript
export const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project.firebasedatabase.app",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

### Feature Flags
The application includes time-based feature flags configured in `src/constants/layout.ts`. The message submission feature automatically disables after the specified cutoff date:

```typescript
const cutoff = new Date(FEATURE_FLAGS.CUTOFF_DATE);
```

## Architecture

### Component Architecture
The application follows a modular component architecture with clear separation of concerns:

- **Custom Hooks**: Business logic abstraction for reusability
- **Layout Components**: Consistent page structure and navigation
- **UI Components**: Reusable interface elements
- **Page Components**: Route-specific application views

### State Management
- **React Hooks**: Local component state management
- **Firebase Realtime Database**: Global application state synchronization
- **Custom Hooks**: Shared state logic across components

### Styling Architecture
- **Modular CSS**: Organized stylesheets by feature and component type
- **Glass Morphism**: Consistent visual design language
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Animation Framework**: Smooth transitions and micro-interactions

## Database Schema

### Messages Collection
```typescript
interface Message {
    id: string;
    name: string;
    major: 'CS' | 'IT' | 'DSI';
    message: string;
    timestamp: number;
    status: string;
    reactions?: {
        [key: string]: number;
    };
    garland?: FlowerData[];
}
```

### Flower Data Structure
```typescript
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
```

## Contributing

### Development Guidelines
1. Follow the established project structure and naming conventions
2. Use TypeScript for all new code with proper type definitions
3. Implement responsive design for all UI components
4. Write custom hooks for reusable logic
5. Maintain consistent code formatting with ESLint

### Code Quality
- All components must be properly typed with TypeScript
- Follow React best practices and hooks guidelines
- Implement proper error boundaries for component isolation
- Use meaningful component and variable names
- Document complex business logic and algorithms

## Browser Support

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Mobile Support
- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 14+

## Performance Considerations

### Optimization Features
- **Code Splitting**: Route-based code splitting for optimal loading
- **Image Optimization**: Responsive images with appropriate formats
- **Caching Strategy**: Efficient caching for static assets
- **Bundle Optimization**: Tree-shaking and minification for production builds

### Monitoring
- Firebase Analytics integration for user behavior tracking
- Performance monitoring for page load times and user interactions
- Error tracking for production issue identification

## Security

### Data Protection
- Client-side input validation and sanitization
- Firebase Security Rules for database access control
- HTTPS enforcement for all communications
- Content Security Policy implementation

### Privacy Considerations
- Minimal data collection with user consent
- Secure handling of user-generated content
- Regular security audits and updates

## License

This project is developed for educational and commemorative purposes at the School of Information Technology, KMUTT. All rights reserved.