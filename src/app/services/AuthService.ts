import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IUser, SignInResponse } from "../../models/user";

export const authAPI = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/api'}),
  tagTypes: ['sign-in'],
  endpoints: (build) => ({
    sendSignIn: build.mutation<{ token: string }, SignInResponse>({
      query: (userdata) => {
        const token = localStorage.getItem("token");

        return {
          headers: {
            Authorization: `Bearer ${token}`
          },
          url: `/auth/sign-in`,
          method: 'POST',
          body: userdata
        }
      },
      invalidatesTags: ['sign-in']
    }),
  })
});