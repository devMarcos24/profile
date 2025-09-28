'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Import the client component with no SSR to avoid hydration issues
const HomePage = dynamic(() => import('./components/HomePage'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse flex flex-col items-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-muted"></div>
        <div className="h-4 w-48 bg-muted rounded"></div>
        <div className="h-4 w-64 bg-muted rounded"></div>
      </div>
    </div>
  ),
});

// This is a Client Component
export default function Home() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="animate-pulse flex flex-col items-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-muted"></div>
            <div className="h-4 w-48 bg-muted rounded"></div>
            <div className="h-4 w-64 bg-muted rounded"></div>
          </div>
        </div>
      }
    >
      <HomePage />
    </Suspense>
  );
}
