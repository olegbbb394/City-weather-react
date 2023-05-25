import {BrowserRouter as Router} from 'react-router-dom';
import {act, render, screen} from "../../../test-utils";
import SingleCard from "../single-card";
import {ICityWeatherItem} from "../../../types/city-weather.model";

describe('SingleCard page', () => {

    it('should render on SingleCard page',  async () => {

        await act(async () => {
           await render(
                <Router basename="/">
                    <SingleCard/>
                </Router>
            );
        });


        expect(screen.getByRole('heading', {name: /pressure: hPa/i})).toBeInTheDocument();
        expect(screen.getByRole('img', {name: /weather icon/i})).toBeInTheDocument();
        expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('renders the home link', async () => {

        await act(async () => {
            render(
                <Router basename="/">
                    <SingleCard/>
                </Router>
            );
        });


        const homeLink = await screen.findByRole('link');

       await expect(homeLink).toBeInTheDocument();
       await expect(homeLink).toHaveAttribute('href', '/');
    });

    it('renders the card with weather details',async () => {
        const localStorageSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');

        const item: ICityWeatherItem | null = {
            id: 703448,
            main: {pressure: 1000, temp: 35},
            name: 'Kyiv',
            weather: [{description: 'good', icon: 'o2d', id: 2, main: 'good'}],
            wind: {speed: 20}
        };

        localStorage.setItem('localStorageCardKey', JSON.stringify(item));

        await act(async () => {
            await render(
                <Router basename="/">
                    <SingleCard/>
                </Router>
            );
        });


        expect(localStorageSpy).toBeTruthy();
        expect(localStorageSpy).toHaveBeenCalledTimes(2);
        expect(localStorageSpy).toMatchSnapshot();
    });

    it("renders card without weather data", async () => {
        const localStorageSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');
        localStorage.setItem("localStorageCardKey", JSON.stringify(null));

        await act(async () => {
            await render(
                <Router basename="/">
                    <SingleCard/>
                </Router>
            );
        });


        expect(screen.queryByText("City")).not.toBeInTheDocument();
        expect(screen.queryByText("20°")).not.toBeInTheDocument();
        expect(screen.queryByText("pressure: 1012 hPa")).not.toBeInTheDocument();
        expect(localStorageSpy).toHaveBeenCalledTimes(2);
    });
});