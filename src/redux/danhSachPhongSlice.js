import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { phongService } from "../services/phongService";
import {
  arrConvenient,
  bath,
  bedRoom,
  DECLINE,
  guests,
  handleCompareDataJSON,
  handleDataReduce,
  handleErrorValueInput,
  INCREASE,
  loopDefault,
  loopReset,
  switchCaseKeyObj,
} from "../utils/danhSachPhong.util";

let initialState = {
  danhSachPhong: [],
  dataSave: [],
  averagePrice: 0,
  priceMax: 0,
  priceMin: 0,
  percent: 0,
  valueInputPriceMin: 0,
  errorValueInput: "",
  dataGuests: [],
  dataBedRoom: [],
  dataBath: [],
  valueCheckbox: [],
  // dataCheckbox 0 - 10 là dùng để check các trường hợp trong checkbox, 11 là lưu giá trị cho checkbox, 12 lưu giá trị cho khoảng giá, 13,14,15 là lưu giá trị cho khách, phòng ngủ và phòng tắm
  dataCheckbox: [],
  dataValueButton: [
    { name: guests, value: 0 },
    { name: bedRoom, value: 0 },
    { name: bath, value: 0 },
  ],
  dataSelectButtonDefault: [],
};

export const getDanhSachPhong = createAsyncThunk(
  "danhSachPhongSlice/fetchGetDataPhong",
  async (idViTri, thunkAPI) => {
    try {
      let result = await phongService.layDanhSachPhongTuViTri(idViTri);
      return result.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

const danhSachPhongSlice = createSlice({
  name: "danhSachPhongSlice",
  initialState,
  reducers: {
    // reducer trong khoảng giá
    handleChangePercent: (state, { payload }) => {
      let valueInputUpdate = 0;
      let priceLimit = state.priceMax - state.priceMin;

      if (payload === INCREASE) {
        if (state.percent >= 100) {
          state.percent = 100;
          state.valueInputPriceMin = state.priceMax;
          valueInputUpdate = 0;
        } else {
          state.percent += payload;
          valueInputUpdate = priceLimit / INCREASE;
          state.valueInputPriceMin =
            state.valueInputPriceMin + valueInputUpdate;
        }
      } else if (payload === DECLINE) {
        if (state.percent <= 0) {
          state.percent = 0;
          state.valueInputPriceMin = state.priceMin;
          valueInputUpdate = 0;
        } else {
          state.percent += payload;
          valueInputUpdate = priceLimit / INCREASE;
          state.valueInputPriceMin =
            state.valueInputPriceMin - valueInputUpdate;
        }
      }
      state.errorValueInput = handleErrorValueInput(
        state.valueInputPriceMin,
        state.priceMax,
        state.priceMin
      );
      let dataUpdate = [];
      if (state.dataCheckbox[12].length > 0) {
        dataUpdate = state.dataCheckbox[12].filter(
          (item) =>
            item.price >= state.valueInputPriceMin &&
            item.price <= state.priceMax
        );
      } else {
        dataUpdate = state.danhSachPhong.filter(
          (item) =>
            item.price >= state.valueInputPriceMin &&
            item.price <= state.priceMax
        );
      }
      state.danhSachPhong = dataUpdate;
      state.dataCheckbox[11] = dataUpdate;
      state.dataSelectButtonDefault[3] = dataUpdate;
      state.dataSelectButtonDefault[4] = dataUpdate;
      state.dataSelectButtonDefault[5] = dataUpdate;
      state.averagePrice = dataUpdate?.reduce((average, data) => {
        return (average += data.price);
      }, 0);
    },
    handleChangeValueInput: (state, { payload }) => {
      let percentUpdate = 0;

      state.valueInputPriceMin = payload;
      percentUpdate = (state.valueInputPriceMin / state.priceMax) * 100;
      state.percent = percentUpdate;
      state.errorValueInput = handleErrorValueInput(
        state.valueInputPriceMin,
        state.priceMax,
        state.priceMin
      );
      let dataUpdate = [];
      if (state.dataCheckbox[12].length > 0) {
        dataUpdate = state.dataCheckbox[12].filter(
          (item) =>
            item.price >= state.valueInputPriceMin &&
            item.price <= state.priceMax
        );
      } else {
        dataUpdate = state.danhSachPhong.filter(
          (item) =>
            item.price >= state.valueInputPriceMin &&
            item.price <= state.priceMax
        );
      }
      state.danhSachPhong = dataUpdate;
      state.dataCheckbox[11] = dataUpdate;
      state.averagePrice = dataUpdate?.reduce((average, data) => {
        return (average += data.price);
      }, 0);
    },

    // Tiện nghi
    handleCheckbox: (state, { payload }) => {
      let index = state.valueCheckbox.findIndex((item) => item === payload);
      if (index !== -1) {
        state.valueCheckbox.splice(index, 1);
      } else {
        state.valueCheckbox.push(payload);
      }
      let dataCheck = state.valueCheckbox
        ?.map((item) => {
          let arrUpdate = arrConvenient.filter((check) => check.id === item);
          return arrUpdate;
        })
        .flat();
      let keyObj = dataCheck.map((item) => {
        let keys = Object.keys(item).pop();
        return keys;
      });

      let arr = switchCaseKeyObj(keyObj, state.danhSachPhong);

      // xét từng trường hợp, nếu không xét như vậy mà dùng cách rút gọn sẽ gây ra lỗi
      switch (keyObj.length) {
        case 0:
          state.dataCheckbox[0] = [];
          if (state.priceMin === state.valueInputPriceMin) {
            state.danhSachPhong = state.dataSave;
          } else if (state.dataCheckbox[11].length > 0) {
            state.danhSachPhong = state.dataCheckbox[11];
          }
          state.dataSelectButtonDefault[3] = state.danhSachPhong;
          state.dataSelectButtonDefault[4] = state.danhSachPhong;
          state.dataSelectButtonDefault[5] = state.danhSachPhong;
          break;
        case 1:
          if (
            state.priceMin !== state.valueInputPriceMin &&
            state.dataCheckbox[0].length === 0
          ) {
            arr = switchCaseKeyObj(keyObj, state.danhSachPhong);
          } else if (state.dataCheckbox[0].length > 0) {
            arr = switchCaseKeyObj(keyObj, state.dataCheckbox[0]);
          }
          state.dataCheckbox[0] = arr;
          state.danhSachPhong = state.dataCheckbox[0];
          state.dataCheckbox[12] = state.dataCheckbox[0];
          state.dataSelectButtonDefault[3] = state.danhSachPhong;
          state.dataSelectButtonDefault[4] = state.danhSachPhong;
          state.dataSelectButtonDefault[5] = state.danhSachPhong;
          break;
        case 2:
          handleCompareDataJSON(
            arr,
            state.danhSachPhong,
            state.dataCheckbox,
            0,
            keyObj,
            13,
            14,
            15
          );
          state.dataCheckbox[1] = arr;
          state.dataCheckbox[12] = state.dataCheckbox[1];
          state.danhSachPhong = state.dataCheckbox[1];
          state.dataSelectButtonDefault[3] = state.danhSachPhong;
          state.dataSelectButtonDefault[4] = state.danhSachPhong;
          state.dataSelectButtonDefault[5] = state.danhSachPhong;
          break;
        case 3:
          handleCompareDataJSON(
            arr,
            state.danhSachPhong,
            state.dataCheckbox,
            1,
            keyObj,
            13,
            14,
            15
          );
          state.dataCheckbox[2] = arr;
          state.danhSachPhong = state.dataCheckbox[2];
          state.dataCheckbox[12] = state.dataCheckbox[2];
          state.dataSelectButtonDefault[3] = state.danhSachPhong;
          state.dataSelectButtonDefault[4] = state.danhSachPhong;
          state.dataSelectButtonDefault[5] = state.danhSachPhong;
          break;
        case 4:
          handleCompareDataJSON(
            arr,
            state.danhSachPhong,
            state.dataCheckbox,
            2,
            keyObj,
            13,
            14,
            15
          );
          state.dataCheckbox[3] = arr;
          state.danhSachPhong = state.dataCheckbox[3];
          state.dataCheckbox[12] = state.dataCheckbox[3];
          state.dataSelectButtonDefault[3] = state.danhSachPhong;
          state.dataSelectButtonDefault[4] = state.danhSachPhong;
          state.dataSelectButtonDefault[5] = state.danhSachPhong;
          break;
        case 5:
          handleCompareDataJSON(
            arr,
            state.danhSachPhong,
            state.dataCheckbox,
            3,
            keyObj,
            13,
            14,
            15
          );
          state.dataCheckbox[4] = arr;
          state.danhSachPhong = state.dataCheckbox[4];
          state.dataCheckbox[13] = state.dataCheckbox[4];
          state.dataSelectButtonDefault[3] = state.danhSachPhong;
          state.dataSelectButtonDefault[4] = state.danhSachPhong;
          state.dataSelectButtonDefault[5] = state.danhSachPhong;
          break;
        case 6:
          handleCompareDataJSON(
            arr,
            state.danhSachPhong,
            state.dataCheckbox,
            4,
            keyObj,
            13,
            14,
            15
          );
          state.dataCheckbox[5] = arr;
          state.danhSachPhong = state.dataCheckbox[5];
          state.dataCheckbox[12] = state.dataCheckbox[5];
          state.dataSelectButtonDefault[3] = state.danhSachPhong;
          state.dataSelectButtonDefault[4] = state.danhSachPhong;
          state.dataSelectButtonDefault[5] = state.danhSachPhong;
          break;
        case 7:
          handleCompareDataJSON(
            arr,
            state.danhSachPhong,
            state.dataCheckbox,
            5,
            keyObj,
            13,
            14,
            15
          );
          state.dataCheckbox[6] = arr;
          state.danhSachPhong = state.dataCheckbox[6];
          state.dataCheckbox[12] = state.dataCheckbox[6];
          state.dataSelectButtonDefault[3] = state.danhSachPhong;
          state.dataSelectButtonDefault[4] = state.danhSachPhong;
          state.dataSelectButtonDefault[5] = state.danhSachPhong;
          break;
        case 8:
          handleCompareDataJSON(
            arr,
            state.danhSachPhong,
            state.dataCheckbox,
            6,
            keyObj,
            13,
            14,
            15
          );
          state.dataCheckbox[7] = arr;
          state.danhSachPhong = state.dataCheckbox[7];
          state.dataCheckbox[12] = state.dataCheckbox[7];
          state.dataSelectButtonDefault[3] = state.danhSachPhong;
          state.dataSelectButtonDefault[4] = state.danhSachPhong;
          state.dataSelectButtonDefault[5] = state.danhSachPhong;
          break;
        case 9:
          handleCompareDataJSON(
            arr,
            state.danhSachPhong,
            state.dataCheckbox,
            7,
            keyObj,
            13,
            14,
            15
          );
          state.dataCheckbox[8] = arr;
          state.danhSachPhong = state.dataCheckbox[8];
          state.dataCheckbox[12] = state.dataCheckbox[8];
          state.dataSelectButtonDefault[3] = state.danhSachPhong;
          state.dataSelectButtonDefault[4] = state.danhSachPhong;
          state.dataSelectButtonDefault[5] = state.danhSachPhong;
          break;
        case 10:
          handleCompareDataJSON(
            arr,
            state.danhSachPhong,
            state.dataCheckbox,
            8,
            keyObj,
            13,
            14,
            15
          );
          state.dataCheckbox[9] = arr;
          state.danhSachPhong = state.dataCheckbox[9];
          state.dataCheckbox[12] = state.dataCheckbox[9];
          state.dataSelectButtonDefault[3] = state.danhSachPhong;
          state.dataSelectButtonDefault[4] = state.danhSachPhong;
          state.dataSelectButtonDefault[5] = state.danhSachPhong;
          break;
        default:
          break;
      }
    },

    // Khách, phòng và phòng ngủ
    handleValueButton: (state, { payload }) => {
      let dataNew = [];
      switch (payload.name) {
        case guests:
          state.dataValueButton[0] = payload;
          if (payload.value === 0) {
            dataNew = state.dataSelectButtonDefault[3].filter(
              (item) => item[guests] >= payload.value
            );
          } else if (
            state.dataCheckbox[11].length === 0 &&
            state.dataCheckbox[12].length === 0 &&
            state.dataCheckbox[13].length === 0 &&
            state.dataCheckbox[14].length === 0 &&
            state.dataCheckbox[15].length === 0
          ) {
            dataNew = state.dataSave.filter(
              (item) => item[guests] >= payload.value
            );
          } else if (
            JSON.stringify(state.danhSachPhong) ===
            JSON.stringify(state.dataCheckbox[11])
          ) {
            dataNew = state.dataCheckbox[11].filter(
              (item) => item[guests] >= payload.value
            );
          } else if (
            JSON.stringify(state.danhSachPhong) ===
            JSON.stringify(state.dataCheckbox[12])
          ) {
            dataNew = state.dataCheckbox[12].filter(
              (item) => item[guests] >= payload.value
            );
          } else if (
            JSON.stringify(state.danhSachPhong) ===
            JSON.stringify(state.dataCheckbox[13])
          ) {
            dataNew = state.dataSelectButtonDefault[0].filter(
              (item) => item[guests] >= payload.value
            );
          } else if (
            JSON.stringify(state.danhSachPhong) ===
            JSON.stringify(state.dataCheckbox[14])
          ) {
            dataNew = state.dataCheckbox[14].filter(
              (item) => item[guests] >= payload.value
            );
            state.dataSelectButtonDefault[0] = dataNew;
          } else if (
            JSON.stringify(state.danhSachPhong) ===
            JSON.stringify(state.dataCheckbox[15])
          ) {
            dataNew = state.dataCheckbox[15].filter(
              (item) => item[guests] >= payload.value
            );
            state.dataSelectButtonDefault[0] = dataNew;
          }
          if (state.dataSelectButtonDefault[0].length === 0) {
            state.dataSelectButtonDefault[0] = dataNew;
          }

          state.dataCheckbox[13] = dataNew;
          state.danhSachPhong = dataNew;

          break;
        case bedRoom:
          state.dataValueButton[1] = payload;

          if (payload.value === 0) {
            dataNew = state.dataSelectButtonDefault[4].filter(
              (item) => item[bedRoom] >= payload.value
            );
          } else if (
            state.dataCheckbox[11].length === 0 &&
            state.dataCheckbox[12].length === 0 &&
            state.dataCheckbox[13].length === 0 &&
            state.dataCheckbox[14].length === 0 &&
            state.dataCheckbox[15].length === 0
          ) {
            dataNew = state.dataSave.filter(
              (item) => item[bedRoom] >= payload.value
            );
          } else if (
            JSON.stringify(state.danhSachPhong) ===
            JSON.stringify(state.dataCheckbox[11])
          ) {
            dataNew = state.dataCheckbox[11].filter(
              (item) => item[bedRoom] >= payload.value
            );
          } else if (
            JSON.stringify(state.danhSachPhong) ===
            JSON.stringify(state.dataCheckbox[12])
          ) {
            dataNew = state.dataCheckbox[12].filter(
              (item) => item[bedRoom] >= payload.value
            );
          } else if (
            JSON.stringify(state.danhSachPhong) ===
            JSON.stringify(state.dataCheckbox[14])
          ) {
            dataNew = state.dataSelectButtonDefault[1].filter(
              (item) => item[bedRoom] >= payload.value
            );
          } else if (
            JSON.stringify(state.danhSachPhong) ===
            JSON.stringify(state.dataCheckbox[13])
          ) {
            dataNew = state.dataCheckbox[13].filter(
              (item) => item[bedRoom] >= payload.value
            );
            state.dataSelectButtonDefault[1] = dataNew;
          } else if (
            JSON.stringify(state.danhSachPhong) ===
            JSON.stringify(state.dataCheckbox[15])
          ) {
            dataNew = state.dataCheckbox[15].filter(
              (item) => item[bedRoom] >= payload.value
            );
            state.dataSelectButtonDefault[1] = dataNew;
          }
          if (state.dataSelectButtonDefault[1].length === 0) {
            state.dataSelectButtonDefault[1] = dataNew;
          }

          state.dataCheckbox[14] = dataNew;
          state.danhSachPhong = dataNew;
          break;
        case bath:
          state.dataValueButton[2] = payload;
          if (payload.value === 0) {
            dataNew = state.dataSelectButtonDefault[5].filter(
              (item) => item[bath] >= payload.value
            );
          } else if (
            state.dataCheckbox[11].length === 0 &&
            state.dataCheckbox[12].length === 0 &&
            state.dataCheckbox[13].length === 0 &&
            state.dataCheckbox[14].length === 0 &&
            state.dataCheckbox[15].length === 0
          ) {
            dataNew = state.dataSave.filter(
              (item) => item[bedRoom] >= payload.value
            );
          } else if (
            JSON.stringify(state.danhSachPhong) ===
            JSON.stringify(state.dataCheckbox[11])
          ) {
            dataNew = state.dataCheckbox[11].filter(
              (item) => item[bedRoom] >= payload.value
            );
          } else if (
            JSON.stringify(state.danhSachPhong) ===
            JSON.stringify(state.dataCheckbox[12])
          ) {
            dataNew = state.dataCheckbox[12].filter(
              (item) => item[bedRoom] >= payload.value
            );
          } else if (
            JSON.stringify(state.danhSachPhong) ===
            JSON.stringify(state.dataCheckbox[15])
          ) {
            dataNew = state.dataSelectButtonDefault[2].filter(
              (item) => item[bedRoom] >= payload.value
            );
          } else if (
            JSON.stringify(state.danhSachPhong) ===
            JSON.stringify(state.dataCheckbox[13])
          ) {
            dataNew = state.dataCheckbox[13].filter(
              (item) => item[bedRoom] >= payload.value
            );
            state.dataSelectButtonDefault[2] = dataNew;
          } else if (
            JSON.stringify(state.danhSachPhong) ===
            JSON.stringify(state.dataCheckbox[14])
          ) {
            dataNew = state.dataCheckbox[14].filter(
              (item) => item[bedRoom] >= payload.value
            );
            state.dataSelectButtonDefault[2] = dataNew;
          }
          if (state.dataSelectButtonDefault[2].length === 0) {
            state.dataSelectButtonDefault[2] = dataNew;
          }

          state.dataCheckbox[15] = dataNew;
          state.danhSachPhong = dataNew;
          break;
        default:
          break;
      }
    },
  },
  extraReducers: {
    [getDanhSachPhong.fulfilled]: (state, { payload }) => {
      state.danhSachPhong = payload;
      state.dataSave = payload;
      // khoảng giá
      state.averagePrice = payload?.reduce((average, data) => {
        return (average += data.price);
      }, 0);

      let arrPrice = state.danhSachPhong?.reduce((arr, data) => {
        return [...arr, data.price];
      }, []);
      state.priceMax = Math.max(...arrPrice);
      state.priceMin = Math.min(...arrPrice);
      state.valueInputPriceMin = state.priceMin;

      // Tạo vòng lặp để tạo tất cả mảng rỗng
      loopDefault(state.dataCheckbox, 15);
      loopDefault(state.dataSelectButtonDefault, 5);

      // Khách và phòng ngủ
      state.dataGuests = handleDataReduce(payload, guests);
      state.dataBedRoom = handleDataReduce(payload, bedRoom);
      state.dataBath = handleDataReduce(payload, bath);
    },
    [getDanhSachPhong.pending]: (state) => {
      state.danhSachPhong = [];
    },
  },
});

// actions trong khoảng giá
export const handleChangePercent = createAction(
  "danhSachPhongSlice/handleChangePercent",
  (value) => {
    return { payload: value };
  }
);

export const handleChangeValueInput = createAction(
  "danhSachPhongSlice/handleChangeValueInput",
  (value) => {
    let valueUpdate = Number(value);
    return { payload: valueUpdate };
  }
);

// actions tiện nghi
export const handleCheckbox = createAction(
  "danhSachPhongSlice/handleCheckbox",
  (value) => {
    let valueUpdate = Number(value);
    return { payload: valueUpdate };
  }
);

// actions khách, phòng và phòng tắm
export const handleValueButton = createAction(
  "danhSachPhongSlice/handleValueButton",
  (value, name) => {
    let valueUpdate = Number(value);
    let key = { name, value: valueUpdate };
    return { payload: key };
  }
);

export default danhSachPhongSlice.reducer;
