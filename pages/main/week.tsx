import React from "react";
import getWeatherImg from "../api/getWeatherImg";
import styles from "./main.module.scss";

/**
 * 一周天气
 * @constructor
 */
export default function Week(props: { daily: []; night: boolean }) {
  const { daily, night } = props;
  return (
    <dl className={styles.week}>
      {daily.map((itm: any) => {
        return (
          <dd key={itm.fxDate}>
            <span>{itm.week}</span>
            {getWeatherImg(itm.textDay, night)}
            <label>
              {itm.tempMax}
              <sup>℃</sup>
              <em>
                {itm.tempMin}
                <sup>℃</sup>
              </em>
            </label>
          </dd>
        );
      })}
    </dl>
  );
}
