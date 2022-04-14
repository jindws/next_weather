import React from "react";
import { IContext, INowWeather } from "../api/types";
import Humidity from "../../public/humidity";
import Rain from "../../public/rain";
import WindSpeed from "../../public/windSpeed";
import Back from "../../public/back";
import Link from "next/link";
import styles from "./main.module.scss";
import Week from "./week";
import Chart from "./chart";
import getWeatherImg from "../api/getWeatherImg";
import { get24hWeather, get7Weather, getLocation, getWeather } from "../api";
import moment from "moment";

/**
 * 详情页
 * @constructor
 */
export default function Main(props: IContext) {
  const {
    locations = { city: "", province: "" },
    now = { text: "", temp: "", precip: "", humidity: "", windSpeed: "" },
    night = false,
    rectangle = "",
    xData = [],
    yData = [],
    daily = [],
  } = props;

  return (
    <section className={styles.main}>
      <Link href="/">
        <div className={styles.main__back}>
          <Back />
        </div>
      </Link>
      <div className={styles.main__city}>
        {locations.city},<br />
        {locations.province}
      </div>
      <div className={styles.main__weather}>
        {getWeatherImg(now.text, night)}
      </div>
      <label className={styles.main__temp}>
        {now.temp}
        <sup>℃</sup>
      </label>
      <ul>
        <li>
          <Rain color="#658ED9" />
          <span>{now.precip}毫米</span>
        </li>
        <li>
          <Humidity color="#D86191" />
          {now.humidity}%
        </li>
        <li>
          <WindSpeed color="#5E4FC1" />
          {now.windSpeed}km/h
        </li>
      </ul>
      <span className={styles.main__today}>Today</span>
      <Chart rectangle={rectangle} xData={xData} yData={yData} />
      <Week daily={daily} night={night} />
    </section>
  );
}

/**
 * @desc 服务端渲染ssr
 */
export async function getServerSideProps(data: any) {
  const locations = await getLocation(data.req.headers["x-real-ip"]);
  const rectangle = locations.rectangle.split(";")[0];
  const { now }: INowWeather = await getWeather(rectangle);
  const hour = moment(now.obsTime).format("H");
  const night = +hour >= 18 || +hour <= 6;
  const { daily } = (await get7Weather(rectangle)) as any;
  const { hourly } = (await get24hWeather(rectangle)) as any;
  const xData = [];
  const yData = [];
  moment.locale("en-us");
  for (const itm of hourly) {
    xData.push(moment(itm.fxTime).format("h a"));
    yData.push(+itm.temp);
  }
  moment.locale("zh-cn");
  for (let itm of daily) {
    itm.week = moment(itm.fxDate).format("周dd");
  }

  return { props: { locations, rectangle, now, night, xData, yData, daily } };
}
