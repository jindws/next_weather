import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Script from "next/script";
import { useRem } from "shooks";

function MyApp({ Component, pageProps }: AppProps) {
  useRem({
    maxWidth: 700,
  });

  return (
    <>
      <Component {...pageProps} />
      <Script
        id="echarts-js"
        strategy="beforeInteractive"
        src="https://cdn.bootcdn.net/ajax/libs/echarts/5.3.2/echarts.min.js"
      />
    </>
  );
}

export default MyApp;
