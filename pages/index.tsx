import type { NextPage } from 'next';
import Head from 'next/head';
import { useRecoilState } from 'recoil';

import { userTokenState } from '../states';

const Home: NextPage = () => {
  const [, setUserToken] = useRecoilState(userTokenState);

  const logout = () => {
    setUserToken('');
  };

  return (
    <>
      <Head>
        <title>Takanuma Curriculum | All Categories</title>
      </Head>
      <button onClick={logout}>ログアウト</button>
    </>
  );
};

export default Home;
