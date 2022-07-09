import moment from "moment";

export const countDays = (from, to) => {
    return moment(from).diff(to, "days") + 1;
};
