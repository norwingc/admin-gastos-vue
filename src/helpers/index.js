export const formatMoney = (value) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);
};

export const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US").format(new Date(date));
};
