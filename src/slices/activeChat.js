import { createSlice } from "@reduxjs/toolkit";

export const activeChatSlice = createSlice({
  name: "activeChat",
  initialState: {
    value: null,
  },
  reducers: {
    activeChat: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { activeChat } = activeChatSlice.actions;

export default activeChatSlice.reducer;
