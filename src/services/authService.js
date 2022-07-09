import { httpService } from "./configURL";
import { localStorageService } from "./localService";
export const authService = {
  dangNhap: (dataDangNhap) => {
    return httpService.post(`/api/auth/login`, dataDangNhap);
  },

  dangKy: (dataDangKy) => {
    return httpService.post(`/api/auth/register`, dataDangKy);
  },
  dangXuat: () => {
    localStorageService.removeUserLocal();
  },
};
