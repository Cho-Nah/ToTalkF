import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IEvent } from "../../models/event";

const initialState: IEvent[] = [];

export const userSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction<IEvent>) {
      state.push(action.payload);
    },
    setSelectedSLots(state, action: PayloadAction<{name: string, slots: number}>) {
      state.find(event => event.name === action.payload.name)!.slots = action.payload.slots;
    },
    setQueue(state, action: PayloadAction<{name: string, queue: number}>) {
      state.find(event => event.name === action.payload.name)!.inQueue = action.payload.queue;
    }
  },
});

export const { setEvents, setSelectedSLots, setQueue } = userSlice.actions;
export default userSlice.reducer;