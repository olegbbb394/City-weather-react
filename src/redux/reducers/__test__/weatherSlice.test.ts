import {IWeatherState, setWeatherData, setWeatherDataArr, weatherReducer} from "../weatherSlice";

describe('weatherSlice', () => {

    it('should render empty weatherDataArr', () => {

        const state: IWeatherState = {
            weatherDataArr: [],
            weatherData: null!,
        };

        const newStateArr = weatherReducer(state, setWeatherDataArr([]));
        const newState = weatherReducer(state, setWeatherData(null!));

        expect(newStateArr.weatherDataArr).toHaveLength(0);
        expect(newState.weatherData).toBeFalsy();
        expect(newStateArr).toMatchSnapshot();
        expect(newState).toMatchSnapshot();
    });

    it('should render weatherDataArr with data', () => {

        const state: IWeatherState = {
            weatherDataArr: [{
                id: 703448,

                main: {
                    pressure: 1000,

                    temp: 35,
                },
                name: 'Kyiv',
                weather: [{
                    description: 'good',
                    icon: 'o2d',
                    id: 2,
                    main: 'good',
                }],

                wind: {
                    speed: 20,
                },
            }],

            weatherData: {
                id: 703448,

                main: {
                    pressure: 1000,

                    temp: 35,
                },
                name: 'Kyiv',
                weather: [{
                    description: 'good',
                    icon: 'o2d',
                    id: 2,
                    main: 'good',
                }],

                wind: {
                    speed: 20,
                },
            },
        };

        const newStateArr = weatherReducer(state, setWeatherDataArr(state.weatherDataArr));
        const newState = weatherReducer(state, setWeatherData(state.weatherData));
        expect(newStateArr.weatherDataArr).toBeTruthy();
        expect(newState.weatherData).toBeTruthy();
        expect(newStateArr.weatherDataArr).toHaveLength(1);
        expect(newStateArr).toMatchSnapshot();
        expect(newState).toMatchSnapshot();
    });
});