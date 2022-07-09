import { httpService } from "./configURL";

export const danhGiaService = {
    layDanhSachDanhGiaTheoPhong: (idPhong) => {
        return httpService.get(`/api/reviews/byRoom?roomId=${idPhong}`);
    },

    layThongTinChiTietDanhGia: (idDanhGia) => {
        return httpService.get(`/api/reviews/${idDanhGia}`);
    },

    xoaDanhGia: (idDanhGia) => {
        return httpService.delete(`/api/reviews/${idDanhGia}`);
    },

    taoDanhGia: (idPhong, dataForm) => {
        return httpService.post(`/api/reviews?roomId=${idPhong}`, dataForm);
    },

    chinhSuaDanhGia: (idDanhGia, dataForm) => {
        return httpService.put(`/api/reviews/${idDanhGia}`, dataForm);
    },
};