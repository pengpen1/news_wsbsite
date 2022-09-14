import { configureStore } from "@reduxjs/toolkit";

import pageVip_slice from "././slices/pageVip_slice";

export const store = configureStore({
  reducer: {
    pageVip: pageVip_slice,
  },
});
