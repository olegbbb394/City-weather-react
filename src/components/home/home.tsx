import React, {FC, useEffect} from 'react';
import {Box, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import {ICityWeatherItem} from "../../types/city-weather.model";

import {LocalStorage} from "../../constants/localStorage-settings.enum";
import {keyGeneratorUtil} from "../../utils/key-generator";
import {useTypeDispatch} from "../../hooks/use-type-dispatch";
import {useTypeSelector} from "../../hooks/use-type-selector";

import {CardItem} from "../card-item/card-item";
import {selectWeatherDataArr} from "../../redux/reducers/weatherSlice";
import {getWeatherAction} from "../../redux/actions/get-weather.action";

const Home: FC = () => {
    const weatherData = useTypeSelector(selectWeatherDataArr);
    const dispatch = useTypeDispatch();

    const handleChange = (event: SelectChangeEvent) => {
        if (event.target.value) {
            const name = event.target.value;
            dispatch(getWeatherAction(name));
        }
    };

    useEffect(() => {
        const cards = localStorage.getItem(LocalStorage.localStorageCardsKey);
        const parseCards = cards ? JSON.parse(cards) : [];

        if (parseCards) {
            parseCards.forEach((item: ICityWeatherItem) => dispatch(getWeatherAction(item.name)))
        }

    }, []);

    return (
        <>
            <Container sx={{mt: '3 rem', mb: '3 rem'}}>
                <header>
                    <Typography variant={'h3'} component={'h1'}>
                        City weather
                    </Typography>
                </header>
                <section>
                    <Box sx={{minWidth: 200}}>
                        <FormControl sx={{mb: 2, mt: 2, minWidth: 200}}>
                            <InputLabel id="selectId" color='success'>City</InputLabel>
                            <Select
                                labelId="labelId"
                                id="selectId"
                                label="City"
                                color='success'
                                onChange={handleChange}
                            >
                                <MenuItem value='Kyiv'>Kyiv</MenuItem>
                                <MenuItem value='Odesa'>Odesa</MenuItem>
                                <MenuItem value='Kryvyi Rih'>Kryvyi Rih</MenuItem>
                                <MenuItem value='Dnipro'>Dnipro</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box
                        component="form"
                        sx={{'& > :not(style)': {m: 1, width: '25ch'}}}
                        noValidate
                        autoComplete="off"
                    >
                    </Box>
                </section>
                <section>
                    <Grid container sx={{mt: 2}} spacing={2}>
                        {!!weatherData.length && weatherData.map((item: ICityWeatherItem, i: number) => (
                            <div key={keyGeneratorUtil(i, Home.name)}>
                                <CardItem item={item}/>
                            </div>
                        ))}
                    </Grid>
                </section>
            </Container>
        </>
    );
}

export default Home;