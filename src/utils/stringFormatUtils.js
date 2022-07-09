export const truncate = (input, length) =>
    input?.length > length ? `${input.substring(0, length)}...` : input;
export const lowerCaselizeString = (input) => {
    return input.toLowerCase();
};
export const convertLocaleString = (input) => {
    return Number.parseFloat(input).toLocaleString();
};
