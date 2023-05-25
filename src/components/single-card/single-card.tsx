import React, {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {Box, Card, Container, Typography, Grid, CardMedia} from "@mui/material";
import {HomeIcon} from "../../shared/home-icon";

import {LocalStorage} from "../../constants/localStorage-settings.enum";
import {IWeather, ICityWeatherItem} from "../../types/city-weather.model";
import {useTypeSelector} from "../../hooks/use-type-selector";
import {selectWeatherData} from "../../redux/reducers/weatherSlice";

const SingleCard: FC = () => {
    const weatherData = useTypeSelector(selectWeatherData);
    const [cardItem, setCardItem] = useState<ICityWeatherItem>(weatherData)

    useEffect(() => {
        const card = localStorage.getItem(LocalStorage.localStorageCardKey);
        const parseCard: ICityWeatherItem = card ? JSON.parse(card) : null;
        localStorage.setItem(LocalStorage.localStorageCardKey, JSON.stringify(parseCard))
        setCardItem(parseCard)
    }, [])


    return (
        <Container sx={{mt: '3 rem', mb: '3 rem'}}>
            <Link to='/'>
                <Box
                    sx={{
                        '& > :not(style)': {
                            mt: 1,
                            mb: 4,
                        },
                    }}
                >
                    <HomeIcon color="success"/>
                </Box>
            </Link>
            <Card sx={{maxWidth: 1400, minHeight: 800, pt: 2}}>
                <Grid container sx={{maxWidth: 1200, mb: 1}} spacing={2}>
                    <Grid item>
                        <Box>
                            <CardMedia
                                component="img"
                                alt="weather icon"
                                height="150"
                                image={`https://openweathermap.org/img/wn/${cardItem?.weather.map((item: IWeather) => item.icon)}@2x.png`}
                            />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box>
                            <Typography variant="h4" component="div" color='success'>
                                {cardItem?.name}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ml: 3}}>
                    <Typography variant="h4" color="text.secondary">
                        {Math.round(cardItem?.main?.temp)}&deg;
                    </Typography>
                    <Typography variant="h6" component="h6" color="text.secondary">
                        pressure: {cardItem?.main?.pressure} {'hPa'}
                    </Typography>
                    <Typography variant="h6" component="h6" color="text.secondary">
                        description: {cardItem?.weather.map((item: IWeather) => item.description)}
                    </Typography>
                    <Typography variant="h6" component="h6" color="text.secondary">
                        main: {cardItem?.weather.map((item: IWeather) => item.main)}
                    </Typography>
                    <Typography variant="h6" component="h6" color="text.secondary">
                        wind: {cardItem?.wind?.speed} 'km/h'
                    </Typography>
                </Box>
            </Card>
        </Container>
    );
};

export default SingleCard;