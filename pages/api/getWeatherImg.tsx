import React from "react";
import DaySun from "../../public/DaySun.png";
import DayCloud from "../../public/DayCloud.png";
import DayRain from "../../public/DayRain.png";
import NightMoon from "../../public/NightMoon.png";
import NightCloud from "../../public/NightCloud.png";
import NightRain from "../../public/NightRain.png";
import NightStorm from "../../public/NightStorm.png";
import DayStorm from "../../public/DayStorm.png";
import styles from "./getWeatherImg.module.scss";
import { StaticImageData } from "next/image";

export default function getWeatherImg(type: string = "", night = false) {
  let src: StaticImageData[] = [];
  if (type.includes("雨")) {
    // 包含小雨中雨等
    src = [DayRain, NightRain];
  } else if (type.includes("雷")) {
    // 雷阵雨
    src = [DayStorm, NightStorm];
  } else {
    switch (type) {
      case "晴":
        src = [DaySun, NightMoon];
        break;
      case "阴":
      case "多云":
        src = [DayCloud, NightCloud];
        break;
    }
  }

  const url = src[night ? 1 : 0];
  return url && <img className={styles.weather_pic} src={url.src} alt="" />;
}
