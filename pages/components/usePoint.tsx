import { useCallback, useEffect, useState } from "react";

export default function usePoint(point: { current: { appendChild: (arg0: HTMLElement) => void; }; }, sum: number) {
  const [need, upNeed] = useState(sum); // 需要多少个
  const [num, upNum] = useState(0); // 现在有多少个
  useEffect(() => {
    const dom: HTMLElement = document.createElement("i");
    const left = Math.random() * 90 + 1;
    const top = Math.random() * 90 + 1;
    const width = Math.random();
    dom.setAttribute(
      "style",
      `left:${left}%;top:${top}%;width:${width}rem;height:${width}rem`
    );
    point.current.appendChild(dom);
    if (num < sum) {
      setTimeout(() => {
        upNum(num + 1);
      }, 500);
    }
  }, [num, need]);

  const addPoint = useCallback(
    (_num = 1) => {
      console.log("addPoint");
      upNeed(need + _num);
    },
    [need]
  );

  return [num, addPoint];
}
