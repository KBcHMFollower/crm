import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from './reducers/user-slice'
import Api from "../api/api";

const rootReducer = combineReducers({
    user: userReducer,
    [Api.reducerPath] : Api.reducer
},)

export const store = configureStore({
    reducer: rootReducer,
    middleware:
        (getdefaultMiddleware) =>
            getdefaultMiddleware().concat(Api.middleware)
})

export type RootState = ReturnType<typeof rootReducer>;
