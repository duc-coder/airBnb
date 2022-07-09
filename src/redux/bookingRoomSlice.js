import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import { localSearchStorageService } from "../services/localService";
import { phongService } from "../services/phongService";

let initialState = {};
let searchValues = localSearchStorageService.getSearchInfoLocal();

//Xử lý lấy value từ localSearchStorage truyền vào initialState
if (searchValues !== null) { // localStorage đã nhận được value từ người dùng nhập vào
    initialState = {
        bookingLocation: {
            idLocation: searchValues.bookingLocation.idLocation,
            locationName: searchValues.bookingLocation.locationName,
        },
        bookingDate: {
            checkIn: searchValues.bookingDate.checkIn,
            checkOut: searchValues.bookingDate.checkOut,
        },
        customerInfo: searchValues.customerInfo,
        isBookedSuccess: false,
        totalCustomer: searchValues.totalCustomer,
    };
} else { //LocalStorage đang rỗng
    initialState = {
        bookingLocation: {
            idLocation: "",
            locationName: "",
        },
        bookingDate: {
            checkIn: null,
            checkOut: null,
        },
        customerInfo: [],
        isBookedSuccess: false,
        totalCustomer: 0,
    };
};

export const bookRoom = createAsyncThunk(
    "booking/bookRoom",
    async (data, thunkAPI) => {
        try {
            const res = await phongService.datPhong(data);
            console.log(res);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue();
        }
    }
);
export const SetCustomerInfo = createAction(
    "bookingRoom/SetCustomerInfo",
    (customerInfo) => {
        const countTotalCustomer = () => {
            return customerInfo.reduce((sum, customer) => {
                return sum + customer.soLuong;
            }, 0);
        };
        const totalCus = countTotalCustomer();
        return {
            payload: {
                customerInfo,
                totalCustomer: totalCus,
            },
        };
    }
);

const bookingRoom = createSlice({
    name: "bookingRoom",
    initialState: initialState,
    reducers: {
        setBookingDate(state, action) {
            state.bookingDate = action.payload;
        },
        setBookingLocation(state, action) {
            state.bookingLocation = action.payload;
        },
        setCustomerInfo(state, action) {
            state.customerInfo = action.payload;
        },
        setTotalCustomer(state, action) {
            state.totalCustomer = action.payload;
        },
        setBookingStatus(state, action) {
            state.isBookedSuccess = action.payload;
        },
    },
    extraReducers: {
        [bookRoom.pending]: (state, action) => {
            state.isBookedSuccess = false;
        },
        [bookRoom.fulfilled]: (state, action) => {
            state.isBookedSuccess = true;
        },
    },
});

const { reducer, actions } = bookingRoom;

export const { setBookingDate, setBookingStatus, setBookingLocation, setCustomerInfo, setTotalCustomer } = actions;

export const selectThongTinTimPhong = (state) => state.bookingRoomSlice;

export default reducer;
