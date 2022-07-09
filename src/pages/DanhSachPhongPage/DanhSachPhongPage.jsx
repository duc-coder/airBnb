import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDanhSachPhong } from "../../redux/danhSachPhongSlice";
import { Link } from "react-router-dom";
import ModalChonPhong from "./ModalChonPhong";

export default function DanhSachPhongPage() {
  const { danhSachPhong } = useSelector((state) => state.danhSachPhongSlice);

  let { id } = useParams();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDanhSachPhong(id));
  }, []);

  let renderDanhSachPhong = () => {
    return danhSachPhong?.map((item, index) => {
      return (
        <Link
          key={index}
          to={`/rooms/${item._id}`}
          className="text-current hover:text-current"
        >
          <div className="overflow-hidden rounded-lg shadow">
            <img
              className="w-full hover:scale-110 transition-all duration-300 object-cover"
              src={item.image}
              alt={item.image}
            />
          </div>
          <div className="mt-2 ">
            <div className="font-bold text-lg">{item.name}</div>
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: "1",
                display: "-webkit-box",
              }}
            >
              {item.locationId.name}
            </div>
            <div className="flex justify-start space-x-3">
              <div>{item.guests} khách,</div>
              <div>{item.bedRoom} phòng ngủ,</div>
              <div>{item.bath} bồn tắm</div>
            </div>
            <div>
              Giá:{" "}
              <span className="text-lg font-bold">
                {item.price.toLocaleString()} VND/ngày
              </span>
            </div>
          </div>
        </Link>
      );
    });
  };

  return (
    <>
      <div className=" py-5">
        <ModalChonPhong />
        <div className="w-11/12 mx-auto">
          <div className="grid grid-cols-4 gap-8">{renderDanhSachPhong()}</div>
        </div>
      </div>
    </>
  );
}
