const initialState: initialStateType = {}

export const weatherReducer = (state: initialStateType, actions: ActionsType) => {
  switch (actions.type) {
    case "SET-CURRENT-WEATHER": {
      return {
        ...state,
        [actions.currentWeatherData.location.name]: {
          location: {
            name: actions.currentWeatherData.location.name,
            region: actions.currentWeatherData.location.region,
            country: actions.currentWeatherData.location.country,
          },
          current: {
            last_updated: actions.currentWeatherData.current.last_updated,
            temp_c: actions.currentWeatherData.current.temp_c,
            feelslike_c: actions.currentWeatherData.current.feelslike_c,
            is_day: actions.currentWeatherData.current.is_day,
            condition: {
              text: actions.currentWeatherData.current.condition.text,
              icon: actions.currentWeatherData.current.condition.icon,
            },
            wind_kph: actions.currentWeatherData.current.wind_kph,
            wind_dir: actions.currentWeatherData.current.wind_dir,
            pressure_mb: actions.currentWeatherData.current.pressure_mb,
            precip_mm: actions.currentWeatherData.current.precip_mm,
            humidity: actions.currentWeatherData.current.humidity,
            cloud: actions.currentWeatherData.current.cloud,
            vis_km: actions.currentWeatherData.current.vis_km,
            uv: actions.currentWeatherData.current.uv,
          },
        },
      }

    }
    default: {
      return state
    }
  }
}

export const setCurrentWeather = (currentWeatherData: CurrentWeather) => ({
  type: 'SET-CURRENT-WEATHER', currentWeatherData,
} as const)


//TYPES
type ActionsType = ReturnType<typeof setCurrentWeather>
type initialStateType = {
  [key: string]: CurrentWeather
}
type CurrentWeather = {
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
  }
}
type WeatherLocation = {
  name: string
  region: string
  country: string
}
type WeatherCloudCondition = {
  text: string // sky condition (sunny/cloudy/partly cloudy...)
  icon: string // icon for sky condition
}