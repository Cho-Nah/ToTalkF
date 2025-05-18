import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MessageType } from "../../app/services/ChatServise";

const initialState: MessageType[] = [];

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<MessageType>) {
      state.push(action.payload);
    },
  },
});

export const { setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;