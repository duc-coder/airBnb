import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { trim } from "lodash";
import { danhGiaService } from "../services/danhGiaService";
import { DanhSachDanhGia, ThongTinDanhGia } from "../_core/ThongTinDanhGia";
import { DanhSachPhong, ThongTinPhong } from "../_core/ThongTinPhong";
import { ThongTinViTri } from "../_core/ThongTinViTri";

let initialState = {
    danhSachDanhGia: DanhSachDanhGia,
    thongTinChiDanhGia: ThongTinDanhGia,
};

//Lấy danh sách đánh giá của phòng cụ thể
export let getDanhSachDanhGiaPhong = createAsyncThunk(
    "danhGiaSlice/fetchDanhSachDanhGiaTheoPhong",
    async (idPhong) => {
        try {
            let result = await danhGiaService.layDanhSachDanhGiaTheoPhong(
                idPhong
            );
            const rawData = result.data;
            let filterBlankComment = result.data;
            filterBlankComment = filterBlankComment.filter((comment) => {
                return comment.content != "";
            });
            filterBlankComment.sort(function compare(a, b) {
                var dateA = new Date(a.created_at);
                var dateB = new Date(b.created_at);
                return dateB - dateA;
            });
            // console.log(rawData);
            return filterBlankComment;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
);

const danhGiaSlice = createSlice({
    name: "danhGiaSlice",
    initialState: initialState,
    reducers: {
        layDanhSachDanhGia: (state, action) => {
            state.danhSachDanhGia = action.payload;
        },
    },
    extraReducers: {
        //Action xử lý lấy danh sách đánh giá theo id phòng
        [getDanhSachDanhGiaPhong.pending]: (state, action) => {
            state.danhSachDanhGia = DanhSachDanhGia;
        },
        [getDanhSachDanhGiaPhong.fulfilled]: (state, action) => {
            state.danhSachDanhGia = action.payload;
        },
        [getDanhSachDanhGiaPhong.rejected]: (state, action) => {},
    },
});

export const { layDanhSachDanhGia } = danhGiaSlice.actions;

export const selectDanhSachDanhGia = (state) =>
    state.danhGiaSlice.danhSachDanhGia;
export const selectThongTinChiDanhGia = (state) =>
    state.danhGiaSlice.thongTinChiDanhGia;

export default danhGiaSlice.reducer;
