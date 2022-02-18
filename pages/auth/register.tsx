/** @jsxImportSource @emotion/react */
import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { css, Theme } from '@emotion/react';
import { TextInput } from '../../components/common/TextInput';
import { Button } from '../../components/common/Button';
import { useState } from 'react';
import { createUser, getToken } from '../../api/users';
import { userTokenState } from '../../states';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [, setUserToken] = useRecoilState(userTokenState);

  const register = async () => {
    setLoading(true);
    try {
      await createUser({ email, password });
      const data = await getToken({ email, password });
      setUserToken(data.token);
    } catch (e) {
      if (e instanceof Error) {
        console.log('通信エラー: ' + e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Takanuma Curriculum | 新規登録</title>
      </Head>
      <div
        css={css`
          position: relative;
          height: 100vh;
          width: 100vw;
        `}
      >
        <Image
          css={css`
            object-fit: cover;
          `}
          layout="fill"
          src="/images/background.png"
          alt="Background Image"
        />
        <div
          css={(theme: Theme) => css`
            background-color: ${theme.colors.component.pink70};
            height: 100%;
            width: 100%;
            position: absolute;
          `}
        />
        <div
          css={css`
            position: absolute;
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
          `}
        >
          <div
            css={css`
              display: flex;
              width: 80%;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            `}
          >
            <div
              css={css`
                margin-bottom: 20px;
              `}
            >
              <Image src="/images/logo.svg" height="100" width="100" alt="logo" />
            </div>
            <p
              css={(theme: Theme) =>
                css`
                  color: ${theme.colors.text.white};
                `
              }
            >
              コレをマスターすれば天才エンジニア？高沼カリキュラム
            </p>
            <h1
              css={(theme: Theme) => css`
                color: ${theme.colors.text.white};
                margin-top: 22px;
                margin-bottom: 43px;
              `}
            >
              新規登録
            </h1>
            <div
              css={css`
                width: 100%;
                max-width: 375px;
              `}
            >
              <div
                css={css`
                  margin-bottom: 43px;
                `}
              >
                <TextInput
                  type="email"
                  placeholder="email"
                  value={email}
                  onInput={(e) => setEmail(e.currentTarget.value)}
                  css={css`
                    width: 100%;
                  `}
                />
              </div>
              <div
                css={css`
                  margin-bottom: 40px;
                `}
              >
                <TextInput
                  type="password"
                  placeholder="password"
                  value={password}
                  onInput={(e) => setPassword(e.currentTarget.value)}
                  css={css`
                    width: 100%;
                  `}
                />
              </div>
              <div
                css={css`
                  display: flex;
                `}
              >
                <div
                  css={css`
                    flex-grow: 1;
                  `}
                >
                  <Button
                    onClick={() => {
                      router.push('/auth/login');
                    }}
                    css={css`
                      width: 100%;
                    `}
                    label="Login"
                    variant="underlined"
                    disabled={loading}
                  />
                </div>
                <div
                  css={css`
                    flex-grow: 1;
                  `}
                >
                  <Button
                    onClick={register}
                    css={css`
                      width: 100%;
                    `}
                    shadow
                    label="Register"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
