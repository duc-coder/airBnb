import { Popover } from "@headlessui/react";
import { useEffect, useState } from "react";
import ChooseCustomerItem from "./ChooseCustomerItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
export default function ChooseCustomer({ handleChooseCustomer, limit = 999 }) {
    let danhSachLoaiKhach = [
        {
            index: 0,
            ten: "Người lớn",
            moTa: "Từ 13 tuổi trở lên",
            soLuong: 0,
        },
        {
            index: 1,
            ten: "Trẻ em",
            moTa: "Độ tuổi 2 - 12",
            soLuong: 0,
        },
        {
            index: 2,
            ten: "Em bé",
            moTa: "Dưới 2 tuổi",
            soLuong: 0,
        },
        {
            index: 3,
            ten: "Thú cưng",
            moTa: "Mang theo động vật cần được phục vụ?",
            soLuong: 0,
        },
    ];
    const [customerList, setCustomerList] = useState(danhSachLoaiKhach);
    const [disabledSide, setDisabledSide] = useState("");
    const [totalCustomers, setTotalCustomers] = useState(0);
    // const [customerQuantity]
    const incQuantity = (index) => {
        const newCustomerList = [...customerList];
        newCustomerList[index].soLuong += 1;
        setCustomerList(newCustomerList);
    };
    const decQuantity = (index) => {
        const newCustomerList = [...customerList];

        newCustomerList[index].soLuong = Math.max(
            0,
            newCustomerList[index].soLuong - 1
        );
        setCustomerList(newCustomerList);
    };
    const countTotalCustomer = () => {
        return customerList.reduce((sum, customer) => {
            return sum + customer.soLuong;
        }, 0);
    };

    useEffect(() => {
        setTotalCustomers(countTotalCustomer);
    }, [customerList]);
    useEffect(() => {
        if (limit && totalCustomers >= limit) setDisabledSide("inc");
        else if (totalCustomers < 0) setDisabledSide("dec");
        else setDisabledSide("");
        handleChooseCustomer(totalCustomers, customerList);
    }, [totalCustomers]);

    return (
        <div>
            {" "}
            <Popover className="relative">
                <Popover.Button className="outline-none border-none block w-full text-left">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="font-semibold block">Khách</span>
                            <span>{totalCustomers} Khách</span>
                        </div>

                        <span>
                            <FontAwesomeIcon
                                className="text-xl"
                                icon={faAngleDown}
                            />
                        </span>
                    </div>
                </Popover.Button>

                <Popover.Panel className="absolute z-10 top-[50px] -left-[17px]">
                    <div className="flex flex-col gap-5 bg-white p-5 shadow w-[312px] border border-slate-300 rounded">
                        {customerList.map((loaiKhach) => {
                            return (
                                <ChooseCustomerItem
                                    data={loaiKhach}
                                    incQuantity={incQuantity}
                                    decQuantity={decQuantity}
                                    disabled={disabledSide}
                                />
                            );
                        })}
                    </div>
                </Popover.Panel>
            </Popover>
        </div>
    );
}
