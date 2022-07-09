import React from 'react'
import Slider from 'react-slick';

export default function BannerHomePage() {

    const bannerArr = [
        {
            hinhAnh: '../img/banner-1.jpg',
        },
        {
            hinhAnh: '../img/banner-2.jpg',
        },
        {
            hinhAnh: '../img/banner-3.jpg',
        },
    ];

    const customSlider = React.createRef();

    const goToNext = () => {
        customSlider.current.slickNext();
    };

    const goToPrevious = () => {
        customSlider.current.slickPrev();
    };

    const SliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
    };

    const renderCarouselSlider = () => {
        return bannerArr.map((item, index) => {
            return <div
                key={index}
                className='w-full'
            >
                <img className="w-full" src={item.hinhAnh} />
            </div>
        })
    };

    return (
        <div className="relative">
            <Slider
                {...SliderSettings}
                className='banner-slider-container w-full mt-2'
            >
                {renderCarouselSlider()}
            </Slider>
            <div className="w-full absolute bottom-8 flex flex-wrap items-center mb-2 p-2 bg-black/50">
                <h1 className='text-4xl text-white w-11/12 mx-auto my-auto text-center'>
                    KHÁCH SẠN, KHU NGHỈ DƯỠNG, NHÀ TRỌ & HƠN THẾ NỮA
                </h1>
                <h2 className='text-xl text-white w-11/12 mx-auto my-auto text-center'>
                    Nhận giá tốt nhất cho hơn 10.000 chỗ nghỉ toàn Việt Nam
                </h2>
            </div>
        </div>
    )
}
