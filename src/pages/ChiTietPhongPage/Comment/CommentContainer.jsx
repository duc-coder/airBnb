import React from "react";
import CommentList from "./CommentList";
import { useSelector } from "react-redux";

export default function CommentContainer({ toggleModal }) {
    const { danhSachDanhGia } = useSelector((state) => state.danhGiaSlice);
    const LIMIT = 4;
    return (
        <div>
            <CommentList limit={LIMIT} toggleModal={toggleModal}></CommentList>
            <div className="mt-5">
                {danhSachDanhGia.length > LIMIT - 1 && (
                    <button
                        className="text-lg font-semibold  py-2 px-5 border border-slate-600 hover:border-slate-900 rounded-md"
                        onClick={toggleModal}
                    >
                        Xem toàn bộ đánh giá
                    </button>
                )}
            </div>
        </div>
    );
}
