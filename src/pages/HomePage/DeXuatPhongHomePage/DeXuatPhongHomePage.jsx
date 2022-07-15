import React from 'react';
import { Tabs } from 'antd';
import _ from 'lodash';
import DeXuatPhongTab from './DeXuatPhongTab';
import { useNavigate } from 'react-router-dom';
import styles from '../css/DeXuatPhongHomePage.css';

const { TabPane } = Tabs;

export default function DeXuatPhongHomePage(props) {

    let { danhSachPhong, danhSachViTri } = props;

    let navigate = useNavigate();

    let DSViTri = _.uniqBy(danhSachViTri, 'province');

    let tabValue = DSViTri.map((viTri, index) => {
        let renderKey = () => {
            for (let i = 0; i < DSViTri.length; i++) {
                let a = 1;
                a = a + index;
                return a;
            }
        };
        return {
            key: renderKey(),
            name: viTri.province,
            _id: viTri._id
        }
    });

    const danhSachPhongTheoProvince = tabValue.map((Province, index) => {
        return {
            key: Province.key,
            name: Province.name,
            _id: Province._id,
            DSPhong: danhSachPhong.filter(item => item.locationId?.province == Province.name),
        }
    });

    const renderTabPane = () => {
        return danhSachPhongTheoProvince.map((item, index) => {
            return <TabPane tab={item.name} key={item.key}>
                <DeXuatPhongTab
                    deXuatDanhSachPhongTab={item.DSPhong}
                />
                <div className="w-full flex items-center">
                    <button
                        className="mx-auto rounded-lg bg-rose-500 text-white text-base active:scale-95
                        lg:px-5 lg:py-2
                        md:px-5 md:py-2
                        px-3 py-1"
                        onClick={() => { navigate(`/search/${item._id}`) }}
                    >
                        Xem tất cả
                    </button>
                </div>
            </TabPane>
        })
    };

    return (
        <div className="main-page w-full lg:mt-10 lg:pb-5 mt-5 md:mt-6">
            <h1 className="lg:w-11/12 lg:text-2xl md:text-2xl text-base mx-auto text-center">Những chỗ nghỉ nổi bật khuyến nghị cho bạn</h1>
            <Tabs defaultActiveKey="1" centered>
                {renderTabPane()}
            </Tabs>
        </div>
    )
}
