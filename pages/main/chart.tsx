import React, { useEffect, useState, useRef, useCallback } from "react";
import styles from "./main.module.scss";

/**
 * 使用echarts
 * @constructor
 */
export default function Chart(props: {
  rectangle: string;
  yData: number[];
  xData: number[];
}) {
  const { xData = [], yData = [] } = props;
  const [activeIndex, upActiveIndex] = useState(Infinity);
  const chart: any = useRef();

  useEffect(() => {
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
  }, [globalThis.echarts]);

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
