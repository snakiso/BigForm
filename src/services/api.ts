import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Data} from "../compotents/form/type.ts";

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: window.location.href.replace(/\/[^/]*$/, '/'),
    }),
    endpoints: builder => {
        return {
            getSettings: builder.query<Data, void>({
                // providesTags: [],
                query: () => `/settings.json`,
            }),
        }
    },
    keepUnusedDataFor: 0,
})

export const {useGetSettingsQuery} = baseApi
