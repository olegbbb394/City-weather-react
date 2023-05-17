import {ICityWeatherItem} from "../../types/city-weather.model";
import {AppThunk} from "../store/store";
import {getWeatherById} from "../../api/open-weather.api";
import {LocalStorage} from "../../constants/localStorage-settings.enum";
import {setWeatherDataArr} from "../reducers/weatherSlice";

export const getWeatherAction = (name: string): AppThunk => async dispatch => {
    const response: ICityWeatherItem | null = await getWeatherById(name);

    if (response) {
        const cards = localStorage.getItem(LocalStorage.localStorageCardsKey);
        const parseCards = cards ? JSON.parse(cards) : [];

        if (!parseCards.find((item: ICityWeatherItem) => item.name === name)) {
            parseCards.push(response);
        }

        localStorage.setItem(LocalStorage.localStorageCardsKey, JSON.stringify(parseCards))
        dispatch(setWeatherDataArr(parseCards));
    }
};