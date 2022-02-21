import {setCurrentWeatherActionType} from "../weather/weatherReducer";

const initialState: AppReducerStateType = {
    page: '',
    loading: 'idle',
    error: null,
}

export const appReducer = (state = initialState, action: ActionsType): AppReducerStateType => {
    switch (action.type) {
        case "SET-CURRENT-WEATHER": {
            return {
                ...state,
                page: action.id,
            }
        }
        case "SET-APP-ERROR": {
            return {
                ...state,
                error: action.error,
            }
        }
        case "SET-APP-LOADING-STATUS": {
            return {
                ...state,
                loading: action.loading,
            }
        }
        default: {
            return state
        }
    }
}
export type setAppErrorActionType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: string | null) => ({
    type: 'SET-APP-ERROR', error,
} as const)

export type setAppLoadingStatusActionType = ReturnType<typeof setAppLoadingStatusAC>
export const setAppLoadingStatusAC = (loading: AppLoadingStatusType) => ({
    type: 'SET-APP-LOADING-STATUS', loading,
} as const)

//TYPES
type ActionsType = setCurrentWeatherActionType
    | setAppErrorActionType
    | setAppLoadingStatusActionType

export type AppReducerStateType = {
    page: string
    loading: AppLoadingStatusType
    error: string | null
}
export type AppLoadingStatusType = 'idle' | 'succed' | 'failed' | 'loading'