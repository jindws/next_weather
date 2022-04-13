import React, { useContext } from "react";
import {IContext} from "../types";
import Context from "../api/context";
import getWeatherImg from "../components/getWeatherImg";
import Humidity from "../../public/humidity";
import Rain from "../../public/rain";
import WindSpeed from "../../public/windSpeed";
import Back from "../../public/back";
import Link from 'next/Link'
import styles from './main.module.scss'
import Week from "./week";
import Chart from "./chart";


/**
 * 详情页
 * @constructor
 */
export default function Main() {
  const { locations, now, night } = useContext(Context) as IContext;

  return (
      <section className={styles.main}>
        <Link  href="/">
            <div className={styles.main__back}><Back /></div>
        </Link>
        <div className={styles.main__city}>
          {locations.city},<br />
          {locations.province}
        </div>
        <div className={styles.main__weather}>{getWeatherImg(now.text, night)}</div>
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
        <Chart />
        <Week />
      </section>
  );
}
