import {ICityWeatherItem} from "../types/city-weather.model";

export const getWeatherById = async (name: string): Promise<ICityWeatherItem | null> => {
    const param = {
        "key": "https://api.openweathermap.org/data/2.5/",
        "appid": "1978d5cd2ed3658747a2c546f5ef164e"
    }

    const url = `${param.key}weather?q=${name}&units=metric&APPID=${param.appid}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return await response.json();
    } catch (error) {
        return null;
    }
};
