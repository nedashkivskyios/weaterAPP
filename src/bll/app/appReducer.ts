import {setCurrentWeatherActionType} from "../weather/weatherReducer";

const initialState: AppReducerStateType = {
  page: '',
  loading: 'idle',
}

export const appReducer = (state = initialState, action: ActionsType): AppReducerStateType => {
  switch (action.type) {
    case "SET-CURRENT-WEATHER": {
      return {
        ...state,
        page: action.id
      }
    }
    default: {
      return state
    }
  }
}

//TYPES
type ActionsType = setCurrentWeatherActionType

export type AppReducerStateType = {
  page: string
  loading: 'idle' | 'succed' | 'failed' | 'loading'
}