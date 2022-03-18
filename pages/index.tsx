import type { NextPage } from 'next';
import Head from 'next/head';

import { IndexPage } from '../components/page';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Takanuma Curriculum | Tasks</title>
      </Head>
      <IndexPage />
    </>
  );
};

export default Home;
