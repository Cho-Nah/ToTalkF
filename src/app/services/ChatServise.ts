import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

type rawMesage = {message: string, chatId: number, sender: string}

type Message = {
  id: number;
  sender: string,
  content: string;
};

export const chatApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
  connect: builder.query<Message[], number>({
  queryFn: () => ({ data: [] }), // Инициализируем пустым массивом
    async onCacheEntryAdded(
      chatId,
      { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
    ) {
      const token = localStorage.getItem("token");
      const socket = new WebSocket(`ws://localhost:8081/ws/${chatId}?token=${encodeURIComponent(token || "")}`);

      // Создаем буфер для сообщений на случай, если кэш еще не готов
      let messageBuffer: Message[] = [];
      let isCacheReady = false;

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data) as Message;
        
        if (isCacheReady) {
          updateCachedData((draft) => {
            draft.push(message); // Добавляем новое сообщение
          });
        } else {
          messageBuffer.push(message); // Сохраняем в буфер
        }
      }

      try {
        await cacheDataLoaded;
        isCacheReady = true;
        
        // Применяем все сообщения из буфера
        if (messageBuffer.length > 0) {
          updateCachedData((draft) => {
            draft.push(...messageBuffer);
          });
          messageBuffer = [];
        }

        await cacheEntryRemoved;
        } finally {
          socket.close();
        }
      },
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Messages' as const, id })), 'Messages']
          : ['Messages'],
      }
    ),

    sendMessage: builder.mutation<void, rawMesage>({
      queryFn: async ({message, chatId, sender}) => {
        const token = localStorage.getItem("token");
        const socket = new WebSocket(`ws://localhost:8081/ws/${chatId}`);

        return new Promise((resolve) => {
          socket.onopen = () => {
            socket.send(JSON.stringify({ message: message, sender: sender}));
            // socket.close();
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