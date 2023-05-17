import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {weatherReducer} from "../reducers/weatherSlice";

const setupStore = () => {
    return configureStore({
        reducer: {
            weather: weatherReducer,
        },
    });
};

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

