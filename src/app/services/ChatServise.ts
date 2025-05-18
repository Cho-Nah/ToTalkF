import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { io, Socket } from "socket.io-client";

const token = localStorage.getItem("token");
let socket: Socket;

export const initSocket = (id: number) => {
  const token = localStorage.getItem("token");
  socket = io("ws://localhost:8081", {
    path: `/ws${id}`,
    // transports: ["websocket"],
    extraHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  return socket;
};

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

export const setupSocketListeners = (store: any, id: number) => {
  if (!socket) initSocket(id);
  
  socket.on('connect', () => {
    console.log('Socket connected');
    
    socket.on('message', (data) => {
      console.log("Получено сообщение", data);
      store.dispatch(chatApi.util.invalidateTags(['Messages']));
    });
  });

  socket.on('disconnect', () => {
    console.log("Socket disconnected");
  });
};