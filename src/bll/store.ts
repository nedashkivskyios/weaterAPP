import {applyMiddleware, combineReducers, createStore} from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import {weatherReducer} from "./weather/weatherReducer";
import {appReducer} from "./app/appReducer";

const rootReducer = combineReducers({
  weather: weatherReducer,
  app: appReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))


export type RootStateType = ReturnType<typeof rootReducer>

export default store