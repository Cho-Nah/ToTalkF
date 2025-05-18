import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

type rawMesage = {message: string, chatId: number, sender: string}

export type MessageType = {
  sender: string;
  content: string;
  time: string;
};

let socket: WebSocket | null = null;
let messageListeners: Array<(message: MessageType) => void> = [];
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
      console.log(event.data);
    };
  }
  return connectionPromise;
};

export const chatApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    connect: builder.query<MessageType[], number>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        chatId,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
      ) {
        await initializeSocket(chatId);
        
        const messageHandler = (message: MessageType) => {
          updateCachedData((draft) => {
            draft.push(message);
          });
        };

        messageListeners.push(messageHandler);

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
      providesTags: (result) =>
        result
          ? [
              ...result.map(( _, idx ) => ({ type: 'Messages' as const, idx })),
              { type: 'Messages', id: 'LIST' }
            ]
          : [{ type: 'Messages', id: 'LIST' }],
    }),

    sendMessage: builder.mutation<void, rawMesage>({
      queryFn: async ({ message, chatId, sender }) => {
        await initializeSocket(chatId);
        
        return new Promise((resolve, reject) => {
          if (socket?.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ message, sender }));
            resolve({ data: undefined });
          } else {
            socket?.addEventListener('open', () => {
              socket?.send(JSON.stringify({ message, sender }));
              resolve({ data: undefined });
            }, { once: true });
          }
        });
      },
      invalidatesTags: [{ type: 'Messages', id: 'LIST' }],
    }),
  }),
});

// disconnect: builder.mutation<void, void>({
//   queryFn: () => {
//     return { data: undefined };
//   },
// }),