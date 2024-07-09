import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'

import {configureStore} from '@reduxjs/toolkit'

import {baseApi} from './api'

export const store = configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
