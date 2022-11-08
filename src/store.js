import { configureStore } from "@reduxjs/toolkit";
import activeChatSlice from "./slices/activeChat";
export default configureStore({
  reducer: {
    activeChat: activeChatSlice,
  },
});
