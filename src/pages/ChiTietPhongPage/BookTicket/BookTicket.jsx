import React, { useState } from "react";
import { convertLocaleString } from "../../../utils/stringFormatUtils";
import RangeDatePicker from "../RangeDatePicker/RangeDatePicker";
import ChooseCustomer from "../../../components/ChooseCustomer/ChooseCustomer";
import { useDispatch, useSelector } from "react-redux";
import {
    setBookingDate,
    setCustomerInfo,
    setBookingStatus,
} from "../../../redux/bookingRoomSlice";
import { countDays } from "../../../utils/timeMomentUtils";
import { useEffect } from "react";
export default function BookTicket({
    thongTinChiTietPhong = {},
    scrollTo = () => {},
    commentListSize = 0,
}) {
    const dispatch = useDispatch();
    const { bookingDate, customerInfo } = useSelector(
        (state) => state.bookingRoomSlice
    );
    const { accessToken } = useSelector((state) => state.authSlice);
    // const { daysOfBooking, bookingDate, customerInfo } = useSelector(
    //     (state) => state.chiTietPhongSlice
    // );
    const [daysOfBooking, setDaysOfBooking] = useState(0);
    const [ableToBook, setAbleToBook] = useState(true);
    const [totalCustomers, setTotalCustomers] = useState(0);
    useEffect(() => {
        setDaysOfBooking(
            countDays(bookingDate?.checkIn, bookingDate?.checkOut)
        );
    }, [bookingDate]);

    useEffect(() => {
        let isAbleToBook = false;
        if (
            accessToken &&
            bookingDate?.checkIn != "" &&
            bookingDate?.checkOut != "" &&
            totalCustomers != 0
        )
            isAbleToBook = true;
        setAbleToBook(isAbleToBook);
    }, [bookingDate, accessToken, totalCustomers]);
    useEffect(() => {
        // console.log({ ableToBook });
    }, [ableToBook]);
    const countTotalCost = () => {
        return daysOfBooking * thongTinChiTietPhong.price;
    };
    const handleChooseCustomer = (totalCustomer, customerList) => {
        setTotalCustomers(totalCustomer);
        const customerDataWithoutIndex = customerList.map((customerItem) => {
            return {
                ten: customerItem.ten,
                moTa: customerItem.moTa,
                soLuong: customerItem.soLuong,
            };
        });
        dispatch(setCustomerInfo(customerDataWithoutIndex));
        // console.log(totalCustomer, customerDataWithoutIndex);
    };
    const handleBooking = () => {
        // const bookingData = {
        //     roomId: id,
        //     ...bookingTime,
        // };
        // console.log(bookingData);
        // dispatch(bookRoom(bookingData));
    };
    const onDatePickerChange = (key, data) => {
        const newBookingDate = {
            checkIn: data[0],
            checkOut: data[1],
        };
        dispatch(setBookingDate(newBookingDate));
    };
    return (
        <div>
            <div className="border border-slate-300 rounded-md p-5 shadow ">
                <div className="flex justify-between items-center">
                    <span className="flex gap-2 items-center">
                        <span className="font-semibold text-xl">
                            đ {convertLocaleString(thongTinChiTietPhong.price)}
                        </span>
                        <span>/ đêm</span>
                    </span>
                </div>

                <div className="my-5 border border-slate-300 rounded-md">
                    <div className="w-full flex relative pt-3 pb-8">
                        <div className="w-[1px] bg-slate-300 absolute top-0 left-1/2 h-full z-10"></div>
                        <div className="w-1/2 cursor-pointer pl-4">
                            <span className="font-semibold">Nhận phòng</span>
                        </div>
                        <div className="w-1/2 cursor-pointer pl-4">
                            <span className="font-semibold">Trả phòng</span>
                        </div>
                        <div className="absolute bottom-0 w-full">
                            <RangeDatePicker
                                onChange={onDatePickerChange}
                            ></RangeDatePicker>
                        </div>
                    </div>
                    <div className="w-full p-4 border-t cursor-pointer">
                        <div>
                            <ChooseCustomer
                                limit={thongTinChiTietPhong?.guests}
                                handleChooseCustomer={handleChooseCustomer}
                            ></ChooseCustomer>
                        </div>
                    </div>
                </div>
                <button
                    className={`${
                        !ableToBook
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 "
                    } text-center text-white font-semibold text-lg block py-2 w-full rounded-md hover:bg-gradient-to-l  duration-300 ease-in-out`}
                    // className="bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 text-center text-white font-semibold text-lg block py-2 w-full rounded-md hover:bg-gradient-to-l  duration-300 ease-in-out"
                    onClick={handleBooking}
                    disabled={!ableToBook}
                >
                    Đặt Phòng
                </button>
                <div className="mt-2">
                    <p className="text-gray-700 text-center">
                        Bạn vẫn chưa bị trừ tiền
                    </p>
                    <div className="flex justify-between text-lg text-gray-500">
                        <span className="underline">
                            <span>
                                đ{" "}
                                {convertLocaleString(
                                    thongTinChiTietPhong.price
                                )}{" "}
                                x {daysOfBooking} đêm
                            </span>
                        </span>
                        <span> đ {countTotalCost()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
