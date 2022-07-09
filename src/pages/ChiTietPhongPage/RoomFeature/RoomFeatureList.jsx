import React from "react";
import gym from "../../../assets/img/room-convenience/gym.png";
import tv from "../../../assets/img/room-convenience/tv.png";
import bathTub from "../../../assets/img/room-convenience/bath-tub.png";
import bonfire from "../../../assets/img/room-convenience/bonfire.png";
import chef from "../../../assets/img/room-convenience/chef.png";
import elevator from "../../../assets/img/room-convenience/elevator.png";
import heater from "../../../assets/img/room-convenience/heater.png";
import pool from "../../../assets/img/room-convenience/pool.png";
import dryer from "../../../assets/img/room-convenience/dryer.png";
import wifi from "../../../assets/img/room-convenience/wifi.png";
import RoomFeatureItem from "./RoomFeatureItem";
export default function RoomFeatureList({ featureList }) {
    const featureTransfer = [
        {
            name: "Gym",
            disabled: !featureList?.gym,
            image: gym,
        },
        {
            name: "Cable TV",
            disabled: !featureList?.cableTV,
            image: tv,
        },
        {
            name: "Máy sấy",
            disabled: !featureList?.dryer,
            image: dryer,
        },
        {
            name: "Thang máy",
            disabled: !featureList?.elevator,
            image: elevator,
        },
        {
            name: "Máy sưởi",
            disabled: !featureList?.heating,
            image: heater,
        },
        {
            name: "Bồn tắm nước nóng",
            disabled: !featureList?.hotTub,
            image: bathTub,
        },
        {
            name: "Lửa trại",
            disabled: !featureList?.indoorFireplace,
            image: bonfire,
        },
        {
            name: "Bếp",
            disabled: !featureList?.kitchen,
            image: chef,
        },
        {
            name: "Hồ bơi",
            disabled: !featureList?.pool,
            image: pool,
        },
        {
            name: "Wifi",
            disabled: !featureList?.wifi,
            image: wifi,
        },
    ];
    const featureNotHave = featureTransfer.filter(
        (feature) => feature.disabled == true
    );
    const featureHave = featureTransfer.filter(
        (feature) => feature.disabled == false
    );
    return (
        <div>
            <div className="grid grid-cols-2 gap-5">
                {featureHave.map((feature, index) => {
                    return <RoomFeatureItem key={index} data={feature} />;
                })}
            </div>
            {featureNotHave.length > 0 && (
                <h2 className="text-xl font-semibold block mt-5">
                    Không bao gồm
                </h2>
            )}

            <div className="grid grid-cols-2 gap-5 ">
                {featureNotHave.map((feature, index) => {
                    return <RoomFeatureItem key={index} data={feature} />;
                })}
            </div>
        </div>
    );
}
