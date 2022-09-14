import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gotoHome: false,
};

export const PageVipSlice = createSlice({
  name: "pageVip",
  initialState,
  reducers: {
    // 记得登录后将状态调回false
    gotoHomeIsTrue: (state) => {
      state.gotoHome = true;
    },
    gotoHomeIsFalse: (state) => {
      state.gotoHome = false;
    },
  },
});

// 为每个 case reducer 函数生成动作创建者
export const { gotoHomeIsFalse, gotoHomeIsTrue } = PageVipSlice.actions;

export default PageVipSlice.reducer;
