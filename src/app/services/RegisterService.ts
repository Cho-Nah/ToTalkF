import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IUser, SignUpResponse } from "../../models/user";

export const registerAPI = createApi({
    reducerPath: 'registerAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://192.168.173.37:8080/api'}),
    tagTypes: ['sign-up'],
    endpoints: (build) => ({
        createPost: build.mutation<IUser, SignUpResponse>({
            query: (userdata) => ({
                url: `/auth/sign-up`,
                method: 'POST',
                body: userdata
            }),
            invalidatesTags: ['sign-up']
        }),
    })
});