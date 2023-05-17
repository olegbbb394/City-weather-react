import {render, screen} from "../../test-utils";
import {MemoryRouter, Routes, Route} from 'react-router-dom';
import SingleCard from "../../components/single-card/single-card";
import Home from "../../components/home/home";

describe('App', () => {

    it('renders home component when visiting the root path', () => {

        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/card" element={<SingleCard/>}/>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('City weather')).toBeInTheDocument();
    });

    it('renders single-card component when visiting the /card path', () => {

        render(
            <MemoryRouter initialEntries={['/card']}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/card" element={<SingleCard/>}/>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByAltText('weather icon')).toBeInTheDocument();
    });
});