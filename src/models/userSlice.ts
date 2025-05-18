import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "./user";

const initialState: IUser = {
  name: "",
  role: "",
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setRole(state, action: PayloadAction<string>) {
      state.role = action.payload;
    },
  },
});

export const { setName, setRole } = userSlice.actions;
export default userSlice.reducer;