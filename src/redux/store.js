import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import danhGiaSlice from "./danhGiaSlice";
import nguoiDungSlice from "./nguoiDungSlice";
import danhSachPhongSlice from "./danhSachPhongSlice";
import phongSlice from "./phongSlice";
import viTriSlice from "./viTriSlice";
import chiTietPhongSlice from "./chiTietPhongSlice";

export const store = configureStore({
    reducer: {
        viTriSlice: viTriSlice,
        phongSlice: phongSlice,
        danhGiaSlice: danhGiaSlice,
        nguoiDungSlice: nguoiDungSlice,
        authSlice,
        danhSachPhongSlice,
        chiTietPhongSlice,
    },
});
