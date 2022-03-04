/** @jsxImportSource @emotion/react */
import { css, Theme } from '@emotion/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormEventHandler, useState } from 'react';
import { useRecoilState } from 'recoil';

import { getToken } from '../../api/users';
import { Button } from '../../components/common/Button';
import { TextInput } from '../../components/common/TextInput';
import { userTokenState } from '../../states';

const Login: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [, setUserToken] = useRecoilState(userTokenState);

  const login: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const data = await getToken({ email, password });
      setUserToken(data.token);
    } catch (e) {
      if (e instanceof Error) {
        console.log('通信エラー: ' + e.message);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Takanuma Curriculum | ログイン</title>
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
          alt=""
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
              ログイン
            </h1>
            <form
              css={css`
                width: 100%;
                max-width: 375px;
              `}
              onSubmit={login}
            >
              <div
                css={css`
                  margin-bottom: 43px;
                `}
              >
                <TextInput
                  type="email"
                  placeholder="email"
                  css={css`
                    width: 100%;
                  `}
                  value={email}
                  onInput={(e) => setEmail(e.currentTarget.value)}
                  required
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
                  css={css`
                    width: 100%;
                  `}
                  value={password}
                  onInput={(e) => setPassword(e.currentTarget.value)}
                  required
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
                    css={css`
                      width: 100%;
                    `}
                    label="Login"
                    shadow
                    disabled={loading}
                    type="submit"
                  />
                </div>
                <div
                  css={css`
                    flex-grow: 1;
                  `}
                >
                  <Button
                    variant="underlined"
                    css={css`
                      width: 100%;
                    `}
                    label="Register"
                    onClick={() => {
                      router.push('/auth/register');
                    }}
                    disabled={loading}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
