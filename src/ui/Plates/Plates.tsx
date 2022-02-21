import React, {FC} from 'react';
import {PlateComponent} from "./PlateComponent/PlateComponent";
import {WeatherStateType} from "../../bll/weather/weatherReducer";

type PropsType = {
    data: WeatherStateType
    id: string
}

export const Plates: FC<PropsType> = ({data, id}) => {
    return (
        <div className={'platesWrapper'}>
            <PlateComponent imgUrl={'https://img.icons8.com/small/16/000000/thermometer.png'}
                            title={'FEELS LIKE'} data={`${data[id].currentWeather.current.feelslike_c}°`}/>
            <PlateComponent imgUrl={'https://img.icons8.com/small/16/000000/wet.png'}
                            title={'HUMIDITY'} data={`${data[id].currentWeather.current.humidity}%`}/>
            <PlateComponent imgUrl={'https://img.icons8.com/small/16/000000/barometer-gauge.png'}
                            title={'PRESSURE'}
                            data={`${data[id].currentWeather.current.pressure_mb} hPa`}/>
            <PlateComponent imgUrl={'https://img.icons8.com/small/16/000000/wind.png'} title={'WIND SPEED'}
                            data={`${data[id].currentWeather.current.wind_kph} kph`}/>
            <PlateComponent imgUrl={'https://img.icons8.com/small/16/000000/windsock.png'}
                            title={'WIND DIR'} data={data[id].currentWeather.current.wind_dir}/>
            <PlateComponent imgUrl={'https://img.icons8.com/material-outlined/16/000000/visible--v1.png'}
                            title={'VISIBILITY'} data={`${data[id].currentWeather.current.vis_km} km`}/>
            <PlateComponent imgUrl={'https://img.icons8.com/small/16/000000/cloud.png'} title={'CLOUDINESS'}
                            data={`${data[id].currentWeather.current.cloud}%`}/>
            <PlateComponent imgUrl={"https://img.icons8.com/small/16/000000/hygrometer.png"}
                            title={'PRECIPITATION'}
                            data={`${data[id].currentWeather.current.precip_mm} mm`}/>
            <PlateComponent imgUrl={'https://img.icons8.com/small/16/000000/sun.png'} title={'UV INDEX'}
                            data={data[id].currentWeather.current.uv}/>
        </div>
    );
};