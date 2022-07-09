import ThemeLayout from "../HOC/ThemeLayout/ThemeLayout";
import ChiTietPhongPage from "../pages/ChiTietPhongPage/ChiTietPhongPage";
import DangKyPage from "../pages/DangKyPage/DangKyPage";
import DangNhapPage from "../pages/DangNhapPage/DangNhapPage";
import DanhSachPhongPage from "../pages/DanhSachPhongPage/DanhSachPhongPage";
import HomePage from "../pages/HomePage/HomePage";
import NotFound from "../pages/NotFound/NotFound";
import ThongTinCaNhanPage from "../pages/ThongTinCaNhanPage/ThongTinCaNhanPage";

export const userRoutes = [
    {
        path: "/",
        component: <ThemeLayout Component={HomePage} />,
    },
    {
        path: "/user/:id",
        component: <ThemeLayout Component={ThongTinCaNhanPage} />,
    },
    {
        path: "/register",
        component: <ThemeLayout Component={DangKyPage} />,
    },
    {
        path: "/login",
        component: <ThemeLayout Component={DangNhapPage} />,
    },
    {
        path: "/rooms/:id",
        component: <ThemeLayout Component={ChiTietPhongPage} />,
        exact: true,
    },
    {
        path: "/search/:id",
        component: <ThemeLayout Component={DanhSachPhongPage} />,
    },

    {
        path: "*",
        component: <NotFound />,
    },
];
