import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import useWindowDimensions from '../../../HOOK/useWindowDimensions';

export default function DanhGiaSliderHomePage(props) {

    let { danhSachDanhGia } = props;

    const customSlider = React.createRef();

    const goToNext = () => {
        customSlider.current.slickNext();
    };

    const goToPrevious = () => {
        customSlider.current.slickPrev();
    };

    //Kiểm tra kích cỡ màn hình
    let checkScreenDimension = useWindowDimensions();
    //Quy định số lượng room card xuất hiện tuỳ theo kích cỡ màn hình
    let [currentScreenDimesion, setCurrentScreenDimesion] = useState(1);
    useEffect(() => { //Set lại giá trị currentScreenDimesion mỗi khi resize kích cỡ màn hình
        if (checkScreenDimension.width > 1024) {
            setCurrentScreenDimesion(3);
        };
        if (checkScreenDimension.width > 768 && checkScreenDimension.width <= 1024) {
            setCurrentScreenDimesion(2)
        };
        if (checkScreenDimension.width > 640 && checkScreenDimension.width <= 768) {
            setCurrentScreenDimesion(2)
        };
        if (checkScreenDimension.width > 320 && checkScreenDimension.width <= 640) {
            setCurrentScreenDimesion(1)
        };
    }, [checkScreenDimension]);

    const SliderSettings = {
        dots: false,
        infinite: danhSachDanhGia.length > currentScreenDimesion ? true : false,
        speed: 500,
        slidesToShow: currentScreenDimesion,
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
            <h1 className="w-11/12 mx-auto text-center lg:text-2xl md:text-2xl stext-base">Tiếng lành đồn xa</h1>
            {
                danhSachDanhGia.length > 0 && <Fragment>
                    <Slider
                        ref={customSlider}
                        {...SliderSettings}
                        className='mx-auto
                        lg:w-9/12 
                        md:w-full 
                        w-full'
                    >
                        {renderDanhGiaSlider()}
                    </Slider>
                </Fragment>
            }
            <button
                className="absolute text-gray-500 
                lg:left-40 lg:top-1/2 lg:text-2xl
                md:left-0 md:top-1/2 md:text-2xl
                left-0 top-1/2 stext-2xl"
                onClick={() => { goToPrevious() }}
            >
                <FontAwesomeIcon
                    icon={faChevronCircleLeft}
                />
            </button>
            <button
                className="absolute text-gray-500
                lg:right-40 lg:top-1/2 lg:text-2xl
                md:right-0 md:top-1/2 md:text-2xl
                right-0 top-1/2 text-2xl"
                onClick={() => { goToNext() }}
            >
                <FontAwesomeIcon
                    icon={faChevronCircleRight}
                />
            </button>
        </div>
    )
}
