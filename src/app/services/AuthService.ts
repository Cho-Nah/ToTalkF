import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { IUser, SignInResponse } from "../../models/user";

export const authAPI = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api'}),
    tagTypes: ['sign-in'],
    endpoints: (build) => ({
        sendSignIn: build.mutation<IUser, SignInResponse>({
            query: (userdata) => ({
                url: `/auth/sign-in`,
                method: 'POST',
                body: userdata
            }),
            invalidatesTags: ['sign-in']
        }),
    })
})