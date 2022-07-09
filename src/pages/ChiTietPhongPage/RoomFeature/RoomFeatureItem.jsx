import React from "react";

export default function RoomFeatureItem({ data }) {
    return (
        <div className="flex gap-2 items-center">
            <img src={data.image} alt="" className="w-[30px] h-[30px]" />
            <span className={data.disabled && "line-through"}>{data.name}</span>
        </div>
    );
}
