import { faChevronCircleLeft, faChevronCircleRight, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment } from 'react';
import Slider from 'react-slick';
import { Rate } from 'antd';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { useSelector } from 'react-redux';

export default function DeXuatPhongTab(props) {

    let { deXuatDanhSachPhongTab } = props;

    const customSlider = React.createRef();

    const goToNext = () => {
        customSlider.current.slickNext();
    };

    const goToPrevious = () => {
        customSlider.current.slickPrev();
    };

    const SliderSettings = {
        dots: false,
        infinite: deXuatDanhSachPhongTab > 4 ? true : false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    const renderDeXuatPhongTab = () => {
        return deXuatDanhSachPhongTab.map((phong, index) => {

            let diemDanhGia = phong.locationId?.valueate / 2;

            return <Link
                to={`/rooms/${phong._id}`}
                key={index}
                className='w-36 px-2 my-2 hover:shadow-xl p-2 cursor-pointer relative'
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
                        <p className="w-full my-auto text-lg text-rose-600 text-right">{phong.price?.toLocaleString()} VND</p>
                    </div>
                </div>
            </Link>
        });
    };

    return (
        <div className="relative">
            {
                deXuatDanhSachPhongTab.length > 0 && <Fragment>
                    <Slider
                        ref={customSlider}
                        {...SliderSettings}
                        className='w-full'
                    >
                        {renderDeXuatPhongTab()}
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
                </Fragment>
            }
        </div>
    )
}
