import React, {MutableRefObject, useRef} from "react";
import usePoint from "./components/usePoint";
import styles from './index.module.scss'

/**
 * 随机生成的白色点背景
 * @constructor
 */
export default function Point() {
  const point: MutableRefObject<HTMLDivElement|null> = useRef(null);

  const [num, addPoint] = usePoint(point as MutableRefObject<HTMLDivElement>, 6) as [number, (arg: number) => void];

  return <div className={styles.point} onClick={addPoint.bind(null, 1)} ref={point as MutableRefObject<HTMLDivElement>} />;
}
