import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentWeather, WeatherStateType} from "../bll/weather/weatherReducer";
import {RootStateType} from "../bll/store";
import {Main} from "./Main/Main";
import {PlateComponent} from "./PlateComponent/PlateComponent";
import {SubmitHandler, useForm} from "react-hook-form";
import {Loader} from "./utils/Loader/Loader";
import {ErrorSnackbar} from "./utils/ErrorSnackbar/ErrorSnackbar";
import {AppLoadingStatusType} from "../bll/app/appReducer";
import {yupResolver} from '@hookform/resolvers/yup';

import * as yup from "yup";


interface IFormInput {
  location: string;
}

const App = () => {

  const schema = yup.object({
    location: yup.string().required(),
  }).required();

  const {register, handleSubmit, reset} = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IFormInput> = data => {
    dispatch(setCurrentWeather(data.location));
    localStorage.setItem('location', data.location)
    reset()
  }


  const dispatch = useDispatch();
  const id = useSelector<RootStateType, string>(state => state.app.page)
  const data = useSelector<RootStateType, WeatherStateType>(state => state.weather)
  const error = useSelector<RootStateType, string | null>(state => state.app.error)
  const loading = useSelector<RootStateType, AppLoadingStatusType>(state => state.app.loading)
  // TODO - take location from browser location and local storage
  const locationForUseEffect = localStorage.getItem('location') ?? 'Kiev'
  useEffect(() => {
    dispatch(setCurrentWeather(locationForUseEffect))
  }, [dispatch, locationForUseEffect])

  return (<div className="App">

    <div className={'form'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <><input placeholder={'Write Your Location with English or Russian language'}
                 className={'inputText'} {...register("location", {required: true, maxLength: 20})} />
          <input className={'inputSubmit'} type="submit"/></>
      </form>
    </div>
    {loading === "loading" && <Loader/>}
    {(data && id) ?
      <>
        <Main key={data[id].id} locationName={data[id].currentWeather.location.name}
              temp={data[id].currentWeather.current.temp_c}
              cloudy={data[id].currentWeather.current.condition.text}
              lastUpdate={data[id].currentWeather.current.last_updated}/>
        <div className={'platesWrapper'}>
          <PlateComponent imgUrl={'https://img.icons8.com/small/16/000000/thermometer.png'}
                          title={'FEELS LIKE'} data={`${data[id].currentWeather.current.feelslike_c}°`}/>
          <PlateComponent imgUrl={'https://img.icons8.com/small/16/000000/wet.png'}
                          title={'HUMIDITY'} data={`${data[id].currentWeather.current.humidity}%`}/>
          <PlateComponent imgUrl={'https://img.icons8.com/small/16/000000/barometer-gauge.png'} title={'PRESSURE'}
                          data={`${data[id].currentWeather.current.pressure_mb} hPa`}/>
          <PlateComponent imgUrl={'https://img.icons8.com/small/16/000000/wind.png'} title={'WIND SPEED'}
                          data={`${data[id].currentWeather.current.wind_kph} kph`}/>
          <PlateComponent imgUrl={'https://img.icons8.com/small/16/000000/windsock.png'}
                          title={'WIND DIR'} data={data[id].currentWeather.current.wind_dir}/>
          <PlateComponent imgUrl={'https://img.icons8.com/material-outlined/16/000000/visible--v1.png'}
                          title={'VISIBILITY'} data={`${data[id].currentWeather.current.vis_km} km`}/>
          <PlateComponent imgUrl={'https://img.icons8.com/small/16/000000/cloud.png'} title={'CLOUDINESS'}
                          data={`${data[id].currentWeather.current.cloud}%`}/>
          <PlateComponent imgUrl={"https://img.icons8.com/small/16/000000/hygrometer.png"} title={'PRECIPITATION'}
                          data={`${data[id].currentWeather.current.precip_mm} mm`}/>
          <PlateComponent imgUrl={'https://img.icons8.com/small/16/000000/sun.png'} title={'UV INDEX'}
                          data={data[id].currentWeather.current.uv}/>
        </div>
      </>

      :
      <>
        <Main locationName={'Choose Location'}
              temp={0}
              cloudy={'Sunny or not'}
              lastUpdate={`${new Date().toDateString()}`}/>
        <Loader/>
      </>}
    {error !== null && <ErrorSnackbar error={error}/>}
  </div>)

}

export default App;
