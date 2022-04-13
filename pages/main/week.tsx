import React, { useEffect, useState, useContext } from "react";
import { get7Weather } from "../api";
import Context from "../api/context";
import { IContext } from "../types";
import moment from "moment";
import getWeatherImg from "../components/getWeatherImg";
import styles from './main.module.scss'

/**
 * 一周天气
 * @constructor
 */
export default function Week() {
  const { rectangle, night } = useContext(Context) as IContext;
  const [data, upData] = useState([]);

  useEffect(() => {
    if (rectangle) {
      get7Weather(rectangle).then((data: { daily: [] }) => {
        upData(data.daily);
      });
    }
  }, [rectangle]);

  moment.locale("zh-cn");
  return (
    <dl className={styles.week}>
      {data.map((itm:any) => {
        return (
          <dd key={itm.fxDate}>
            <span>{moment(itm.fxDate).format("周dd")}</span>
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
