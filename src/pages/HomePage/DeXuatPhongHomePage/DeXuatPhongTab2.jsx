import { faChevronCircleLeft, faChevronCircleRight, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment } from 'react';
import Slider from 'react-slick';
import { Rate } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useSelector } from 'react-redux';

export default function DeXuatPhongTab2(props) {

    let navigate = useNavigate();

    let { deXuatDanhSachPhongTab2 } = props;

    const customSlider = React.createRef();

    const goToNext = () => {
        customSlider.current.slickNext();
    };

    const goToPrevious = () => {
        customSlider.current.slickPrev();
    };

    const SliderSettings = {
        dots: false,
        infinite: deXuatDanhSachPhongTab2 > 4 ? true : false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    const renderDeXuatPhongTab2 = () => {
        return deXuatDanhSachPhongTab2.map((phong, index) => {

            let diemDanhGia = phong.locationId?.valueate / 2;

            return <Link
                to={`/rooms/${phong._id}`}
                key={index}
                className='w-36 px-2 hover:shadow-xl p-2 cursor-pointer relative'
            >
                <div>
                    <img className="w-full mx-auto rounded-xl" alt={phong.name} src={phong.image} />
                    <p className="w-8 h-8 leading-8 rounded-md bg-rose-500 text-white text-lg text-center absolute top-8 right-5">{phong.locationId?.valueate}</p>
                    <h3 className="w-full text-xl font-bold text-center mt-2">{phong.name}</h3>
                    <div className="w-full flex justify-end">
                        <span className="my-auto"><Rate allowHalf disabled defaultValue={diemDanhGia} /></span>
                        <span className='ml-3 text-blue-500 my-auto'><FontAwesomeIcon icon={faLocationDot} /> {phong.locationId?.name}</span>
                    </div>
                    <div className="w-full">
                        <p className="text-right w-full my-auto italic">Giá rẻ nhất mỗi đêm từ</p>
                        <p className="w-full my-auto text-lg text-rose-600 text-right">{phong.price.toLocaleString()} VND</p>
                    </div>
                </div>
            </Link>
        });
    };

    const handleClick = () => {
        navigate(`/search/${_.first(deXuatDanhSachPhongTab2).locationId.province}`)
    };

    return (
        <div className="relative">
            {
                deXuatDanhSachPhongTab2.length > 0 && <Fragment>
                    <Slider
                        ref={customSlider}
                        {...SliderSettings}
                        className='w-full'
                    >
                        {renderDeXuatPhongTab2()}
                    </Slider>
                    <button
                        className="absolute left-0 top-1/3 text-3xl text-rose-600"
                        onClick={() => { goToPrevious() }}
                    >
                        <FontAwesomeIcon
                            icon={faChevronCircleLeft}
                        />
                    </button>
                    <button
                        className="absolute right-0 top-1/3 text-3xl text-rose-600"
                        onClick={() => { goToNext() }}
                    >
                        <FontAwesomeIcon
                            icon={faChevronCircleRight}
                        />
                    </button>
                    <div className="w-full flex items-center">
                        <button
                            className="px-5 py-2 mx-auto rounded-lg bg-rose-500 text-white text-base active:scale-95"
                            onClick={() => { handleClick() }}
                        >
                            Xem tất cả
                        </button>
                    </div>
                </Fragment>
            }
        </div>
    )
}
