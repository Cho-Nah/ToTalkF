import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { SignUpResponse } from "../../models/user";

export const registerAPI = createApi({
    reducerPath: 'registerAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/api'}),
    tagTypes: ['sign-up'],
    endpoints: (build) => ({
        createPost: build.mutation<{ status: string }, SignUpResponse>({
            query: (userdata) => ({
                url: `/auth/sign-up`,
                method: 'POST',
                body: userdata
            }),
            invalidatesTags: ['sign-up']
        }),
    })
});