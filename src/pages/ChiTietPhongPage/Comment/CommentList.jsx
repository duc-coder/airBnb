import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CommentItem from "./CommentItem";
export default function CommentList({ limit = 0, toggleModal }) {
    const { danhSachDanhGia } = useSelector((state) => state.danhGiaSlice);

    return (
        <div className="grid grid-cols-2 gap-10">
            {danhSachDanhGia.length > 0 &&
                danhSachDanhGia.map((danhGia, index) => {
                    if (index < limit)
                        return (
                            <CommentItem
                                key={index}
                                data={danhGia}
                                toggleModal={toggleModal}
                                needTruncate={true}
                            ></CommentItem>
                        );
                })}
        </div>
    );
}
