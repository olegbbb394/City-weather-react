import {IWeatherState, setWeatherDataArr, weatherReducer} from "../weatherSlice";

describe('weatherSlice', () => {

    it('should render empty weatherDataArr', () => {

        const state: IWeatherState = {
            weatherDataArr: [],
        };

        const newState = weatherReducer(state, setWeatherDataArr([]));

        expect(newState.weatherDataArr).toHaveLength(0);
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
        };

        const newState = weatherReducer(state, setWeatherDataArr(state.weatherDataArr));

        expect(newState.weatherDataArr).toBeTruthy();
        expect(newState.weatherDataArr).toHaveLength(1);
        expect(newState).toMatchSnapshot();
    });
});