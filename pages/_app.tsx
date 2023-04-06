import type { AppProps } from "next/app";
import "../styles/global.css";
import { AuthProvider } from "../hooks/UseAuth";
import { RecoilRoot } from "recoil";
import Head from "next/head";
import React from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <Head>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/favicon.ico"
          />
        </Head>
        <Component {...pageProps} />
      </AuthProvider>
    </RecoilRoot>
  );
}
