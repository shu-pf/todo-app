/** @jsxImportSource @emotion/react */
import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { css, Theme } from '@emotion/react';
import { TextInput } from '../../components/common/TextInput';
import { Button } from '../../components/common/Button';

const Login: NextPage = () => {
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
                  placeholder="email"
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
                    css={css`
                      width: 100%;
                    `}
                    label="Login"
                    shadow
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

export default Login;
