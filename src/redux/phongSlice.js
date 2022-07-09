import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { phongService } from "../services/phongService";
import { DanhSachPhong, ThongTinPhong, ThongTinTimPhong } from "../_core/ThongTinPhong";
import { ThongTinViTri } from "../_core/ThongTinViTri";

let initialState = {
    danhSachPhong: DanhSachPhong,
    thongTinChiTietPhong: ThongTinPhong,
    isBookedSuccess: false,
};

//Lấy danh sách tất cả phòng tại mọi tỉnh thành
export let getDanhSachPhong = createAsyncThunk(
    "phongSlice/fetchDanhSachPhong",
    async (idViTri) => {
        try {
            let result = await phongService.layDanhSachPhong(idViTri);
            return result.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);
export const getRoomDetail = createAsyncThunk(
    "phongSlice/getRoomDetail",
    async (id, thunkAPI) => {
        try {
            const res = await phongService.layThongTinChiTietPhong(id);
            return res.data;
        } catch (err) {
            // const message = err.response.data.content;
            // thunkAPI.dispatch(setErrorMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);
export const bookRoom = createAsyncThunk(
    "phongSlice/bookRoom",
    async (data, thunkAPI) => {
        try {
            const res = await phongService.datPhong(data);
            // dispatch(res.)
            console.log(res);
            return res.data;
        } catch (err) {
            // const message = err.response.data.content;
            // thunkAPI.dispatch(setErrorMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);
const phongSlice = createSlice({
    name: "phongSlice",
    initialState: initialState,
    reducers: {
        layDanhSachPhong: (state, action) => {
            state.danhSachPhong = action.payload;
        },
        resetBookingStatus: (state, action) => {
            state.isBookedSuccess = false;
        },
    },
    extraReducers: {
        //Action xử lý lấy danh sách phòng theo id vị trí
        [getDanhSachPhong.pending]: (state, action) => {
            state.danhSachPhong = DanhSachPhong;
        },
        [getDanhSachPhong.fulfilled]: (state, action) => {
            state.danhSachPhong = action.payload;
        },
        [getDanhSachPhong.rejected]: (state, action) => { },
        [getRoomDetail.pending]: (state, action) => {
            state.thongTinChiTietPhong = {};
        },
        [getRoomDetail.fulfilled]: (state, action) => {
            state.thongTinChiTietPhong = action.payload;
        },
        [getRoomDetail.rejected]: (state, action) => { },
        [bookRoom.pending]: (state, action) => {
            state.isBookedSuccess = false;
        },
        [bookRoom.fulfilled]: (state, action) => {
            state.isBookedSuccess = true;
        },
    },
});

export const { layDanhSachPhong, resetBookingStatus } = phongSlice.actions;

export const selectDanhSachPhong = (state) => state.phongSlice.danhSachPhong;
export const selectThongTinChiTiePhong = (state) =>
    state.phongSlice.thongTinChiTiePhong;

export default phongSlice.reducer;
