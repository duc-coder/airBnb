import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { authService } from "../services/authService";
import { localStorageService } from "../services/localService";
import { uploadAnhNguoiDung } from "./nguoiDungSlice";

let initialState = {};
const setupInitialState = () => {
  let userLogin = localStorageService.getUserLocal();
  let isLoggedIn = false;
  if (userLogin) {
    isLoggedIn = true;
  }
  initialState = {
    userLogin: userLogin?.user,
    isLoggedIn: isLoggedIn,
    isRegisterred: false,
    accessToken: userLogin?.accessToken,
  };
};
setupInitialState();

export const postDataDangKy = createAsyncThunk(
  "authSlice/fetchDataDangKy",
  async (dataDangKy, thunkAPI) => {
    try {
      const result = await authService.dangKy(dataDangKy);
      message.success("Đăng ký thành công");
      return result.data.content;
    } catch (error) {
      message.error(error.response.data.message);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const postDataDangNhap = createAsyncThunk(
  "authSlice/fetchDataDangNhap",
  async (dataDangNhap, thunkAPI) => {
    try {
      const result = await authService.dangNhap(dataDangNhap);
      message.success(result.data.message);
      localStorageService.setUserLocal({
        accessToken: result.data.token,
        user: result.data.user,
      });
      return { accessToken: result.data.token, user: result.data.user };
    } catch (error) {
      message.error(error.response.data.message);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    dangXuat: (state, { payload }) => {
      state.accessToken = null;
      state.userLogin = null;
      state.isLoggedIn = false;
      state.isRegisterred = false;
    },
  },
  extraReducers: {
    [postDataDangKy.fulfilled]: (state) => {
      state.isRegisterred = true;
    },
    [postDataDangKy.rejected]: (state) => {
      state.isRegisterred = false;
    },
    [postDataDangKy.pending]: (state) => {
      state.isRegisterred = false;
    },
    [postDataDangNhap.fulfilled]: (state, { payload }) => {
      let { accessToken, user } = payload;
      state.isLoggedIn = true;
      state.isRegisterred = false;
      state.userLogin = user;
      state.accessToken = accessToken;
    },
    [postDataDangNhap.rejected]: (state) => {
      state.isLoggedIn = false;
      state.isRegisterred = false;
    },
    [postDataDangNhap.pending]: (state) => {
      state.isLoggedIn = false;
      state.isRegisterred = false;
    },
    [uploadAnhNguoiDung.fulfilled]: (state, { payload }) => {
      state.userLogin = payload;
    },
  },
});

export const dangXuat = createAction("authSlice/dangXuat", () => {
  authService.dangXuat();
  return {
    payload: {},
  };
});

export default authSlice.reducer;
