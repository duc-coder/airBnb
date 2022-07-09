import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Progress } from "antd";
import {
  handleChangePercent,
  handleChangeValueInput,
} from "../../redux/danhSachPhongSlice";
import { DECLINE, INCREASE } from "../../utils/danhSachPhong.util";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function KhoangGia() {
  const { danhSachPhong } = useSelector((state) => state.danhSachPhongSlice);
  const { averagePrice } = useSelector((state) => state.danhSachPhongSlice);
  const { priceMax } = useSelector((state) => state.danhSachPhongSlice);
  const { valueInputPriceMin } = useSelector(
    (state) => state.danhSachPhongSlice
  );
  const { percent } = useSelector((state) => state.danhSachPhongSlice);
  const { errorValueInput } = useSelector((state) => state.danhSachPhongSlice);

  let dispatch = useDispatch();

  const increase = () => {
    dispatch(handleChangePercent(INCREASE));
  };

  const decline = () => {
    dispatch(handleChangePercent(DECLINE));
  };

  return (
    <div className="pb-8 border-b">
      <div className="text-xl font-medium pb-2">Khoảng giá</div>
      <div>
        Giá trung bình là{" "}
        <span className="font-medium text-[17px]">
          {(averagePrice / danhSachPhong?.length)?.toLocaleString()} VND/ngày
        </span>
      </div>
      <>
        <Progress strokeColor={`#ff5a5f`} percent={percent} showInfo={false} />
        <div className="flex justify-between pt-2">
          <button
            className="rounded-full w-8 h-8 border-2 hover:border-[#ff5a5f] hover:bg-[#ff5a5f] hover:text-white transition-all duration-200"
            onClick={() => decline()}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <button
            className="rounded-full w-8 h-8 border-2 hover:border-[#ff5a5f] hover:bg-[#ff5a5f] hover:text-white transition-all duration-200"
            onClick={() => increase()}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        <div className="flex justify-center space-x-2 w-full pt-5">
          <div className="relative w-full h-12">
            <div className="absolute font-thin left-3 top-1">Giá tối thiểu</div>
            <div className="absolute text-[#ff5a5f] -bottom-6">
              {errorValueInput}
            </div>
            <input
              onChange={(e) => dispatch(handleChangeValueInput(e.target.value))}
              type="number"
              value={valueInputPriceMin}
              className="border border-stone-500 w-full h-full rounded-md px-5 pt-5 font-medium"
            />
          </div>
          <div className="relative w-full h-12">
            <div className="absolute font-thin left-3 top-1">Giá tối đa</div>
            <input
              readOnly={true}
              value={priceMax}
              className="border border-stone-500 w-full h-full rounded-md px-5 pt-5 font-medium"
            />
          </div>
        </div>
      </>
    </div>
  );
}
