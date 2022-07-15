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
                <img className="lg:w-full" src={item.hinhAnh} />
            </div>
        })
    };

    return (
        <div className="relative">
            <Slider
                {...SliderSettings}
                className='banner-slider-container w-full lg:mt-2'
            >
                {renderCarouselSlider()}
            </Slider>
            <div className="bg-black/50 flex flex-wrap items-center absolute w-full lg:bottom-8 lg:mb-2 lg:p-2 bottom-3 md:bottom-8">
                <h1 className='text-white mx-auto my-auto text-center lg:text-4xl lg:w-11/12 w-8/12 text-xs md:w-10/12 md:text-lg'>
                    KHÁCH SẠN, KHU NGHỈ DƯỠNG, NHÀ TRỌ VÀ HƠN THẾ NỮA
                </h1>
                <h2 className='text-white mx-auto my-auto text-center lg:text-xl lg:w-11/12 w-full text-xs font-thin md:text-sm'>
                    Nhận giá tốt nhất cho hơn 10.000 chỗ nghỉ toàn Việt Nam
                </h2>
            </div>
        </div>
    )
}
