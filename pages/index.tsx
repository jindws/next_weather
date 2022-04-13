import type { NextPage } from "next";
import styles from "./index.module.scss";
import { useContext, useState } from "react";
import W from "../public/w";
import getWeatherImg from "./api/getWeatherImg";
import Link from "next/link";
import Rain from "../public/rain";
import Humidity from "../public/humidity";
import WindSpeed from "../public/windSpeed";
import Home from "../public/home";
import Point from "./point";
import { IContext } from "./api/types";
import Context from "./api/context";

const Index: NextPage = () => {
  const { locations, night, now } = useContext(Context) as IContext;

  const [time, upTime] = useState({ week: "", aft: "" }); // 时间
  return (
    <section id="index">
      <W />
      <div className={styles.index}>
        <div className={styles.index__weather}>
          {/*{getWeatherImg(now.text, night)}*/}
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
