import React from 'react';
import { Link } from 'react-router-dom';

export default function LoaiHinhTienIchSliderHomePage(props) {

    const tienIchIconArr = [
        {
            hinhAnh: '../img/room-convenience/bath-tub.png',
            ten: 'Bồn tắm nước nóng',
        },
        {
            hinhAnh: '../img/room-convenience/bonfire.png',
            ten: 'Đốt lửa trại',
        },
        {
            hinhAnh: '../img/room-convenience/chef.png',
            ten: 'Nhà bếp',
        },
        {
            hinhAnh: '../img/room-convenience/hair-dryer.png',
            ten: 'Máy sấy tóc',
        },
        {
            hinhAnh: '../img/room-convenience/heater.png',
            ten: 'Lò sưởi ấm',
        },
        {
            hinhAnh: '../img/room-convenience/lift-sign.png',
            ten: 'Thang máy',
        },
        {
            hinhAnh: '../img/room-convenience/stationary-bike.png',
            ten: 'Khu tập gym',
        },
        {
            hinhAnh: '../img/room-convenience/swimming-pool.png',
            ten: 'Hồ bơi',
        },
        {
            hinhAnh: '../img/room-convenience/watch-tv.png',
            ten: 'Tivi truyền hình cáp',
        },
        {
            hinhAnh: '../img/room-convenience/wifi.png',
            ten: 'Free Wifi',
        },
    ];

    const renderTienIchPhong = () => {
        return tienIchIconArr.map((item, index) => {
            return <Link
                key={index}
                to={'/'}
                className='text-inherit hover:text-inherit group'
            >
                <div className='lg:w-32 lg:wb-0
                md:w-16 md:wb-0
                w-16 mb-2'>
                    <img className="w-5 h-5 
                    md:w-6 md:h-6 
                    lg:w-8 lg:h-8 lg:my-2 mx-auto group-hover:scale-110" src={item.hinhAnh} />
                    <p className="text-xs font-normal text-center my-auto
                    md:text-xs 
                    lg:text-sm lg:font-bold">{item.ten}</p>
                </div>
            </Link>
        })
    };

    return (
        <div className="lg:w-full lg:mt-10 lg:pb-5 
        md:mt-0 -mt-6">
            <h1 className="lg:w-11/12 lg:text-2xl lg:mx-auto text-center">
                Các loại hình tiện ích bạn cần
            </h1>
            <div className='lg:w-11/12 lg:mx-auto lg:flex lg:justify-between lg:items-start 
            md:w-11/12 md:mt-5 md:mx-auto md:flex md:justify-between md:items-start
            w-full grid grid-cols-5'>
                {renderTienIchPhong()}
            </div>
        </div>
    )
}
