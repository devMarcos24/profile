'use client';

import dynamic from 'next/dynamic';

const ParticlesBackground = dynamic(
  () => import('@/components/particles-background').then((mod) => mod.ParticlesBackground),
  { ssr: false }
);

export default function ParticlesBackgroundClient() {
  return <ParticlesBackground />;
}
