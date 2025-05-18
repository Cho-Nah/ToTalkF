import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

type Message = string;

export const chatApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    connect: builder.query<Message[], number>({
      queryFn: (chatid) => ({ data: [] }), // Заглушка, реальные данные будем получать через WS
      async onCacheEntryAdded(
        chatId,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData, dispatch }
      ) {
        const token = localStorage.getItem("token");
        const socket = new WebSocket(`ws://localhost:8081/ws/${chatId}?token=${token}`);

        try {
          await cacheDataLoaded;

          socket.onmessage = (event) => {
            const message = JSON.parse(event.data) as Message;
            updateCachedData((draft) => {
              draft.push(message);
            });
          };

          socket.onclose = () => {
            console.log("WebSocket connection closed");
          };

          await cacheEntryRemoved;
        } finally {
          socket.close();
        }
      },
      providesTags: ['Messages'],
    }),

    sendMessage: builder.mutation<void, {message: string, chatId: number}>({
      queryFn: async ({message, chatId}) => {
        const token = localStorage.getItem("token");
        const socket = new WebSocket(`ws://localhost:8081/ws/${chatId}`);

        return new Promise((resolve) => {
          socket.onopen = () => {
            socket.send(JSON.stringify({ text: message }));
            socket.close();
            resolve({ data: undefined });
          };
        });
      },
      invalidatesTags: ['Messages'],
    }),

    disconnect: builder.mutation<void, void>({
      queryFn: () => {
        // В реальной реализации нужно хранить активные соединения
        // и закрывать их здесь
        return { data: undefined };
      },
    }),
  }),
});