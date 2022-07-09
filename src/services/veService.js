import { httpService } from "./configURL";

export const veService = {
    layDanhSachVe: () => {
        return httpService.get(`/api/tickets`);
    },

    layThongTinChiTietVe: (idVe) => {
        return httpService.get(`/api/tickets/${idVe}`);
    },

    layDanhSachVeTheoNguoiDung: (idNguoiDung) => {
        return httpService.get(`/api/tickets/by-user?userId=${idNguoiDung}`);
    },

    layDanhSachVeTheoPhong: (idPhong) => {
        return httpService.get(`/api/tickets/by-room?roomId=${idPhong}`);
    },

    xoaVe: (idVe) => {
        return httpService.delete(`/api/tickets/${idVe}`);
    },

    taoVe: (dataForm) => {
        return httpService.post(`/api/tickets`, dataForm);
    },

    chinhSuaThongTinVe: (idVe, dataForm) => {
        return httpService.put(`/api/tickets/${idVe}`, dataForm);
    },
};