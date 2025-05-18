import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MessageType } from "../../app/services/ChatServise";

const initialState: MessageType[] = [];

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<MessageType[]>) {
      action.payload.forEach(msg => state.push(msg));
    },
  },
});

export const { setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;