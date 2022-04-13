import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Context from "./api/context";
import useLocalData from "./components/useLocalData";
import {useEffect, useState} from "react";
import {getLocation, getWeather} from "./api";
import {INowWeather} from "./types";
import moment from "moment";
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  const [now, upNow] = useState({
    temp: "-",
    precip: "-",
    windSpeed: "-",
    humidity: "-",
    text: "",
    obsTime: "",
  });
  const [locations, upLocations] = useLocalData("locations", {});
  const [night, upNight] = useLocalData("night", false);
  const [rectangle, upRectangle] = useLocalData("rectangle", "");

  useEffect(() => {
    getLocation().then((data: { rectangle: string }) => {
      upLocations(data);
      upRectangle(data.rectangle.split(";")[0]);
    });
  }, []);

  useEffect(() => {
    function getData() {
      if (rectangle) {
        getWeather(rectangle).then((data: INowWeather) => {
          upNow(data.now);
          const hour = moment(data.now.obsTime).format("H");
          upNight(+hour >= 18 || +hour <= 6);
        });
      }
    }
    getData();
    /**
     * 每5min自动更新一次最新的天气
     */
    const si = setInterval(getData, 5 * 60 * 1000);
    return () => clearInterval(si);
  }, [rectangle]);

  return <><Context.Provider value={{ locations, rectangle, now, night }}>
    <Component {...pageProps} />
  </Context.Provider>
    <Script
        id="echarts-js"
        src="https://cdn.bootcdn.net/ajax/libs/echarts/5.3.2/echarts.min.js"
        onLoad={() => {

        }}
    /></>
}

export default MyApp
