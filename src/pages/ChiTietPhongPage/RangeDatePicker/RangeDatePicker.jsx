import React from "react";
import { DatePicker } from "antd";
import "./css/datePicker.css";
const { RangePicker } = DatePicker;

export default function RangeDatePicker({ onChange = () => {} }) {
    return (
        <div>
            <RangePicker
                className="date-picker-custom"
                onCalendarChange={onChange}
            />
        </div>
    );
}
