import React, { useEffect, useState, useContext, useCallback } from "react";
import { get7Weather } from "../api";
import Context from "../api/context";
import { IContext } from "../api/types";
import moment from "moment";
import getWeatherImg from "../api/getWeatherImg";
import styles from "./main.module.scss";

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

  return (
    <dl className={styles.week}>
      {data.map((itm: any) => {
        moment.locale("zh-cn");
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
