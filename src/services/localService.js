const USER_INFO = "USER_INFO";

export const localStorageService = {
    setUserLocal: (data) => {
        let dataJson = JSON.stringify(data);
        localStorage.setItem(USER_INFO, dataJson);
    },
    getUserLocal: () => {
        let dataJson = localStorage.getItem(USER_INFO);
        if (dataJson) {
            return JSON.parse(dataJson);
        }
        return null;
    },
    removeUserLocal: () => {
        let dataJson = localStorage.getItem(USER_INFO);
        if (dataJson) {
            localStorage.removeItem(USER_INFO);
        }
    },
};

//Lưu thông tin đặt phòng tại search bar homepage vào localStorage
const SEARCH = "SEARCH_INFO";

export const localSearchStorageService = {
    setSearchInfoLocal: (data) => {
        let dataJson = JSON.stringify(data);
        localStorage.setItem(SEARCH, dataJson);
    },
    getSearchInfoLocal: () => {
        let dataJson = localStorage.getItem(SEARCH);
        if (dataJson) {
            return JSON.parse(dataJson);
        }
        return null;
    },
    removeSearchInfoLocal: () => {
        let dataJson = localStorage.getItem(SEARCH);
        if (dataJson) {
            localStorage.removeItem(SEARCH);
        }
    },
};
