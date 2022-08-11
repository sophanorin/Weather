import { getForecast, getLocation } from "./api.js";
import { currentCity } from "./states.js";

$(async function () {
    // get current location on start
    const location = await getLocation();
    await getForecast(location[0]);
    const main = $("main");
    main.append(`<today-forecast></today-forecast>`);
});
