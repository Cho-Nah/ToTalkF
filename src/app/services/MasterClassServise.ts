import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { IEvent } from "../../models/event";
import type { IEventSend } from "../../models/event";

export const MasterClassApi = createApi({
  reducerPath: "MasterClassApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  tagTypes: ["Event"],
  endpoints: (build) => ({
    getEvents: build.query<IEvent[], void>({
      query: () => "/events",
      providesTags: () => ["Event"],
    }),
    sendEvents: build.mutation<IEventSend[], IEventSend>({
      query: (newEvent) => ({
        url: `/events`,
        method: "POST",
        body: newEvent,
      }),
      invalidatesTags: ["Event"],
    }),
  }),
});

export const { useGetEventsQuery, useSendEventsMutation } = MasterClassApi;
