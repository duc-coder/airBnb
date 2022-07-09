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
                        className="px-5 py-2 mt-2 mx-auto rounded-lg bg-rose-500 text-white text-base active:scale-95"
                        onClick={() => { navigate(`/search/${item._id}`) }}
                    >
                        Xem tất cả
                    </button>
                </div>
            </TabPane>
        })
    };

    return (
        <div className="main-page w-full mt-10 pb-5">
            <h1 className="w-11/12 mx-auto text-2xl text-center">Những chỗ nghỉ nổi bật khuyến nghị cho bạn</h1>
            <Tabs defaultActiveKey="1" centered>
                {renderTabPane()}
            </Tabs>
        </div>
    )
}
