import {setCurrentWeatherActionType} from "../weather/weatherReducer";

const initialState: AppReducerStateType = {
    page: '',
    loading: 'idle',
    error: null,
    addNewLocationStatus: 'hide',
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
        case "DVK/ADD-NEW-LOCATION-STATUS": {
            return {
                ...state,
                addNewLocationStatus: action.status,
            }
        }
        default: {
            return state
        }
    }
}

export type setAddNewLocationStatusActionType = ReturnType<typeof setAddNewLocationStatusAC>
export const setAddNewLocationStatusAC = (status: AppAddNewLocationStatusType) => ({
    type: 'DVK/ADD-NEW-LOCATION-STATUS', status,
} as const)

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
    | setAddNewLocationStatusActionType

export type AppReducerStateType = {
    page: string
    loading: AppLoadingStatusType
    error: string | null
    addNewLocationStatus: AppAddNewLocationStatusType
}
export type AppLoadingStatusType = 'idle' | 'succed' | 'failed' | 'loading'
export type AppAddNewLocationStatusType = 'show' | 'hide'