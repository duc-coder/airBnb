import { httpService } from "./configURL";

export const phongService = {
  layDanhSachPhong: (idViTri = "") => {
    if (idViTri.trim() !== "") {
      return httpService.get(`/api/rooms/${idViTri}`);
    } else {
      return httpService.get(`/api/rooms`);
    }
  },
  layDanhSachPhongTuViTri: (idViTri) => {
    return httpService.get(`/api/rooms?locationId=${idViTri}`);
  },

  layThongTinChiTietPhong: (idPhong) => {
    return httpService.get(`/api/rooms/${idPhong}`);
  },

  xoaPhong: (idPhong) => {
    return httpService.delete(`/api/rooms/${idPhong}`);
  },

  taoPhong: (dataForm) => {
    return httpService.post(`/api/rooms`, dataForm);
  },

  capNhatHinhAnhChoPhong: (idPhong, dataForm) => {
    return httpService.post(`/api/rooms/upload-image/${idPhong}`, dataForm);
  },

  chinhSuaThongTinPhong: (idPhong, dataForm) => {
    return httpService.put(`/api/rooms${idPhong}`, dataForm);
  },

  datPhong: (dataForm) => {
    return httpService.post(`/api/rooms/booking`, dataForm);
  },
};
