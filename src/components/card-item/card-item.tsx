import React, {FC, JSX} from 'react';
import {Link} from "react-router-dom";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import {IWeather, ICityWeatherItem} from "../../types/city-weather.model";
import {LocalStorage} from "../../constants/localStorage-settings.enum";

import {getWeatherAction} from "../../redux/actions/get-weather.action";
import {useTypeDispatch} from "../../hooks/use-type-dispatch";
import {setWeatherDataArr} from "../../redux/reducers/weatherSlice";

type Props = {
    item: ICityWeatherItem;
}

export const CardItem: FC<Props> = ({item}: Props): JSX.Element => {

    if (!item) {
        return <></>
    }

    const dispatch = useTypeDispatch();

    const savingDataSelectedCard = (id: number) => {
        if (item?.id === id) {
            localStorage.setItem(LocalStorage.localStorageCardKey, JSON.stringify(item));
        }
    };

    const deleteCard = (id: number): void => {
        const dataArr = localStorage.getItem(LocalStorage.localStorageCardsKey);
        const filterArr = dataArr ? JSON.parse(dataArr)?.filter((item: ICityWeatherItem) => item.id !== id) : [];
        localStorage.setItem(LocalStorage.localStorageCardsKey, JSON.stringify(filterArr))
        dispatch(setWeatherDataArr(filterArr));
    };

    const updateCard = (name: string) => {
        if (name) dispatch(getWeatherAction(name));
    };

    return (
        <Grid xs={12} md={2}>
            <Card sx={{width: 250, border: '1px solid #4caf50', borderRadius: 2}}>
                <Link to='/card' onClick={() => savingDataSelectedCard(item.id)}>
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="h4">
                            {item.name}
                        </Typography>
                        <Box sx={{width: 50, height: 50}}>
                            <CardMedia
                                component="img"
                                alt="weather icon"
                                image={`https://openweathermap.org/img/wn/${item.weather.map((item) => item.icon)}@2x.png`}
                            />
                        </Box>
                        <Typography variant="h5" component="h5">
                            {Math.round(item.main.temp)}&deg;
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            pressure: {item.main.pressure} {'hPa'}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            description: {item.weather.map((item: IWeather) => item.description)}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            main: {item.weather.map((item: IWeather) => item.main)}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            wind: {item.wind.speed} {'km/h'}
                        </Typography>
                    </CardContent>
                </Link>
                <CardActions>
                    <Button size="small" variant="outlined" color='success' sx={{mr: 1}}
                            onClick={() => deleteCard(item.id)}>Delete
                        card</Button>
                    <Button size="small" variant="outlined" color='success' onClick={() => updateCard(item.name)}>Update
                        card</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};
