import React, {useEffect, useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentWeather, WeatherStateType} from "../bll/weather/weatherReducer";
import {RootStateType} from "../bll/store";
import {Main} from "./Main/Main";
import {PlateComponent} from "./PlateComponent/PlateComponent";
import {SubmitHandler, useForm} from "react-hook-form";
import {Loader} from "./Loader/Loader";

interface IFormInput {
  location: string;
}

const App = () => {
  const {register, handleSubmit, reset} = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = data => {
    dispatch(setCurrentWeather(data.location));
    reset()
  }


  const dispatch = useDispatch();
  const id = useSelector<RootStateType, string>(state => state.app.page)
  const data = useSelector<RootStateType, WeatherStateType>(state => state.weather)
  // TODO - take location from browser location and local storage
  // useEffect(() => {
  //   dispatch(setCurrentWeather('Белая Церковь'))
  // }, [])

  return (<div className="App">

    <div className={'form'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder={'Write with English or Russian language'}
               className={'inputText'} {...register("location", {required: true, maxLength: 20})} />
        <input className={'inputSubmit'} type="submit"/>
      </form>
    </div>


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
  </div>)

}

export default App;
