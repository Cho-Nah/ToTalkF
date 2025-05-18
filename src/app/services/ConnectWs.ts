import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const connectWsApi = createApi({
  reducerPath: 'connectWsApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8081'}),
  tagTypes: ['connect-ws'],
  endpoints: (build) => ({
    connect: build.query({
      query: (chatId) => ({
        url: `/chat/${chatId}`
      }),
      providesTags: result => ['connect-ws']
    }),
  })
});