import React from "react";
import RoomFeatureList from "../RoomFeature/RoomFeatureList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal, faStar, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { animateScroll as scroll, scroller, Element } from "react-scroll";
import Bed from "../../../assets/img/room-convenience/bed.png";
export default function RoomInfo({ thongTinChiTietPhong }) {
    const features = {
        cableTV: thongTinChiTietPhong?.cableTV,
        dryer: thongTinChiTietPhong?.dryer,
        elevator: thongTinChiTietPhong?.elevator,
        gym: thongTinChiTietPhong?.gym,
        heating: thongTinChiTietPhong?.heating,
        hotTub: thongTinChiTietPhong?.hotTub,
        indoorFireplace: thongTinChiTietPhong?.indoorFireplace,
        kitchen: thongTinChiTietPhong?.kitchen,
        pool: thongTinChiTietPhong?.pool,
        wifi: thongTinChiTietPhong?.wifi,
    };
    const renderBedRoom = () => {
        const components = [];
        for (let i = 0; i < thongTinChiTietPhong.bedRoom; i++)
            components.push(<img src={Bed} className="w-[30px] h-[30px]" />);
        return components;
    };
    return (
        <div>
            <div>
                {/* Room owner */}
                <div className="flex justify-between items-center py-5 border-b-[2px] border-slate-200">
                    <div>
                        <h2 className="text-2xl font-semibold">
                            Căn hộ {thongTinChiTietPhong.name} . Chủ nhà: XYZ
                        </h2>
                        <p className="flex gap-2">
                            <span>{thongTinChiTietPhong.guests} khách</span>
                            <span className="text-slate-500">.</span>

                            <span>
                                {thongTinChiTietPhong.bedRoom} phòng ngủ
                            </span>
                            <span className="text-slate-500">.</span>

                            <span>{thongTinChiTietPhong.bath} phòng tắm</span>
                        </p>
                    </div>
                    <div className="cursor-pointer relative">
                        <img
                            src={thongTinChiTietPhong.image}
                            alt=""
                            className="rounded-full w-[70px] h-[70px]"
                        />
                        <span className="absolute -right-1 -bottom-[10px] bg-white w-[40px] h-[40px] flex justify-center items-center rounded-full border-[1px] border-slate-400 text-xl text-yellow-500">
                            <FontAwesomeIcon className="" icon={faMedal} />
                        </span>
                    </div>
                </div>

                {/* hardcode Chu nha sieu cap */}
                <div className="py-5 border-b-[2px] border-slate-200">
                    <div className="flex gap-5 items-center">
                        <div className=" text-xl">
                            <FontAwesomeIcon className="" icon={faMedal} />
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg mb-0">
                                XYZ là Chủ nhà siêu cấp
                            </h4>
                            <span className=" text-gray-500">
                                Chủ nhà siêu cấp là những chủ nhà có kinh
                                nghiệm, được đánh giá cao và là những người cam
                                kết mang lại quãng thời gian ở tuyệt vời cho
                                khách.
                            </span>
                        </div>
                    </div>
                </div>
                {/* Bed*/}
                <div className="py-5 border-b-[2px] border-slate-200">
                    <h4 className="text-2xl font-semibold mb-0">
                        Nơi bạn sẽ nghỉ ngơi
                    </h4>
                    <div className="mt-5 grid grid-cols-4">
                        <div className="p-10 border-slate-300 border rounded-md inline-block text-lg">
                            <div className=" flex gap-5 justify-center">
                                {renderBedRoom()}
                            </div>
                            <span className=" block mt-2 font-semibold text-center">
                                {thongTinChiTietPhong.bedRoom} phòng ngủ
                            </span>
                        </div>
                    </div>
                </div>
                {/* Description */}
                <div className="py-5 border-b-[2px] border-slate-200">
                    <div className="py-3 px-5 border-[1px] border-slate-700 flex items-center justify-between text-lg rounded cursor-pointer">
                        <span>Dịch sang tiếng việt</span>
                        <span>
                            <FontAwesomeIcon className="" icon={faLanguage} />
                        </span>
                    </div>
                    <p className="text-lg mt-5 mb-0">
                        {thongTinChiTietPhong.description}
                    </p>
                </div>
                {/* Room Features */}
                <div className="py-5 border-b-[2px] border-slate-200">
                    <h2 className="text-2xl font-semibold">
                        Nơi này có những gì cho bạn
                    </h2>
                    <div>
                        <RoomFeatureList featureList={features} />
                    </div>
                </div>
            </div>
        </div>
    );
}
