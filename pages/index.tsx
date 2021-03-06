import type { NextPage } from "next";
import styles from "./index.module.scss";
import { useMemo } from "react";
import W from "../public/w";
import Link from "next/link";
import Rain from "../public/rain";
import Humidity from "../public/humidity";
import WindSpeed from "../public/windSpeed";
import Home from "../public/home";
import Point from "./point";
import { IContext, INowWeather } from "./api/types";
import getWeatherImg from "./api/getWeatherImg";
import moment from "moment";
import { getLocation, getWeather } from "./api";
import useSWR from "swr";

const Index: NextPage<IContext> = (props) => {
  const { locations, rectangle } = props;
  const { data: nowWeather, error } = useSWR(
    "/api/user",
    getWeather.bind(null, rectangle),
    { refreshInterval: 5 * 60 * 1000 }
  );

  const {
    now = {
      text: "",
      temp: "",
      windDir: "",
      precip: "",
      windSpeed: "",
      humidity: "",
    },
    hour,
    night,
    time = { week: "", aft: "" },
  } = useMemo(() => {
    if (nowWeather) {
      const { now } = nowWeather as INowWeather;
      moment.locale("zh-cn");
      const week = moment(now.obsTime).format("周dd");
      moment.locale("en-us");
      const aft = moment(now.obsTime).format("h a");
      const hour = moment(now.obsTime).format("H");
      const night = +hour >= 18 || +hour <= 6;
      return { now, hour, night, time: { week, aft } };
    }
    return {};
  }, [nowWeather]);

  return (
    <section id="index">
      <W />
      <div className={styles.index}>
        <div className={styles.index__weather}>
          {getWeatherImg(now.text, night)}
        </div>
        <div className={styles.index__city}>
          {locations.city}, {locations.province}
        </div>
        <dl className={styles.index__data}>
          <dt>
            <div>{now.temp}</div>
            <label>
              {time.week},{time.aft}
            </label>
          </dt>
          <dd>
            <span className={styles.index__data__wind}>{now.windDir}</span>
            <span className={styles.index__data__text}>{now.text}</span>
          </dd>
        </dl>
        <Link href="/main">详情</Link>
      </div>
      <dl className={styles.data}>
        <dd>
          <span>
            <label>
              <Rain />
            </label>
            降水量
          </span>
          <span>{now.precip}毫米</span>
        </dd>
        <dd>
          <span>
            <label>
              <Humidity />
            </label>
            湿度
          </span>
          <span>{now.humidity}%</span>
        </dd>
        <dd>
          <span>
            <label>
              <WindSpeed />
            </label>
            风速
          </span>
          <span>{now.windSpeed}km/h</span>
        </dd>
      </dl>
      <section className={styles.footer}>
        <div className={styles.home}>
          <div className={styles.home__data}>
            <label>
              <Home />
            </label>
            <div>Home</div>
          </div>
        </div>
      </section>
      <Point />
    </section>
  );
};

export default Index;

/**
 * @desc 服务端渲染ssr
 */
export async function getServerSideProps(data: any) {
  const locations = await getLocation(data.req.headers["x-real-ip"]);
  const rectangle = locations.rectangle.split(";")[0];
  // const { now }: INowWeather = await getWeather(rectangle);
  // const hour = moment(now.obsTime).format("H");
  // const night = +hour >= 18 || +hour <= 6;

  return { props: { locations, rectangle } };
}
