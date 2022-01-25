import {Dispatch} from "redux";
import {weatherAPI} from "../../dal/weatherApi";
import {v1} from "uuid";
import {setAppErrorAC, setAppLoadingStatusAC} from "../app/appReducer";

const initialState: WeatherStateType = {} as WeatherStateType;

export const weatherReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case "SET-CURRENT-WEATHER": {
      return {
        [action.id]: {
          id: action.id,
          title: action.title,
          currentWeather: {
            location: {
              name: action.currentWeatherData.location.name,
              region: action.currentWeatherData.location.region,
              country: action.currentWeatherData.location.country,
            }
            ,
            current: {
              last_updated: action.currentWeatherData.current.last_updated,
              temp_c: action.currentWeatherData.current.temp_c,
              feelslike_c: action.currentWeatherData.current.feelslike_c,
              is_day: action.currentWeatherData.current.is_day,
              condition: {
                text: action.currentWeatherData.current.condition.text,
                icon: action.currentWeatherData.current.condition.icon,
              }
              ,
              wind_kph: action.currentWeatherData.current.wind_kph,
              wind_dir: action.currentWeatherData.current.wind_dir,
              pressure_mb: action.currentWeatherData.current.pressure_mb,
              precip_mm: action.currentWeatherData.current.precip_mm,
              humidity: action.currentWeatherData.current.humidity,
              cloud: action.currentWeatherData.current.cloud,
              vis_km: action.currentWeatherData.current.vis_km,
              uv: action.currentWeatherData.current.uv,
            },
          },
        },
      }
    }
    default: {
      return state
    }
  }
}

export const setCurrentWeatherAC = (title: string, currentWeatherData: CurrentWeatherResponse) => ({
  type: 'SET-CURRENT-WEATHER', currentWeatherData, id: v1(), title,
} as const)
export type setCurrentWeatherActionType = ReturnType<typeof setCurrentWeatherAC>

export const setCurrentWeather = (locationName: string) => (dispatch: Dispatch) => {
  dispatch(setAppLoadingStatusAC('loading'))
  weatherAPI.getCurrentWeather(locationName)
    .then(function (res: getCurrentWeatherResponseType) {
      dispatch(setAppLoadingStatusAC('succed'))
      dispatch(setCurrentWeatherAC(locationName, res.data))
    })
    .catch(function () {
      dispatch(setAppLoadingStatusAC('failed'))
      dispatch(setAppErrorAC('No matching location found'))

      setTimeout(()=> {
        dispatch(setAppLoadingStatusAC('idle'))
        dispatch(setAppErrorAC(null))
      }, 10 * 1000)
    })
}


//TYPES
type ActionsType = setCurrentWeatherActionType

export type WeatherStateType = {
  [key: string]: MainWeatherType
}

export type MainWeatherType = {
  id: string
  title: string
  currentWeather: CurrentWeather
}

export type CurrentWeather = {
  location: {
    name: string
    region: string
    country: string
  }
  current: {
    last_updated: string
    temp_c: number
    feelslike_c: number
    is_day: number
    condition: {
      text: string // sky condition (sunny/cloudy/partly cloudy...)
      icon: string // icon for sky condition
    }
    wind_kph: number
    wind_dir: string
    pressure_mb: number
    precip_mm: number
    humidity: number
    cloud: number // 100 max
    vis_km: number
    uv: number
  }
}

type getCurrentWeatherResponseType = {
  data: CurrentWeatherResponse
}

type CurrentWeatherResponse = {
  location: WeatherLocation,
  current: {
    last_updated: string
    temp_c: number
    feelslike_c: number
    is_day: number
    condition: WeatherCloudCondition
    wind_kph: number
    wind_dir: string
    pressure_mb: number
    precip_mm: number
    humidity: number
    cloud: number // 100 max
    vis_km: number
    uv: number
    last_updated_epoch: number
    temp_f: number
    "wind_mph": 13.6
    "wind_degree": 360
    "pressure_in": 30.45
    "precip_in": 0
    "feelslike_f": 12.1
    "vis_miles": 6
    "gust_mph": 16.8
    "gust_kph": 27
  }
}

type WeatherLocation = {
  name: string
  region: string
  country: string
  "lat": number
  "lon": number
  "tz_id": string
  "localtime_epoch": number
  "localtime": string
}
type WeatherCloudCondition = {
  text: string // sky condition (sunny/cloudy/partly cloudy...)
  icon: string // icon for sky condition
  code: number
}