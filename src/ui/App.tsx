import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentWeather, WeatherStateType} from "../bll/weather/weatherReducer";
import {RootStateType} from "../bll/store";
import {Main} from "./Main/Main";
import {SubmitHandler, useForm} from "react-hook-form";
import {Loader} from "./utils/Loader/Loader";
import {ErrorSnackbar} from "./utils/ErrorSnackbar/ErrorSnackbar";
import {AppAddNewLocationStatusType, AppLoadingStatusType} from "../bll/app/appReducer";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {AddNewLocationButton} from "./utils/AddNewLocation/AddNewLocationButton/AddNewLocationButton";
import {Plates} from "./Plates/Plates";
import {AddNewLocationModal} from "./utils/AddNewLocation/AddNewLocationModal/AddNewLocationModal";


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
    const addNewLocationStatus = useSelector<RootStateType, AppAddNewLocationStatusType>(state => state.app.addNewLocationStatus)
    // TODO - take location from browser location and local storage
    const locationForUseEffect = localStorage.getItem('location') ?? 'Kyiv'
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
                <Plates data={data} id={id}/>
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
        <AddNewLocationButton/>
        {addNewLocationStatus === 'show' && <AddNewLocationModal/>}
    </div>)

}

export default App;
