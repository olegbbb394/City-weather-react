import React from 'react';
import {AppProviders} from "../providers/app-providers";
import {Routes, Route} from "react-router-dom";
import Home from "../components/home/home";
import SingleCard from "../components/single-card/single-card";

function App() {

    return (
        <>
            <AppProviders>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/card' element={<SingleCard/>}/>
                </Routes>
            </AppProviders>
        </>
    );
}

export default App;