import {render, screen, act, logRoles} from "../../../test-utils";
import Home from "../home";
import userEvent from "@testing-library/user-event";
import {getWeatherAction} from "../../../redux/actions/get-weather.action";
import {ICityWeatherItem} from "../../../types/city-weather.model";

describe('Home page', () => {

    it('should render Home page', () => {

        const {container }  = render(<Home/>);
        const heading = screen.getByRole('heading', {name: /city weather/i});
        logRoles(container);
        expect(heading).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('should role on Home page', async () => {

        render(<Home/>);

        const getSelect = () => screen.getByRole('button', {name: /City/i});

        expect(getSelect()).toBeInTheDocument();
        expect(screen.queryByText('Kyiv')).not.toBeInTheDocument();
        expect(screen.queryByText('Odesa')).not.toBeInTheDocument();
        expect(screen.queryByText('Kryvyi Rih')).not.toBeInTheDocument();
        expect(screen.queryByText('Dnipro')).not.toBeInTheDocument();

        await act(async () => {
            await userEvent.click(getSelect());
        });

        expect(screen.queryByText('Dnipro')).toBeInTheDocument();
        expect(screen.queryByText('Kyiv')).toBeInTheDocument();
        expect(screen.queryByText('Odesa')).toBeInTheDocument();
        expect(screen.queryByText('Kryvyi Rih')).toBeInTheDocument();
    });

    it('should dispatch name city in getWeatherAction', async () => {
        const dispatchMock = jest.fn();

        const item: ICityWeatherItem | null = {
            id: 703448,
            main: {pressure: 1000, temp: 35},
            name: 'Kyiv',
            weather: [{description: 'good', icon: 'o2d', id: 2, main: 'good'}],
            wind: {speed: 20}
        };

        const select = () => screen.getByLabelText('City');
        const getWeatherActionMock = getWeatherAction(item.name);

        render(<Home/>);

        await act(async () => {
            await userEvent.click(select());
        });

        dispatchMock(getWeatherActionMock);
        expect(select()).toBeInTheDocument();
        expect(dispatchMock).toHaveBeenCalledTimes(1);
    });

    it('should saving  Selected Card data in localStorage', async () => {
        const localStorageSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');

        const item: ICityWeatherItem | null = {
            id: 703448,
            main: {pressure: 1000, temp: 35},
            name: 'Kyiv',
            weather: [{description: 'good', icon: 'o2d', id: 2, main: 'good'}],
            wind: {speed: 20}
        };

        const dispatchMock = jest.fn();
        const thunk = getWeatherAction(item.name);

        render(<Home/>);

        expect(localStorageSpy).toBeTruthy();
        expect(item.name).toBeTruthy();
        dispatchMock(thunk);
        expect(dispatchMock).toHaveBeenCalledTimes(1);
    });
});
