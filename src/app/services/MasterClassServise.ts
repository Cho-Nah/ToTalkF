import { createApi } from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const connectWsApi = createApi({
    reducerPath: 'connectWsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080'}),
    tagTypes: ['connect-ws'],
    endpoints: (build) => ({
      connect: build.query({
        query: (chatId) => ({
          url: /chat/${chatId}
        }),
        providesTags: result => ['connect-ws']
      }),
    })
  });
  