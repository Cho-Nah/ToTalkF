import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

type rawMesage = {message: string, chatId: number, sender: string}

type Message = {
  sender: string;
  content: string;
};

let socket: WebSocket | null = null;
let messageListeners: Array<(message: Message[]) => void> = [];
let connectionPromise: Promise<void> | null = null;

const initializeSocket = (chatId: number) => {
  if (!socket) {
    // const token = localStorage.getItem("token");
    socket = new WebSocket(`ws://localhost:8081/ws/${chatId}`);
    //?token=${encodeURIComponent(token || "")}

    connectionPromise = new Promise((resolve, reject) => {
      socket!.onopen = () => resolve();
      socket!.onerror = (error) => reject(error);
    });

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      messageListeners.forEach(listener => listener(message));
    };
  }
  return connectionPromise;
};

export const chatApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    connect: builder.query<Message[], number>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        chatId,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        await initializeSocket(chatId);
        
        const messageHandler = (message: Message[]) => {
          updateCachedData((draft) => {
            console.log(message);
            draft = message;
          });
        };

        // messageListeners.push(messageHandler);

        try {
          await cacheDataLoaded;
          await cacheEntryRemoved;
        } finally {
          messageListeners = messageListeners.filter(l => l !== messageHandler);
          
          if (messageListeners.length === 0 && socket) {
            socket.close();
            socket = null;
            connectionPromise = null;
          }
        }
      },
      providesTags: ['Messages'],
    }),

    sendMessage: builder.mutation<void, rawMesage>({
      queryFn: async ({ message, chatId, sender }) => {
        await initializeSocket(chatId);
        
        return new Promise((resolve, reject) => {
          if (socket?.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ message, sender }));
            resolve({ data: undefined });
          }
        });
      },
      invalidatesTags: ['Messages'],
    }),
  }),
});

// disconnect: builder.mutation<void, void>({
//   queryFn: () => {
//     // В реальной реализации нужно хранить активные соединения
//     // и закрывать их здесь
//     return { data: undefined };
//   },
// }),