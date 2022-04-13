import { Get } from "./fetch";
import { INowWeather } from "../types";
const gaoDeKey = "b5dc101510c3172849a4fd74a4db8508";
const qWeather = "https://devapi.qWeather.com/v7/weather";
const qKey = "ae9136fb06a04934bdd38d87b35ea563";

/**
 * 根据ip获取定位
 */
export async function getLocation() {
  return Get(`https://restapi.amap.com/v3/ip?key=${gaoDeKey}`);
}

/**
 * 获取现在的天气
 * @param location
 */
export async function getWeather(location: string): Promise<INowWeather> {
  return Get(`${qWeather}/now?location=${location}&key=${qKey}`);
}

/**
 * 获取7天天气
 * @param location
 */
export async function get7Weather(location: string): Promise<{ daily: [] }> {
  return Get(`${qWeather}/7d?location=${location}&key=${qKey}`);
}

/**
 * 获取24h天气
 * @param location
 */
export async function get24hWeather(location: string): Promise<{ hourly: [] }> {
  return Get(`${qWeather}/24h?location=${location}&key=${qKey}`);
}
