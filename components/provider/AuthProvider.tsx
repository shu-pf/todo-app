import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { userTokenState } from '../../states';

const isAuthPath = (path: string) => {
  return path.startsWith('/auth');
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [userToken] = useRecoilState(userTokenState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userToken && isAuthPath(router.pathname)) {
      router.push('/');
      return;
    }

    if (!userToken && !isAuthPath(router.pathname)) {
      router.push('/auth/login');
      return;
    }

    setLoading(false);
  }, [userToken, router]);

  if (loading) {
    return <></>;
  }

  return <>{children}</>;
};
