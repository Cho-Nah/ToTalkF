import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { io } from "socket.io-client";
import { store } from "../Store/store";

const token = localStorage.getItem("token")

const socket = io(`ws://localhost:8081ws?token=${token}`);

export const chatApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    getMessage: builder.query({
      query: () => 'getMessage',
    }),
    sendMessage: builder.mutation<void, string>({ // заменить на реальные значения
      // Определяем функцию, которая будет отправлять сообщение на сервер
      query: (message) => {
        // Отправляем сообщение через сокет
        socket.emit('sendMessage', { message });
      },
      invalidatesTags: ["Messages"],
      onQueryStarted: () => {
        console.log('Sending message...');
      },
    }),

    disconnectSocket: builder.mutation<void, void>({
      query: () => {
        socket.disconnect();
        return { data: undefined };
      },
    }),
  }),
});

socket.on('connect', () => {
  console.log('[WS Service]: connected to server');
  console.log(socket.connected);
});

socket.on('message', (data) => {
  console.log("получено сообщение", data);
  
  store.dispatch(
    chatApi.util.invalidateTags(['Messages'])
  );
});

socket.on('disconnect', () => {
  console.log("disconnected");
  console.log(socket.disconnected);
});

// export const { useGetMessageQuery, useSendMessageMutation } = messageApi;