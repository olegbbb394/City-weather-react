import {ICityWeatherItem} from "../../../types/city-weather.model";
import {setWeatherDataArr} from "../../reducers/weatherSlice";
import {getWeatherById} from "../../../api/open-weather.api";
import {getWeatherAction} from "../get-weather.action";

jest.mock("../../../api/open-weather.api");
const getWeatherByIdMock = getWeatherById as unknown as jest.Mock<typeof getWeatherById>;

const data: ICityWeatherItem | null = {
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
};

describe('getWeatherAction', () => {
    it('should dispatch setWeatherDataArr with weather data', async () => {
        const thunk = getWeatherAction('Kyiv');
        const dispatchMock = jest.fn();
        const getStateMock = jest.fn();

        getWeatherByIdMock.mockResolvedValueOnce(data as never);
        await thunk(dispatchMock, getStateMock, {});

        expect(dispatchMock).toBeCalledTimes(1);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setWeatherDataArr([data]));
        expect(dispatchMock).toMatchSnapshot();
    });

    it('should not dispatch setWeatherDataArr when getWeatherById returns null', async () => {
        const thunk = getWeatherAction('Kyiv');
        const dispatchMock = jest.fn();
        const getStateMock = jest.fn();

        getWeatherByIdMock.mockResolvedValueOnce(null!);
        await thunk(dispatchMock, getStateMock, {});

        expect(dispatchMock).not.toBeCalled();
        expect(dispatchMock).toMatchSnapshot();
    });
});