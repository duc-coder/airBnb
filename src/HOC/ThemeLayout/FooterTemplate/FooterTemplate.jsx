import React from 'react';
import { faDongSign, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InstagramOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import styles from '../css/FooterTemplate.css';

export default function FooterTemplate() {

  return (
    <div className='footer w-full bg-neutral-100'>
      <div className='w-11/12 mx-auto py-5'>
        <div className='w-full mx-auto grid grid-cols-4 justify-items-center gap-10 border-solid border-0 border-b border-b-neutral-300 pb-2'>
          <div>
            <h3 className='font-bold 
            text-xs text-center lg:text-left'>GIỚI THIỆU</h3>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>Phương thức hoạt động của AirBnb</p>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>Trang tin tức</p>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>Nhà đầu tư</p>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>AirBnb Plus</p>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>AirBnb Luxe</p>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>Hotel Tonight</p>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>AirBnb for work</p>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>Nhờ có Host - mọi điều đều có thể</p>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>Cơ hội nghề nghiệp</p>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>Thư của nhà sáng lập</p>
          </div>

          <div className='footer-menu-item-list'>
            <h3 className='font-bold 
            text-xs text-center lg:text-left'>CỘNG ĐỒNG</h3>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>Sự đa dạng và cảm giác thân thuộc</p>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>Tiện nghi phù hợp cho người khuyết tật</p>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>Đối tác liên kết AirBnb</p>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>Chỗ ở cho tuyến đầu</p>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>Lượt giới thiệu của khách</p>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>AirBnb.org</p>
          </div>

          <div className='footer-menu-item-list'>
            <h3 className='font-bold 
            text-xs text-center lg:text-left'>ĐÓN TIẾP KHÁCH</h3>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>Cho thuê nhà</p>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>Tổ chức trải nghiệm trực tuyến</p>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>Tổ chức trải nghiệm</p>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>Đón tiếp khách có trách nhiệm</p>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>Trung tâm tài nguyên</p>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>Trung tâm cộng đồng</p>
          </div>

          <div className='footer-menu-item-list'>
            <h3 className='font-bold 
            text-xs text-center lg:text-left'>HỖ TRỢ</h3>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi</p>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>Trung tâm giúp đỡ</p>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>Các tuỳ chỉnh huỷ</p>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>Hỗ trợ khu dân cư</p>
            <p className='cursor-pointer hover:underline md:text-xs text-xs text-center lg:text-left'>Tin cậy và an toàn</p>
          </div>
        </div>
        <div className='w-full flex justify-between
        lg:pt-5 lg:px-2
        md:mt-1
        flex-wrap'>
          <div className='flex
          lg:w-5/12 lg:flex-nowrap lg:justify-between lg:mb-0
          md:w-8/12 md:flex-nowrap md:justify-between md:mb-0
          w-full flex-wrap justify-center mb-2'>
            <p className='md:text-xs md:mb-0 md:w-fit md:text-left
            lg:mb-0 lg:w-fit lg:text-left
            text-xs w-full text-center mb-1'>2021 AirBnb, Inc. All rights reserved</p>
            <p className='text-transparent lg:text-black'>|</p>
            <p className='text-xs my-auto mx-1 md:mx-0 md:my-0 lg:mx-0 lg:my-0'>Quyền riêng tư</p>
            <p className='text-transparent lg:text-black'>|</p>
            <p className='text-xs my-auto mx-1 md:mx-0 md:my-0 lg:mx-0 lg:my-0'>Điều khoản</p>
            <p className='text-transparent lg:text-black'>|</p>
            <p className='text-xs my-auto mx-1 md:mx-0 md:my-0 lg:mx-0 lg:my-0'>Sơ đồ trang web</p>
          </div>
          <div className='flex w-full
          lg:w-3/12 lg:justify-end
          md:w-4/12 md:flex md:flex-wrap md:justify-end'>
            <div className='w-full flex 
            lg:w-52
            md:justify-end md:mb-2'>
              <div className='flex 
              lg:justify-center lg:w-full
              md:justify-end'>
                <FontAwesomeIcon className='my-auto lg:my-0' icon={faGlobe} />
                <p className='my-auto mx-1 text-xs
                md:text-center
                lg:my-0'>
                  Tiếng Việt (VN)
                </p>
              </div>
              <div className='flex 
              lg:justify-center lg:w-full
              md:justify-end'>
                <FontAwesomeIcon className='my-auto mx-1 lg:my-0' icon={faDongSign} />
                <p className='my-auto mx-1 text-xs lg:my-0'>
                  VND
                </p>
              </div>
            </div>
            <div className='flex items-center 
            lg:justify-between lg:w-fit lg:items-start
            md:w-full md:justify-end'>
              <FacebookOutlined className='px-1 my-auto text-base lg:my-0' />
              <TwitterOutlined className='px-1 my-auto text-base lg:my-0' />
              <InstagramOutlined className='px-1 my-auto text-base lg:my-0' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}