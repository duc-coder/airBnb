import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleCheckbox } from "../../redux/danhSachPhongSlice";
import { arrConvenient } from "../../utils/danhSachPhong.util";

export default function TienNghi() {
  let dispatch = useDispatch();
  const { valueCheckbox } = useSelector((state) => state.danhSachPhongSlice);

  let renderTienNghi = () => {
    return arrConvenient?.map((item) => {
      let index = valueCheckbox?.findIndex(
        (itemCheck) => itemCheck === item.id
      );
      return (
        <div key={item.id} className="space-x-3 flex justify-center">
          <input
            id={item.name}
            className="w-7 h-7 accent-black cursor-pointer"
            type="checkbox"
            value={item.id}
            checked={index !== -1 ? item.id : false}
            onChange={(e) => dispatch(handleCheckbox(e.target.value))}
          />
          <label htmlFor={item.name} className="w-full text-lg cursor-pointer">
            {item.name}
          </label>
        </div>
      );
    });
  };

  return (
    <div className="py-8">
      <div className="text-xl font-medium pb-4">Tiện nghi</div>
      <div className="grid grid-cols-2 gap-4">{renderTienNghi()}</div>
    </div>
  );
}
