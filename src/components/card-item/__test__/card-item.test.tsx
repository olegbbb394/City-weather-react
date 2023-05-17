import {render, screen, act} from "../../../test-utils";
import {BrowserRouter as Router} from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import {CardItem} from "../card-item";
import {ICityWeatherItem} from "../../../types/city-weather.model";
import {getWeatherAction} from "../../../redux/actions/get-weather.action";

describe('Card item component', () => {

    it('should render Card item component with data', () => {

        const item: ICityWeatherItem | null = {
            id: 703448,
            main: {pressure: 1000, temp: 35},
            name: 'Kyiv',
            weather: [{description: 'good', icon: 'o2d', id: 2, main: 'good'}],
            wind: {speed: 20}
        };

        const cardItemData = render(
            <Router basename="/">
                <CardItem item={item}/>
            </Router>
        );

        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(screen.getByRole('link')).toBeInTheDocument();
        expect(screen.getByText(item.name)).toBeInTheDocument();
        expect(cardItemData).toMatchSnapshot();
    });

    it('should button delete card,deletes the card', async () => {

        let item: ICityWeatherItem | null = {
            id: 703448,
            main: {pressure: 1000, temp: 35},
            name: 'Kyiv',
            weather: [{description: 'good', icon: 'o2d', id: 2, main: 'good'}],
            wind: {speed: 20}
        };
        const getDeleteButton = () => {
            const button = screen.getByRole('button', {name: /Delete card/i});
            item = null;
            return button;
        };

        render(
            <Router basename="/">
                <CardItem item={item}/>
            </Router>
        );

        expect(item.name).toBeTruthy();
        expect(getDeleteButton()).toBeInTheDocument();

        await act(async () => {
            await userEvent.click(getDeleteButton());
        });

        expect(item).toBeNull();
    });

    it('should button update card,updates the card', async () => {
        const dispatchMock = jest.fn();
        const getUpdateButton = () => screen.getByRole('button', {name: /Update card/i});

        const item: ICityWeatherItem | null = {
            id: 703448,
            main: {pressure: 1000, temp: 35},
            name: 'Kyiv',
            weather: [{description: 'good', icon: 'o2d', id: 2, main: 'good'}],
            wind: {speed: 20}
        };

        const getWeatherActionMock = getWeatherAction(item.name);

        render(
            <Router basename="/">
                <CardItem item={item}/>
            </Router>
        );

        await act(async () => {
            await userEvent.click(getUpdateButton());
        });

        dispatchMock(getWeatherActionMock);

        expect(getUpdateButton()).toBeInTheDocument();
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

        render(
            <Router basename="/">
                <CardItem item={item}/>
            </Router>
        );

        const link = screen.getByRole('link');

        expect(link).toBeInTheDocument();
        expect(localStorageSpy).not.toHaveBeenCalled();
        expect(item.name).toBeTruthy();

        await act(async () => {
            await userEvent.click(link);
        });

        expect(localStorageSpy).toHaveBeenCalledTimes(1);
        expect(localStorageSpy).toMatchSnapshot();
    });
});