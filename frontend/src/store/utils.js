export const yearMonthDay = (date) => {
    date = date.split('T');
    return date[0];
};

export const truncateDesc = (desc) => {
    // console.log(desc);
    if (desc?.length >= 25) {
        const shortDesc = desc?.slice(0, 25);
        return shortDesc + "...";
    } else {
        return desc;
    }
}

