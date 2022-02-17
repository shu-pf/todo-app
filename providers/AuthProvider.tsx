import { SWRConfig } from 'swr';
import { useRecoilState } from 'recoil';
import { userTokenState } from '../states';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
      router.push('/auth/register');
      return;
    }

    setLoading(false);
  }, [userToken, router]);

  if (loading) {
    return <></>;
  }

  if (!userToken) {
    return <>{children}</>;
  }

  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(process.env.NEXT_PUBLIC_API_ORIGIN + resource, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + userToken,
            },
            ...init,
          }).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
};
