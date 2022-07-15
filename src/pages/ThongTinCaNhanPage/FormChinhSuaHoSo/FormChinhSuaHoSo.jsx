import React from 'react';
import { DatePicker, Form, Input, Select } from 'antd';
import { useFormik } from 'formik';
import styles from '../css/FormChinhSuaHoSo.css';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { anFormChinhSuaHoSo } from '../../../redux/nguoiDungSlice';

const dateFormat = 'DD/MM/YYYY';

export default function FormChinhSuaHoSo(props) {

    let { thongTinNguoiDung } = props;

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            address: thongTinNguoiDung.address,
            birthday: thongTinNguoiDung.birthday,
            email: thongTinNguoiDung.email,
            gender: thongTinNguoiDung.gender,
            name: thongTinNguoiDung.name,
            phone: thongTinNguoiDung.phone,
            type: null,
        },
    });

    let dispatch = useDispatch();

    const handleAnFormChinhSuaHoSo = () => {
        dispatch(anFormChinhSuaHoSo());
        window.scrollTo(0, 0);
    };

    return (
        <div className='main-div'>
            <Form
                onSubmitCapture={formik.handleSubmit}
                autoComplete="off"
                layout='vertical'
                className='w-full'
            >
                <Form.Item
                    label='Họ tên'
                >
                    <Input
                        disabled={true}
                        name='name'
                        onChange={formik.handleChange}
                        value={formik.values.name} />
                </Form.Item>
                <Form.Item
                    label='Email'
                >
                    <Input
                        disabled={true}
                        name='email'
                        onChange={formik.handleChange}
                        value={formik.values.email} />
                </Form.Item>
                <Form.Item
                    label='Số điện thoại'
                >
                    <Input
                        disabled={true}
                        name='phone'
                        onChange={formik.handleChange}
                        value={formik.values.phone} />
                </Form.Item>
                <Form.Item
                    label='Địa chỉ'
                >
                    <Input
                        disabled={true}
                        name='address'
                        onChange={formik.handleChange}
                        value={formik.values.address} />
                </Form.Item>
                <Form.Item
                    label='Giới tính'
                >
                    <Select
                        disabled={true}
                        name='gender'
                        defaultValue={formik.values.gender}
                    // onChange={handleChangeGender}
                    >
                        <Select.Option value={true}>Nam</Select.Option>
                        <Select.Option value={false}>Nữ</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label='Ngày sinh'
                >
                    <DatePicker
                        disabled={true}
                        className='w-60'
                        name='birthday'
                        format={dateFormat}
                        value={moment(formik.values.birthday)}
                    />
                </Form.Item>
                <Form.Item>
                    <div className='flex justify-between'>
                        <p
                            className='text-base underline cursor-pointer py-2 px-4 hover:bg-gray-200'
                            onClick={() => { handleAnFormChinhSuaHoSo() }}
                        >
                            Huỷ
                        </p>
                        <button
                            type='submit'
                            disabled={true}
                            className='text-base font-bold py-2 px-4 text-white bg-gray-400 rounded-lg'
                        >
                            Lưu
                        </button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}
