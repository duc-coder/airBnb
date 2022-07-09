import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { localStorageService } from "../services/localService";
import { userService } from "../services/userService";
import { ThongTinNguoiDung } from "../_core/ThongTinNguoiDung";

let initialState = {
    thongTinNguoiDung: ThongTinNguoiDung,
    formChinhSuaHoSoOpen: false,
};

//Lấy thông tin chi tiết người dùng theo id người dùng
export const getThongTinNguoiDung = createAsyncThunk(
    'nguoiDungSlice/fetchThongTinChiTiet',
    async (idNguoiDung) => {
        try {
            let result = await userService.layThongTinChiTietNguoiDung(idNguoiDung);
            return result.data;
        } catch (error) {
            return error;
        }
    }
);

//Upload ảnh đại diện người dùng
export const uploadAnhNguoiDung = createAsyncThunk(
    'nguoiDungSlice/uploadAnhNguoiDung',
    async (formData) => {
        try {
            let result = await userService.capNhatAnhDaiDienNguoiDung(formData)
            localStorageService.setUserLocal({
                accessToken: localStorageService.getUserLocal().accessToken,
                user: result.data,
            });
            message.success('Upload ảnh người dùng thành công!');
            return result.data;
        } catch (error) {
            return error;
        }
    }
);

const nguoiDungSlice = createSlice({
    name: "nguoiDungSlice",
    initialState: initialState,
    reducers: {
        layThongTinNguoiDung: (state, action) => {
            state.thongTinNguoiDung = action.payload;
        },
        hienThiFormChinhSuaHoSo: (state, action) => {
            state.formChinhSuaHoSoOpen = true;
        },
        anFormChinhSuaHoSo: (state, action) => {
            state.formChinhSuaHoSoOpen = false;
        },
    },
    extraReducers: {
        //Action xử lý lấy thông tin chi tiết người dùng theo id người dùng
        [getThongTinNguoiDung.pending]: (state, action) => {
            state.ThongTinNguoiDung = ThongTinNguoiDung;
        },
        [getThongTinNguoiDung.fulfilled]: (state, action) => {
            state.thongTinNguoiDung = action.payload;
        },
        [getThongTinNguoiDung.rejected]: (state, action) => { },
    },
});

export const { layThongTinNguoiDung, hienThiFormChinhSuaHoSo, anFormChinhSuaHoSo } = nguoiDungSlice.actions;

export const selectThongTinNguoiDung = (state) => state.nguoiDungSlice.thongTinNguoiDung;
export const selectFormChinhSuaHoSoOpen = (state) => state.nguoiDungSlice.formChinhSuaHoSoOpen;

export default nguoiDungSlice.reducer;