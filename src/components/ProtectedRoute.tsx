'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function ProtectedRoute({ children }: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      router.push('/gestacao');
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className='w-full h-full'>
        <div>Carregando...</div>
      </div>
    )
  }

  return <>{children}</>;
}