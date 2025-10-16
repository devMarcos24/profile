import { type ReactNode } from 'react';

export default function ProjectsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      {children}
    </div>
  );
}
