/* eslint-disable */
export const getTimeDropped = (string_utc_date) => {
    const parsed_date = Date.parse(string_utc_date);
    const diff = Math.abs(parsed_date - Date.now()) / 1000;
    const minutes_float = diff / 60;
    let minutes_int = Math.floor(minutes_float);
    let seconds_int = Math.floor(diff - (minutes_int*60));

    minutes_int = (minutes_int < 10) ? "0" + minutes_int : minutes_int;
    seconds_int = (seconds_int < 10) ? "0" + seconds_int : seconds_int;

    return (parseInt(minutes_int) < 30 ) ?"00:"+ minutes_int + ":" + seconds_int : "disparu";
};
/* eslint-enable */

