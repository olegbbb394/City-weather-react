import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store/store";
import {ICityWeatherItem} from "../../types/city-weather.model";

export interface IWeatherState {
    weatherDataArr: ICityWeatherItem[];
    weatherData: ICityWeatherItem,
}

const initialState: IWeatherState = {
    weatherDataArr: [],
    weatherData: null!,
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setWeatherDataArr: (state: IWeatherState, action: PayloadAction<ICityWeatherItem[]>) => {
            state.weatherDataArr = action.payload;
        },
        setWeatherData: (state: IWeatherState, action: PayloadAction<ICityWeatherItem>) => {
            state.weatherData = action.payload;
        },
    },
});

export const {setWeatherDataArr, setWeatherData} = weatherSlice.actions;
export const weatherReducer = weatherSlice.reducer;
export const selectWeatherDataArr = (state: RootState) => state.weather.weatherDataArr;
export const selectWeatherData = (state: RootState) => state.weather.weatherData;