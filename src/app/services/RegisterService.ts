import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { IUser, SignUpResponse } from "../../models/user";

export const registerAPI = createApi({
    reducerPath: 'registerAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api'}),
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