import { configureStore } from "@reduxjs/toolkit";
import tweetSlice from "./tweetSlice";

const store = configureStore({
  reducer: {
    tweetsSlice: tweetSlice.reducer,
  },
});

export default store;