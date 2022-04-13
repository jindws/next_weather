export interface IContext {
  locations: {
    province: string;
    city: string;
  };
  rectangle: string;
  now: {
    temp: string;
    precip: string;
    windSpeed: string;
    humidity: string;
    text: string;
    obsTime: string;
    windDir: string;
  };
  night: boolean;
}

export interface INowWeather {
  now: {
    temp: string;
    precip: string;
    humidity: string;
    windSpeed: string;
    text: string;
    windDir: string;
    obsTime: string;
  };
  updateTime: string;
}
