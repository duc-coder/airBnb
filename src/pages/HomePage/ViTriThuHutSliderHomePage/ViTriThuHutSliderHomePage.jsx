import React, { Fragment } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

export default function ViTriThuHutSliderHomePage(props) {

    let { danhSachViTriDanhGiaCao } = props;

    const customSlider = React.createRef();

    const goToNext = () => {
        customSlider.current.slickNext();
    };

    const goToPrevious = () => {
        customSlider.current.slickPrev();
    };

    const SliderSettings = {
        dots: false,
        infinite: danhSachViTriDanhGiaCao.length > 4 ? true : false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
    };

    const renderDiemDenThuHut = () => {
        return _.uniqBy(danhSachViTriDanhGiaCao, 'province').map((viTri, index) => {
            return <Link
                key={index}
                to={`/search/${viTri._id}`}
                className='text-inherit hover:text-inherit group'
            >
                <div key={index}>
                    <img className="w-28 h-28 mx-auto rounded-full my-2 group-hover:scale-110" src={viTri.image} />
                    <p className="text-base font-bold text-center mx-auto my-auto">{viTri.province}</p>
                    <p className="text-sm text-center mx-auto my-auto">1,000 chỗ ở</p>
                </div>
            </Link>
        })
    };

    return (
        <div className="w-full mt-5 pb-5 relative">
            <h1 className="w-11/12 mx-auto text-2xl text-center">Các điểm đến thu hút nhất Việt Nam</h1>
            {
                danhSachViTriDanhGiaCao.length > 0 && <Fragment>
                    <Slider
                        ref={customSlider}
                        {...SliderSettings}
                        className='w-9/12 mx-auto'
                    >
                        {renderDiemDenThuHut()}
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
