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
            <h3 className='font-bold'>GIỚI THIỆU</h3>
            <p className='cursor-pointer hover:underline'>Phương thức hoạt động của AirBnb</p>
            <p className='cursor-pointer hover:underline'>Trang tin tức</p>
            <p className='cursor-pointer hover:underline'>Nhà đầu tư</p>
            <p className='cursor-pointer hover:underline'>AirBnb Plus</p>
            <p className='cursor-pointer hover:underline'>AirBnb Luxe</p>
            <p className='cursor-pointer hover:underline'>Hotel Tonight</p>
            <p className='cursor-pointer hover:underline'>AirBnb for work</p>
            <p className='cursor-pointer hover:underline'>Nhờ có Host - mọi điều đều có thể</p>
            <p className='cursor-pointer hover:underline'>Cơ hội nghề nghiệp</p>
            <p className='cursor-pointer hover:underline'>Thư của nhà sáng lập</p>
          </div>

          <div className='footer-menu-item-list'>
            <h3 className='font-bold'>CỘNG ĐỒNG</h3>
            <p className='cursor-pointer hover:underline'>Sự đa dạng và cảm giác thân thuộc</p>
            <p className='cursor-pointer hover:underline'>Tiện nghi phù hợp cho người khuyết tật</p>
            <p className='cursor-pointer hover:underline'>Đối tác liên kết AirBnb</p>
            <p className='cursor-pointer hover:underline'>Chỗ ở cho tuyến đầu</p>
            <p className='cursor-pointer hover:underline'>Lượt giới thiệu của khách</p>
            <p className='cursor-pointer hover:underline'>AirBnb.org</p>
          </div>

          <div className='footer-menu-item-list'>
            <h3 className='font-bold'>ĐÓN TIẾP KHÁCH</h3>
            <p className='cursor-pointer hover:underline'>Cho thuê nhà</p>
            <p className='cursor-pointer hover:underline'>Tổ chức trải nghiệm trực tuyến</p>
            <p className='cursor-pointer hover:underline'>Tổ chức trải nghiệm</p>
            <p className='cursor-pointer hover:underline'>Đón tiếp khách có trách nhiệm</p>
            <p className='cursor-pointer hover:underline'>Trung tâm tài nguyên</p>
            <p className='cursor-pointer hover:underline'>Trung tâm cộng đồng</p>
          </div>

          <div className='footer-menu-item-list'>
            <h3 className='font-bold'>HỖ TRỢ</h3>
            <p className='cursor-pointer hover:underline'>Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi</p>
            <p className='cursor-pointer hover:underline'>Trung tâm giúp đỡ</p>
            <p className='cursor-pointer hover:underline'>Các tuỳ chỉnh huỷ</p>
            <p className='cursor-pointer hover:underline'>Hỗ trợ khu dân cư</p>
            <p className='cursor-pointer hover:underline'>Tin cậy và an toàn</p>
          </div>
        </div>
        <div className='w-full pt-5 px-2 flex justify-between'>
          <div className='w-5/12 flex justify-between'>
            <p>2021 AirBnb, Inc. All rights reserved</p>
            <p>|</p>
            <p>Quyền riêng tư</p>
            <p>|</p>
            <p>Điều khoản</p>
            <p>|</p>
            <p>Sơ đồ trang web</p>
          </div>
          <div className='w-3/12 flex justify-between'>
            <div className='flex justify-between'>
              <FontAwesomeIcon className='my-auto mx-1' icon={faGlobe} />
              <p className='my-auto mx-1'>Tiếng Việt (VN)</p>
            </div>
            <div className='flex justify-between'>
              <FontAwesomeIcon className='my-auto mx-1' icon={faDongSign} />
              <p className='my-auto mx-1'>VND</p>
            </div>
            <div className='flex justify-between items-center'>
              <FacebookOutlined className='px-1 my-auto text-base' />
              <TwitterOutlined className='px-1 my-auto text-base' />
              <InstagramOutlined className='px-1 my-auto text-base' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}