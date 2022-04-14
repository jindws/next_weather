import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useCallback, useEffect, useState } from "react";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  const resize = useCallback(() => {
    const maxWidth = 700;
    const size = (Math.min(innerWidth, maxWidth) / 375) * 16;

    document.getElementsByTagName("html")[0].style.fontSize = size + "px";
  }, []);

  useEffect(() => {
    document.body.onresize = resize;
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <Script
        id="echarts-js"
        strategy="beforeInteractive"
        src="https://cdn.bootcdn.net/ajax/libs/echarts/5.3.2/echarts.min.js"
        onLoad={resize}
      />
    </>
  );
}

export default MyApp;
