import { ThongTinViTri } from "./ThongTinViTri";

export const ThongTinPhong = {
    bath: 0,
    bedRoom: 0,
    cableTV: true,
    deleteAt: false,
    description: "",
    dryer: true,
    elevator: false,
    guests: 0,
    gym: false,
    heating: true,
    hotTub: true,
    image: '',
    indoorFireplace: false,
    kitchen: true,
    locationId: {
        country: '',
        image: '',
        name: '',
        provice: '',
        valueate: 0,
        __v: '',
        _id: '',
        deleteAt: '',
    },
    name: '',
    pool: true,
    price: 0,
    wifi: true,
    __v: 0,
    _id: '',
};

export const DanhSachPhong = [ThongTinPhong];

export const ThongTinTimPhong = {
    idViTri: "",
    tenViTri: "",
    ngayNhanPhong: "",
    ngayTraPhong: "",
    khach: [],
};