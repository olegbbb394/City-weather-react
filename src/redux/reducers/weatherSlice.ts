import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store/store";
import {ICityWeatherItem} from "../../types/city-weather.model";

export interface IWeatherState {
    weatherDataArr: ICityWeatherItem[];
}

const initialState: IWeatherState = {
    weatherDataArr: [],
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setWeatherDataArr: (state: IWeatherState, action: PayloadAction<ICityWeatherItem[]>) => {
            state.weatherDataArr = action.payload;
        },
    },
});

export const {setWeatherDataArr} = weatherSlice.actions;
export const weatherReducer = weatherSlice.reducer;
export const selectWeatherDataArr = (state: RootState) => state.weather.weatherDataArr;