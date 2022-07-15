import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import xacMinhDanhTinhIcon from '../../assets/img/security.png';
import { faCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormChinhSuaHoSo from './FormChinhSuaHoSo/FormChinhSuaHoSo';
import { useParams } from 'react-router-dom';
import { getThongTinNguoiDung, hienThiFormChinhSuaHoSo, selectFormChinhSuaHoSoOpen, selectThongTinNguoiDung, uploadAnhNguoiDung } from '../../redux/nguoiDungSlice';
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
    <div className='mx-auto 
    lg:w-10/12 lg:my-5 lg:grid lg:grid-cols-12
    md:w-11/12 md:my-5 md:grid md:grid-cols-12
    w-11/12 mt-5'>
      <div className='lg:col-span-3 
      md:col-span-4
      w-full'>
        <div className='mx-auto bg-white
        lg:w-11/12 lg:p-5 lg:border lg:border-gray-300 lg:rounded-2xl
        md:w-11/12 md:p-5 md:border md:border-gray-300 md:rounded-2xl'>
          <div className='mx-auto lg:w-11/12 md:w-11/12'>
            <img
              src={imgUrl ? imgUrl : thongTinNguoiDung.avatar} //Hiển thị ảnh upload mới thay cho ảnh cũ
              alt="avatar"
              className='mx-auto rounded-full
              lg:w-36 lg:h-36
              md:w-36 md:h-36
              w-40 h-40'
            />
            <form
              onSubmit={formik.handleSubmit}
              className='w-full 
              lg:h-14 lg:flex lg:flex-wrap lg:justify-center lg:my-2 lg:relative
              md:h-14 md:flex md:flex-wrap md:justify-center md:my-2 md:relative
              h-16 flex flex-wrap justify-center'>
              <label
                for="upload-photo"
                className='w-full h-fit cursor-pointer text-center underline font-bold lg:h-5 md:h-5'
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
                    className='bg-rose-500 text-white font-bold rounded-lg 
                    lg:py-1 lg:px-2 lg:text-sm lg:absolute lg:bottom-0
                    md:py-1 md:px-2 md:text-sm md:absolute md:bottom-0
                    py-1 px-2 mt-2'
                  >
                    Upload
                  </button>
                  : <Fragment />
              }
            </form>
          </div>
          <div className='mt-5'>
            <div className='w-11/12 mx-auto'>
              <img
                src={xacMinhDanhTinhIcon}
                className='lg:w-8 md:w-5 w-8'
              />
              <h2 className='font-bold lg:text-xl md:text-sm'>
                Xác minh danh tính
              </h2>
              <p className='lg:text-base md:text-sm'>
                Xác thực danh tính của bạn với huy hiệu xác minh danh tính.
              </p>
              <button className='border border-gray-800 rounded-lg font-bold hover:bg-gray-200
            lg:py-2 lg:px-4
            md:py-2 md:px-4
            py-1 px-2'>
                Nhận huy hiệu
              </button>
            </div>

            <div className='lg:mt-5 lg:pt-5 lg:border-t lg:border-t-gray-300
          md:mt-5 md:pt-5 md:border-t md:border-t-gray-300
          w-11/12 mx-auto mt-2'>
              <p className='font-bold lg:text-xl md:text-sm my-auto'>{thongTinNguoiDung.name} đã xác nhận</p>
              <span><FontAwesomeIcon icon={faCheck} /></span> <span>Địa chỉ email</span>
            </div>
          </div>
        </div>
      </div>
      <div className='lg:col-span-9
      md:col-span-8
      w-full my-5'>
        <div className='w-full lg:p-2
        md:p-2'>
          <div className='w-full lg:mb-10
          md:mb-10'>
            <h1 className='font-bold my-auto lg:text-4xl
            md:text-2xl
            text-2xl text-center'>
              Xin chào, tôi là {thongTinNguoiDung.name}
            </h1>
            <p className='text-gray-500 my-auto lg:text-base 
            md:text-base
            text-center'>
              Bắt đầu tham gia vào 2022
            </p>
            <p
              className='underline cursor-pointer my-auto font-bold hover:text-gray-500
              lg:text-base lg:mt-2
              md:text-base md:mt-2
              mt-2 text-center'
              onClick={() => { handleHienThiChinhSuaThongTin() }}
            >
              Xem hồ sơ thông tin cá nhân
            </p>
            {formChinhSuaHoSoOpen
              ? <FormChinhSuaHoSo thongTinNguoiDung={thongTinNguoiDung} />
              : <Fragment />
            }
          </div>
          <div className='flex justify-between mt-5'>
            <div className='w-full 
          lg:mb-10 lg:pb-5 lg:border-b lg:border-b-gray-300
          md:mb-10 md:pb-5 md:border-b md:border-b-gray-300
          '>
              <FontAwesomeIcon icon={faStar} className='lg:mb-1 md:mb-1' /> <span
                className='font-bold my-auto lg:text-2xl 
                md:text-2xl 
                text-center'>
                0 đánh giá
              </span>
            </div>
            <div className='w-full 
          lg:mb-10 lg:pb-5 lg:border-b lg:border-b-gray-300
          md:mb-10 md:pb-5 md:border-b md:border-b-gray-300
          '>
              <p className='underline cursor-pointer font-bold my-auto hover:text-gray-500
            lg:text-base
            md:text-base
            text-center'>
                Đánh giá của bạn
              </p>
            </div>
          </div>
        </div >
      </div >
    </div >
  )
}
