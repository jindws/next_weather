import type { NextPage } from "next";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
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

const Index: NextPage<IContext> = (props) => {
  const { night, now, locations } = props;

  const [time, upTime] = useState({ week: "", aft: "" }); // 时间

  useEffect(() => {
    if (now.obsTime) {
      moment.locale("zh-cn");
      const week = moment(now.obsTime).format("周dd");
      moment.locale("en-us");
      const aft = moment(now.obsTime).format("h a");
      upTime({
        week,
        aft,
      });
    }
  }, [now.obsTime]);

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
        {/*<a href="/main">详情</a>*/}
      </div>
      <dl className={styles.data}>
        <dd>
          <span>
            <Rain />
            降水量
          </span>
          <span>{now.precip}毫米</span>
        </dd>
        <dd>
          <span>
            <Humidity />
            湿度
          </span>
          <span>{now.humidity}%</span>
        </dd>
        <dd>
          <span>
            <WindSpeed />
            风速
          </span>
          <span>{now.windSpeed}km/h</span>
        </dd>
      </dl>
      <section className={styles.footer}>
        <div className={styles.home}>
          <div className={styles.home__data}>
            <Home />
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
export async function getServerSideProps() {
  const locations = await getLocation();
  const rectangle = locations.rectangle.split(";")[0];
  const { now }: INowWeather = await getWeather(rectangle);
  const hour = moment(now.obsTime).format("H");
  const night = +hour >= 18 || +hour <= 6;

  return { props: { locations, rectangle, now, night } };
}
