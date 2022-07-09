import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleValueButton } from "../../redux/danhSachPhongSlice";

export default function PhongNgu() {
  const { dataValueButton } = useSelector((state) => state.danhSachPhongSlice);
  const { dataGuests } = useSelector((state) => state.danhSachPhongSlice);
  const { dataBedRoom } = useSelector((state) => state.danhSachPhongSlice);
  const { dataBath } = useSelector((state) => state.danhSachPhongSlice);
  let dispatch = useDispatch();

  let renderSoLuongKhach = () => {
    return dataGuests?.map((item, index) => {
      return (
        <button
          name="guests"
          value={item}
          key={index}
          onClick={(e) =>
            dispatch(handleValueButton(e.target.value, e.target.name))
          }
          className={`font-medium py-2 px-5 border rounded-2xl hover:border-black transition-all duration-300 ${
            dataValueButton[0].value === item ? "bg-black text-white" : ""
          }`}
        >
          {item}
        </button>
      );
    });
  };

  let renderPhongNgu = () => {
    return dataBedRoom?.map((item, index) => {
      return (
        <button
          name="bedRoom"
          value={item}
          key={index}
          onClick={(e) =>
            dispatch(handleValueButton(e.target.value, e.target.name))
          }
          className={`font-medium py-2 px-5 border rounded-2xl hover:border-black transition-all duration-300 ${
            dataValueButton[1].value === item ? "bg-black text-white" : ""
          }`}
        >
          {item}
        </button>
      );
    });
  };

  let renderPhongTam = () => {
    return dataBath?.map((item, index) => {
      return (
        <button
          name="bath"
          value={item}
          key={index}
          onClick={(e) =>
            dispatch(handleValueButton(e.target.value, e.target.name))
          }
          className={`font-medium py-2 px-5 border rounded-2xl hover:border-black transition-all duration-300 ${
            dataValueButton[2].value === item ? "bg-black text-white" : ""
          }`}
        >
          {item}
        </button>
      );
    });
  };

  return (
    <div className="py-8 border-b">
      <div className="text-xl font-medium pb-4">Khách và phòng ngủ</div>
      <div className="text-lg">Khách</div>
      <div className="flex justify-start p-4 space-x-4">
        <button
          name="guests"
          value={0}
          className={`font-medium py-2 px-5 border rounded-2xl hover:border-black transition-all duration-300 ${
            dataValueButton[0].value === 0 ? "bg-black text-white" : ""
          }`}
          onClick={(e) =>
            dispatch(handleValueButton(e.target.value, e.target.name))
          }
        >
          Bất kì
        </button>
        {renderSoLuongKhach()}
      </div>
      <div className="text-lg">Phòng ngủ</div>
      <div className="flex justify-start p-4 space-x-4">
        <button
          name="bedRoom"
          value={0}
          className={`font-medium py-2 px-5 border rounded-2xl hover:border-black transition-all duration-300 ${
            dataValueButton[1].value === 0 ? "bg-black text-white" : ""
          }`}
          onClick={(e) =>
            dispatch(handleValueButton(e.target.value, e.target.name))
          }
        >
          Bất kì
        </button>
        {renderPhongNgu()}
      </div>
      <div className="text-lg">Phòng tắm</div>
      <div className="flex justify-start p-4 space-x-4">
        <button
          name="bath"
          value={0}
          className={`font-medium py-2 px-5 border rounded-2xl hover:border-black transition-all duration-300 ${
            dataValueButton[2].value === 0 ? "bg-black text-white" : ""
          }`}
          onClick={(e) =>
            dispatch(handleValueButton(e.target.value, e.target.name))
          }
        >
          Bất kì
        </button>
        {renderPhongTam()}
      </div>
    </div>
  );
}
