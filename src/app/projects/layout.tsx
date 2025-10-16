'use client';

import { type ReactNode, useEffect } from 'react';

export default function ProjectsLayout({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    console.log('ProjectsLayout está sendo renderizado');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      {children}
    </div>
  );
}
