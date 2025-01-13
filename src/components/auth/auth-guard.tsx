'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';

export interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const checkPermissions = async (): Promise<void> => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      logger.debug('[AuthGuard]: No token found, redirecting to sign in');
      router.replace(paths.auth.signIn);
      return;
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      setError('An error occurred while checking authentication.');
    });
  }, []);

  if (isChecking) {
    return null;
  }

  if (error) {
    return <Alert color="error">{error}</Alert>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
