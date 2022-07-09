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
                <div className='w-32'>
                    <img className="w-8 h-8 mx-auto my-2 group-hover:scale-110" src={item.hinhAnh} />
                    <p className="text-sm font-bold text-center mx-auto my-auto">{item.ten}</p>
                </div>
            </Link>
        })
    };

    return (
        <div className="w-full mt-10 pb-5">
            <h1 className="w-11/12 mx-auto text-2xl text-center">Các loại hình tiện ích bạn cần</h1>
            <div className='w-11/12 mx-auto flex justify-between items-center'>
                {renderTienIchPhong()}
            </div>
        </div>
    )
}
