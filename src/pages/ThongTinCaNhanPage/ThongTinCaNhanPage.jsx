import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import userPic from '../../assets/img/user_pic.png';
import xacMinhDanhTinhIcon from '../../assets/img/security.png';
import { faCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormChinhSuaHoSo from './FormChinhSuaHoSo/FormChinhSuaHoSo';
import { useParams } from 'react-router-dom';
import { getThongTinNguoiDung, hienThiFormChinhSuaHoSo, selectFormChinhSuaHoSoOpen, selectThongTinNguoiDung, uploadAnhNguoiDung } from '../../redux/nguoiDungSlice';
import { message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { useFormik } from 'formik';

export default function ThongTinCaNhanPage(props) {

  let { id } = useParams();

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getThongTinNguoiDung(id));
  }, []);

  let thongTinNguoiDung = useSelector(selectThongTinNguoiDung);
  let formChinhSuaHoSoOpen = useSelector(selectFormChinhSuaHoSoOpen);

  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState('');

  const handleHienThiChinhSuaThongTin = () => {
    dispatch(hienThiFormChinhSuaHoSo());
    window.scrollTo(0, 240);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      avatar: null,
    },
    onSubmit: values => {
      //Tạo form data để gửi dữ liệu về backend
      let formData = new FormData();
      formData.append('avatar', values.avatar);

      //Gọi API gửi dữ liệu về backend
      dispatch(uploadAnhNguoiDung(formData));
      setTimeout(() => {
        //Ẩn nút xác nhận upload ảnh
        setLoading(false);
      }, 500);
    },
  });

  const handleUploadAvatar = (e) => {
    //Lấy file từ event
    let file = e.target.files[0];
    formik.setFieldValue('avatar', file);

    //Tạo đối tượng đọc file
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      let image = e.target.result;
      setImgUrl(image);
    }
    //Hiển thị nút xác nhận upload ảnh
    setLoading(true);
  };

  return (
    <div className='w-10/12 mx-auto my-5 grid grid-cols-12'>
      <div className='col-span-3'>
        <div className='w-11/12 p-5 mx-auto bg-white border border-gray-300 rounded-2xl'>
          <div className='w-11/12 mx-auto'>
            <img
              src={imgUrl ? imgUrl : thongTinNguoiDung.avatar} //Hiển thị ảnh upload mới thay cho ảnh cũ
              alt="avatar"
              className='w-36 h-36 mx-auto rounded-full'
            />
            <form onSubmit={formik.handleSubmit} className='w-full h-14 flex flex-wrap justify-center my-2 relative'>
              <label
                for="upload-photo"
                className='w-full h-5 cursor-pointer text-center underline font-bold'
              >
                Cập nhật ảnh đại diện
              </label>
              <input
                type='file'
                id="upload-photo"
                className='hidden -z-10 cursor-none'
                onChange={handleUploadAvatar}
              />
              {
                loading
                  ? <button
                    type='submit'
                    className='bg-rose-500 text-white font-bold rounded-lg py-1 px-2 text-sm absolute bottom-0'
                  >
                    Upload
                  </button>
                  : <Fragment />
              }
            </form>
          </div>
          <div>
            <img
              src={xacMinhDanhTinhIcon}
              className='w-8'
            />
            <h2 className='text-xl font-bold'>Xác minh danh tính</h2>
            <p className='text-base'>Xác thực danh tính của bạn với huy hiệu xác minh danh tính.</p>
            <button className='border border-gray-800 rounded-lg py-2 px-4 font-bold hover:bg-gray-200'>Nhận huy hiệu</button>
          </div>

          <div className='mt-5 pt-5 border-t border-t-gray-300'>
            <p className='text-xl font-bold'>{thongTinNguoiDung.name} đã xác nhận</p>
            <span><FontAwesomeIcon icon={faCheck} /></span> <span>Địa chỉ email</span>
          </div>
        </div>
      </div>
      <div className='col-span-9'>
        <div className='w-full p-2'>
          <div className='w-full mb-10'>
            <h1 className='text-4xl font-bold my-auto'>Xin chào, tôi là {thongTinNguoiDung.name}</h1>
            <p className='text-base text-gray-500 my-auto'>Bắt đầu tham gia vào 2022</p>
            <p
              className='text-base underline cursor-pointer mt-2 my-auto font-bold hover:text-gray-500'
              onClick={() => { handleHienThiChinhSuaThongTin() }}
            >
              Xem hồ sơ thông tin cá nhân
            </p>
            {formChinhSuaHoSoOpen
              ? <FormChinhSuaHoSo thongTinNguoiDung={thongTinNguoiDung} />
              : <Fragment />
            }
          </div>
          <div className='w-full mb-10 pb-5 border-b border-b-gray-300'>
            <FontAwesomeIcon icon={faStar} className='mb-1' /> <span className='text-2xl font-bold my-auto'>0 đánh giá</span>
          </div>
          <div className='w-full mb-10 pb-5 border-b border-b-gray-300'>
            <p className='text-base underline cursor-pointer font-bold my-auto hover:text-gray-500'>Đánh giá của bạn</p>
          </div>
        </div >
      </div >
    </div >
  )
}
