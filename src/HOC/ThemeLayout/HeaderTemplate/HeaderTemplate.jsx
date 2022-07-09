import { Tabs, DatePicker, Popover, Menu, message, Form } from "antd";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import {
    faBars,
    faGlobe,
    faMagnifyingGlass,
    faMinus,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userPic from "../../../assets/img/user_pic.png";
import styled from "../css/HeaderTemplate.css";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "antd/lib/menu/MenuItem";
import {
    getDanhSachViTri,
    selectDanhSachViTri,
} from "../../../redux/viTriSlice";
import { localSearchStorageService } from "../../../services/localService";
import { dangXuat } from "../../../redux/authSlice";
import { selectThongTinTimPhong, setBookingDate, setBookingLocation, setCustomerInfo, setTotalCustomer } from "../../../redux/bookingRoomSlice";
import moment from "moment";
import _ from 'lodash';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const dateFormat = "DD/MM/YYYY";

const TangSoLuong = 1;
const GiamSoLuong = -1;

export default function HeaderTemplate() {
    const { userLogin } = useSelector((state) => state.authSlice);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        //Gọi API lấy danh sách tất cả vị trí
        dispatch(getDanhSachViTri());
    }, []);

    let danhSachViTri = useSelector(selectDanhSachViTri);

    //Quy định phân loại khách
    let DanhSachLoaitKhach = [
        {
            CustomerType: "Người lớn",
            Description: "Từ 13 tuổi trở lên",
        },
        {
            CustomerType: "Trẻ em",
            Description: "Độ tuổi 2 - 12",
        },
        {
            CustomerType: "Em bé",
            Description: "Dưới 2 tuổi",
        },
        {
            CustomerType: "Thú cưng",
            Description: "Mang theo động vật cần được phục vụ?",
        },
    ];

    //Lấy thông tin tìm phòng của người dùng từ localSearchStorage
    let ThongTinTimPhong = useSelector(selectThongTinTimPhong);
    console.log(ThongTinTimPhong);

    //Form lưu trữ thông tin tìm kiếm phòng khách nhập tại search bar
    let [datPhong, setDatPhong] = useState({
        bookingLocation: {
            idLocation: "",
            locationName: "",
        },
        bookingDate: {
            checkIn: null,
            checkOut: null,
        },
        customerInfo: DanhSachLoaitKhach.map((khach, index) => {
            return {
                customerType: khach.CustomerType,
                quantity: 0,
            };
        }),
        totalCustomer: 0,
    });
    //Truyền value từ redux state bookingRoomSlice vào state search bar
    if (ThongTinTimPhong.bookingLocation.locationName.trim() !== '') {
        let updateBookingDate = {
            checkIn: moment(ThongTinTimPhong.bookingDate.checkIn, dateFormat),
            checkOut: moment(ThongTinTimPhong.bookingDate.checkOut, dateFormat),
        };
        setBookingDate(
            datPhong.bookingLocation = ThongTinTimPhong.bookingLocation,
            datPhong.bookingDate = updateBookingDate,
            datPhong.customerInfo = ThongTinTimPhong.customerInfo,
            datPhong.totalCustomer = ThongTinTimPhong.totalCustomer,
        );
    };

    //Điều khiển hiển thị popover menu người dùng
    const [visible, setVisible] = useState(false);
    const hide = () => {
        setVisible(false);
    };
    const handleVisibleChange = (newVisible) => {
        setVisible(newVisible);
    };

    //Render danh sách tất cả vị trí trong search bar
    const renderDanhSachViTri = () => {
        return danhSachViTri.map((viTri, index) => {
            return (
                <p
                    key={index}
                    className="cursor-pointer hover:bg-neutral-200"
                    onClick={() => {
                        setDatPhong({
                            ...datPhong,
                            bookingLocation: {
                                idLocation: viTri._id,
                                locationName: viTri.name,
                            },
                        });
                    }}
                >
                    {viTri.name} | {viTri.province}
                </p>
            );
        });
    };

    //Truyền content vào popover địa điểm trong search bar
    const contentViTri = (
        <div className="h-52 overflow-y-scroll">{renderDanhSachViTri()}</div>
    );

    //Nhận giá trị từ ô input ngày nhận/trả phòng
    const onChangeDatePicker = (key, dateString) => {
        let CheckIn = dateString[0]; //moment(key[0]).format(dateFormat);
        let CheckOut = dateString[1]; //moment(key[1]).format(dateFormat);
        setDatPhong({
            ...datPhong,
            bookingDate: {
                checkIn: CheckIn,
                checkOut: CheckOut,
            },
        });
    };

    //Truyền value từ localSearchStorage vào RangePicker ngày nhận/trả phòng
    let DatePickerInitialValue = [
        datPhong.bookingDate.checkIn,
        datPhong.bookingDate.checkOut,
    ];

    //Hàm cho người dùng chọn số lượng từng loại khách trong search bar
    const ThayDoiSoLuongLoaiKhach = (CustomerType, giaTri) => {
        let indexCustomerType = datPhong.customerInfo.findIndex((item) => { //Tìm index object loại khách đang thay đổi số lượng
            return item.customerType === CustomerType;
        });
        if (indexCustomerType !== -1) { //Thay đổi số lượng loại khách đã xác định
            let updateCustomerNumber = [...datPhong.customerInfo];
            updateCustomerNumber[indexCustomerType].quantity += giaTri;
            if (updateCustomerNumber[indexCustomerType].quantity < 0) {
                updateCustomerNumber[indexCustomerType].quantity = 0;
            };
            setDatPhong({
                ...datPhong,
                customerInfo: updateCustomerNumber,
            });
        };
        setDatPhong({ //Tính tổng số lượng tất cả các loại khách
            ...datPhong,
            totalCustomer: datPhong.customerInfo.reduce((total, item) => {
                return (total += item.quantity);
            }, 0),
        });
    };
    //Render popover chọn số lượng từng loại khách trong search bar
    const renderLoaiKhach = () => {
        return DanhSachLoaitKhach.map((Khach, index) => {
            let soLuongLoaiKhach = () => { //Render số lượng hiện tại của từng loại khách
                for (let key in datPhong.customerInfo) {
                    if (datPhong.customerInfo[key].customerType === Khach.CustomerType) {
                        return datPhong.customerInfo[key].quantity;
                    }
                }
            };
            return (
                <div
                    key={index}
                    className="w-full mb-2 grid grid-cols-3 border-solid border-0 border-b border-b-neutral-300 pb-2"
                >
                    <div className="col-span-2 flex flex-wrap align-middle">
                        <p className="w-full my-auto font-bold">{Khach.CustomerType}</p>
                        <p className="w-full my-auto">{Khach.Description}</p>
                    </div>
                    <div className="col-span-1 ml-3 flex justify-between items-center">
                        <button
                            className="w-8 h-8 rounded-full cursor-pointer border border-neutral-300 active:shadow-lg active:bg-neutral-300"
                            onClick={() => {
                                ThayDoiSoLuongLoaiKhach(Khach.CustomerType, GiamSoLuong);
                            }}
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <p className="my-auto">{soLuongLoaiKhach()}</p>
                        <button
                            className="w-8 h-8 rounded-full cursor-pointer border border-neutral-300 active:shadow-lg active:bg-neutral-300"
                            onClick={() => {
                                ThayDoiSoLuongLoaiKhach(Khach.CustomerType, TangSoLuong);
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
            );
        });
    };

    //Truyền content vào popover chọn số lượng từng loại khách trong search bar
    const contentLoaitKhach = <div className="w-full">{renderLoaiKhach()}</div>;

    //Hàm xử lý đăng xuất cho người dùng
    let handleLogout = () => {
        dispatch(dangXuat());
        navigate("/");
    };

    //Truyền content vào popover menu người dùng
    const contentMenuBar = (
        <Menu className="w-52">
            {userLogin ? (
                <MenuItem className="w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300">
                    <Link to={`/user/${userLogin._id}`}>Tài khoản</Link>
                </MenuItem>
            ) : (
                <>
                    <MenuItem className="w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300">
                        <Link to={"/register"}>Đăng ký</Link>
                    </MenuItem>
                    <MenuItem className="w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300">
                        <Link to={"/login"}>Đăng nhập</Link>
                    </MenuItem>
                </>
            )}
            <MenuItem className="w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300">
                <Link to={"/"}>Cho thuê nhà</Link>
            </MenuItem>
            <MenuItem className="w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300">
                <Link to={"/"}>Tổ chức trải nghiệm</Link>
            </MenuItem>
            {userLogin ? (
                <MenuItem
                    onClick={() => handleLogout()}
                    className="w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300"
                >
                    Đăng xuất
                </MenuItem>
            ) : (
                ""
            )}
        </Menu>
    );

    //Nhận thông tin người dùng nhập vào search bar & xử lý lưu trữ sử dụng
    const handleSearch = () => {
        if (datPhong.bookingLocation.idLocation.trim() !== "") {
            //Lưu trữ thông tin tìm phòng vào redux bookingRoomSlice
            dispatch(setBookingDate(datPhong.bookingDate));
            dispatch(setBookingLocation(datPhong.bookingLocation));
            dispatch(setCustomerInfo(datPhong.customerInfo));
            dispatch(setTotalCustomer(datPhong.totalCustomer));

            localSearchStorageService.setSearchInfoLocal(datPhong); //Lưu trữ thông tin tìm phòng vào localStorage SEARCH_INFO

            setDatPhong({ //Set lại state rỗng trước khi nhận props value mới
                bookingLocation: {
                    idLocation: "",
                    locationName: "",
                },
                bookingDate: {
                    checkIn: null,
                    checkOut: null,
                },
                customerInfo: DanhSachLoaitKhach.map((khach, index) => {
                    return {
                        customerType: khach.CustomerType,
                        quantity: 0,
                    };
                }),
                totalCustomer: 0,
            });

            //Chuyển trang danh sách phòng với vị trí chọn từ người dùnng
            navigate(`/search/${datPhong.bookingLocation.idLocation}`);
        } else {
            message.error("Vui lòng chọn địa điểm bạn muốn tìm phòng");
        }
    };

    return (
        <div className="header w-full pt-5 pb-5 bg-white shadow-md">
            <div className="header-container w-11/12 mx-auto grid grid-cols-12">
                <Link to={"/"}>
                    <div className="col-span-1 cursor-pointer">
                        <img className="w-full" src="../img/airbnb-logo3.png" />
                    </div>
                </Link>
                <div className="search-bar-container col-span-8 w-full ml-10">
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Chỗ ở" key="1">
                            <div className="search-bar-container">
                                <div className="search-bar-inner w-full grid grid-cols-12 bg-gray-100 rounded-full border-solid border border-neutral-300">
                                    <Popover
                                        className="location-input-block col-span-5 h-16 rounded-full px-5 py-2 cursor-pointer"
                                        content={contentViTri}
                                        title="Tìm kiếm phòng theo khu vực"
                                        trigger="focus"
                                    >
                                        <label className="location-input-name w-full font-bold pointer-events-none">
                                            Địa điểm
                                        </label>
                                        <input
                                            value={datPhong.bookingLocation.locationName}
                                            className="location-input w-full bg-transparent border-none focus:outline-none"
                                            placeholder="Tìm kiếm phòng theo khu vực"
                                        />
                                    </Popover>
                                    <div className="date-input-block col-span-4 h-16 bg-transparent cursor-pointer flex flex-row flex-wrap items-stretch relative">
                                        <div className="date-input-item w-6/12 py-2 relative">
                                            <span className="date-input-name w-full absolute z-20 font-bold flex items-start justify-center pointer-events-none">
                                                Nhận phòng
                                            </span>
                                        </div>
                                        <div className="date-input-item w-6/12 py-2 relative">
                                            <span className="date-input-name w-full absolute z-20 font-bold flex items-start justify-center pointer-events-none">
                                                Trả phòng
                                            </span>
                                        </div>
                                        <RangePicker
                                            className="date-picker-container"
                                            format={dateFormat}
                                            onChange={onChangeDatePicker}
                                            defaultValue={
                                                datPhong.bookingDate.checkIn !== null && datPhong.bookingDate.checkOut !== null
                                                    ? DatePickerInitialValue
                                                    : ''
                                            }
                                        />
                                    </div>
                                    <div className="col-span-3 h-16 px-2 rounded-full flex justify-between cursor-pointer hover:bg-gray-200">
                                        <Popover
                                            overlayClassName="rounded-lg"
                                            className="pl-3 py-2 w-full bg-transparent border-none"
                                            content={contentLoaitKhach}
                                            trigger="click"
                                        >
                                            <label className="w-full font-bold pointer-events-none">
                                                Khách
                                            </label>
                                            {datPhong.totalCustomer > 0 ? (
                                                <p className="w-full text-gray-800 pointer-events-none">
                                                    {datPhong.totalCustomer}{" "}
                                                    khách
                                                </p>
                                            ) : (
                                                <p className="w-full text-gray-400 pointer-events-none">
                                                    Chọn khách
                                                </p>
                                            )}
                                        </Popover>
                                        <button
                                            className="rounded-full w-14 h-12 my-auto border-none bg-rose-500 text-white cursor-pointer z-50 active:bg-rose-700 active:shadow-lg"
                                            onClick={() => {
                                                handleSearch();
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                className="pointer-events-none"
                                                icon={faMagnifyingGlass}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="Trải nghiệm" key="2">
                            <div className="search-bar-container">
                                <div className="search-bar-inner w-full grid grid-cols-12 bg-gray-100 rounded-full border-solid border border-neutral-300">
                                    <Popover
                                        className="location-input-block col-span-5 h-16 rounded-full px-5 py-2 cursor-pointer"
                                        content={contentViTri}
                                        title="Tìm kiếm phòng theo khu vực"
                                        trigger="focus"
                                    >
                                        <label className="location-input-name w-full font-bold pointer-events-none">
                                            Địa điểm
                                        </label>
                                        <input
                                            value={datPhong.bookingLocation.locationName}
                                            className="location-input w-full bg-transparent border-none focus:outline-none"
                                            placeholder="Tìm kiếm phòng theo khu vực"
                                        />
                                    </Popover>
                                    <div className="date-input-block col-span-4 h-16 bg-transparent cursor-pointer flex flex-row flex-wrap items-stretch relative">
                                        <div className="date-input-item w-6/12 py-2 relative">
                                            <span className="date-input-name w-full absolute z-20 font-bold flex items-start justify-center pointer-events-none">
                                                Nhận phòng
                                            </span>
                                        </div>
                                        <div className="date-input-item w-6/12 py-2 relative">
                                            <span className="date-input-name w-full absolute z-20 font-bold flex items-start justify-center pointer-events-none">
                                                Trả phòng
                                            </span>
                                        </div>
                                        <RangePicker
                                            className="date-picker-container"
                                            format={dateFormat}
                                            onChange={onChangeDatePicker}
                                        />
                                    </div>
                                    <div className="col-span-3 h-16 px-2 rounded-full flex justify-between cursor-pointer hover:bg-gray-200">
                                        <Popover
                                            overlayClassName="rounded-lg"
                                            className="pl-3 py-2 w-full bg-transparent border-none"
                                            content={contentLoaitKhach}
                                            trigger="click"
                                        >
                                            <label className="w-full font-bold pointer-events-none">
                                                Khách
                                            </label>
                                            {datPhong.totalCustomer > 0 ? (
                                                <p className="w-full text-gray-800 pointer-events-none">
                                                    {datPhong.totalCustomer}{" "}
                                                    khách
                                                </p>
                                            ) : (
                                                <p className="w-full text-gray-400 pointer-events-none">
                                                    Chọn khách
                                                </p>
                                            )}
                                        </Popover>
                                        <button
                                            className="rounded-full w-14 h-12 my-auto border-none bg-rose-500 text-white cursor-pointer z-50 active:bg-rose-700 active:shadow-lg"
                                            onClick={() => {
                                                handleSearch();
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                className="pointer-events-none"
                                                icon={faMagnifyingGlass}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
                <div className="col-span-3 flex justify-end">
                    <div>
                        <button
                            type="button"
                            className="bg-inherit border-none cursor-pointer text-base px-4 h-10 rounded-full hover:bg-gray-100"
                        >
                            Trở thành chủ nhà
                        </button>
                    </div>
                    <div className="mx-3">
                        <button className="bg-inherit border-none cursor-pointer text-base w-10 h-10 rounded-full hover:bg-gray-100">
                            <FontAwesomeIcon icon={faGlobe} />
                        </button>
                    </div>
                    <div>
                        <Popover
                            className="w-20 h-10 rounded-full cursor-pointer flex justify-between pl-3 pr-1 items-center bg-white border-solid border border-neutral-300 hover:shadow-lg"
                            content={<a onClick={hide}>{contentMenuBar}</a>}
                            trigger="click"
                            visible={visible}
                            onVisibleChange={handleVisibleChange}
                        >
                            <FontAwesomeIcon
                                className="text-base"
                                icon={faBars}
                            />
                            {userLogin ? (
                                <img
                                    style={{ width: 35, height: 35 }}
                                    className="rounded-full"
                                    src={
                                        userLogin.avatar
                                            ? userLogin.avatar
                                            : userPic
                                    }
                                    alt="user-avatar"
                                />
                            ) : (
                                <FontAwesomeIcon
                                    className="text-3xl"
                                    icon={faCircleUser}
                                />
                            )}
                        </Popover>
                    </div>
                </div>
            </div>
        </div>
    );
}
