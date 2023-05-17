export interface ICityWeatherItem {
    id: number;
    main: IMain;
    name: string;
    weather: IWeather[];
    wind: IWind;
}

export interface IMain {
    pressure: number;
    temp: number;
}

export interface IWeather {
    description: string;
    icon: string;
    id: number;
    main: string;
}

export interface IWind {
    speed: number;
}