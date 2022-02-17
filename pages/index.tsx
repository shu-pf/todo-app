import type { NextPage } from 'next';
import Head from 'next/head';
import { userTokenState } from '../states';
import { useRecoilState } from 'recoil';

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
