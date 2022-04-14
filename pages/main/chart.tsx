import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { get24hWeather } from "../api";
import Context from "../api/context";
import { IContext } from "../api/types";
import moment from "moment";
import styles from "./main.module.scss";

/**
 * 使用echarts
 * @constructor
 */
export default function Chart() {
  const { rectangle } = useContext(Context) as IContext;
  const [today, upToday] = useState([]) as any;
  const [activeIndex, upActiveIndex] = useState(Infinity);
  const chart: any = useRef();

  const [xData, yData] = useMemo(() => {
    moment.locale("en-us");
    const xData = [];
    const yData = [];
    for (const itm of today) {
      xData.push(moment(itm.fxTime).format("h a"));
      yData.push(+itm.temp);
    }
    return [xData, yData];
  }, [today]);

  useEffect(() => {
    if (rectangle) {
      get24hWeather(rectangle).then((data: { hourly: [] }) => {
        upToday(data.hourly);
      });
    }
  }, [rectangle]);

  useEffect(() => {
    if (!globalThis.echarts) return;
    const myChart = echarts.init(chart.current);
    myChart.setOption({
      xAxis: {
        type: "category",
        data: ["", ...xData, ""],
        axisLabel: { color: "rgba(51, 40, 33, 0.5)" },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      yAxis: {
        type: "value",
        show: false,
        min: Math.min.apply(null, yData) - 1,
        max: Math.max.apply(null, yData) + 1,
        splitLine: {
          show: false,
        },
      },
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 25,
        },
      ],
      grid: {
        left: -30,
        right: -30,
      },
      series: [
        {
          data: [yData[0], ...yData, yData.at(-1)],
          type: "line",
          smooth: true,
          areaStyle: {
            color: "rgba(233, 201, 57, 0.25)",
          },
          lineStyle: {
            color: "rgba(233, 201, 57, 1)",
            shadowColor: "rgba(233, 201, 57, 1)",
            shadowBlur: 2,
          },
          showSymbol: false,
        },
      ],
    });
  }, [xData, yData]);

  const update = useCallback((event) => {
    upActiveIndex(+event.currentTarget.dataset.id);
  }, []);
  return (
    <>
      <div className={styles.main__chart} ref={chart} />{" "}
      <dl className={styles.main__card}>
        {[0, 1, 2].map((itm) => (
          <dd
            onClick={update}
            className={activeIndex === itm ? styles.on : ""}
            key={itm}
            data-id={itm}
          >
            <div>
              <span>
                {yData[itm]}
                <sup>℃</sup>
              </span>
              <label>{xData[itm]}</label>
            </div>
            <i />
          </dd>
        ))}
      </dl>
    </>
  );
}
