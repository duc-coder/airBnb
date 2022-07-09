import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

export default function DanhGiaSliderHomePage(props) {

    let { danhSachDanhGia } = props;

    const customSlider = React.createRef();

    const goToNext = () => {
        customSlider.current.slickNext();
    };

    const goToPrevious = () => {
        customSlider.current.slickPrev();
    };

    const SliderSettings = {
        dots: false,
        infinite: danhSachDanhGia.length > 3 ? true : false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    const renderDanhGiaSlider = () => {
        return danhSachDanhGia.map((danhGia, index) => {
            return <Link
                key={index}
                to={`/rooms/${danhGia.roomId?._id}`}
                className='group'
            >
                <div className="w-80 h-80 mx-auto p-2 border border-neutral-400 border-b-4 border-b-rose-600 relative group-hover:bg-neutral-200 group-hover:scale-95">
                    <h2 className="text-center text-xl my-auto text-rose-500">{danhGia.roomId?.name}</h2>
                    <h3 className="text-lg text-center my-auto mt-7">{danhGia.content}</h3>
                    {
                        danhGia.userId?.name !== undefined || danhGia.userId?.address !== undefined
                            ? <div className='absolute bottom-2 w-full flex justify-center'>
                                <p className="text-base text-neutral-500 italic text-center my-auto">
                                    {danhGia.userId?.name} từ {danhGia.userId?.address}
                                </p>
                            </div>
                            : <Fragment />
                    }
                </div>
            </Link>
        })
    };

    return (
        <div className="w-full mt-5 pb-5 relative">
            <h1 className="w-11/12 mx-auto text-2xl text-center">Tiếng lành đồn xa</h1>
            {
                danhSachDanhGia.length > 0 && <Fragment>
                    <Slider
                        ref={customSlider}
                        {...SliderSettings}
                        className='w-9/12 mx-auto'
                    >
                        {renderDanhGiaSlider()}
                    </Slider>
                </Fragment>
            }
            <button
                className="absolute left-40 top-1/2 text-2xl text-gray-500"
                onClick={() => { goToPrevious() }}
            >
                <FontAwesomeIcon
                    icon={faChevronCircleLeft}
                />
            </button>
            <button
                className="absolute right-40 top-1/2 text-2xl text-gray-500"
                onClick={() => { goToNext() }}
            >
                <FontAwesomeIcon
                    icon={faChevronCircleRight}
                />
            </button>
        </div>
    )
}
