import { httpService } from "./configURL"

export const viTriService = {
    layDanhSachViTri: () => {
        return httpService.get("/api/locations");
    },

    layThongTinChiTietViTri: (idViTri) => {
        return httpService.get(`/api/locations/${idViTri}`);
    },

    layDanhSachViTriTheoDanhGia: (danhGia) => {
        return httpService.get(`/api/locations/by-valueate?valueate=${danhGia}`);
    },

    xoaViTri: (idViTri) => {
        return httpService.get(`/api/locations/${idViTri}`);
    },

    taoViTri: (dataForm) => {
        return httpService.post(`/api/locations/`, dataForm);
    },

    capNhatAnhChoViTri: (idViTri, dataForm) => {
        return httpService.post(`/api/locations/upload-images/${idViTri}`, dataForm);
    },

    chinhSuaThongTinViTri: (idViTri, dataForm) => {
        return httpService.put(`/api/locations/${idViTri}`, dataForm);
    },
};