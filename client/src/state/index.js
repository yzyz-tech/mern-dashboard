import { createSlice } from "@reduxjs/toolkit";

// 初始状态
const initialState ={ 
  mode: "dark",
  userId: "63701cc1f03239b7f700000e"
};

// 全局状态
export const globalSlice = createSlice(  {
    name: "global", 
    initialState,
    reducers: {
      // 改变模式的函数
      setMode:(state) => { 
        state.mode = state.mode === 'light' ? 'dark' : 'light';
      }
    }
  })

  export const {setMode} = globalSlice.actions;

  export default globalSlice.reducer;
