import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { io } from "socket.io-client";

const socket = io("wss://localhost:3001");

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
    getMessage: builder.query({
      query: () => "getMessage",
    }),
    sendMessage: builder.mutation<void, string>({
      // заменить на реальные значения
      // Определяем функцию, которая будет отправлять сообщение на сервер
      query: (message) => {
        // Отправляем сообщение через сокет
        socket.emit("sendMessage", { message });
      },
      invalidatesTags: ["Messages"],
      onQueryStarted: () => {
        console.log("Sending message...");
      },
    }),
  }),
});

socket.on("connect", () => {
  console.log("[WS Service]: connected to server");
});

socket.on("newMessage", (data) => {
  // messageApi.endpoints.getMessage.invalidate(); // Обновляем данные RTK Query при получении новых сообщений
});

// export const { useGetMessageQuery, useSendMessageMutation } = messageApi;
