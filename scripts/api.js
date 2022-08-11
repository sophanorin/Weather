import { currentCity, setCity, setForecast } from "./states.js";

const API_KEY = "a14507d18aed7c7ae50f9d37916c8185";

// call on search button click
const searchGeoLocation = async (cityName) => {
    const city = cityName.replaceAll(" ", "");
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`;
    return await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setCity(data[0]);
            return data;
        })
        .catch((error) => {});
};

//#region getCurrentGeoLocation

// call on getCurrentGeoLocation
const mycoords = async (position) => {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    //alert(lat+'/'+long);
    const myapi = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=5&appid=${API_KEY}`;

    return await fetch(myapi)
        .then((response) => response.json())
        .then((data) => {
            setCity(data[0]);
            // getCurrentForecast(data[0]);
            $("#input-search").val(data[0].state);
            return data;
        })
        .catch((error) => {});
};

// call on errors
const myerrors = async (error) => {
    alert(
        "WARNING! " +
            error.message +
            "!" +
            "Please, allow location or default location will be used."
    );
    const cityData = await searchGeoLocation("Phnom Penh");
    getCurrentForecast(cityData[0]);
    $("#input-search").val(currentCity?.state);
};

// call on start
const getCurrentGeoLocation = () => {
    if (window.navigator.geolocation) {
        //alert('Browser support');
        return new Promise((resolve, reject) => {
            window.navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    } else {
        alert("Browser does not support");
    }
};

const getLocation = async () => {
    return await getCurrentGeoLocation()
        .then((res) => {
            return mycoords(res);
        })
        .catch((err) => {
            myerrors(err);
        });
};
//#endregion

//#region getCurrentWeather
const getForecast = async (city) => {
    if (city) {
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${city?.lat}&lon=${city?.lon}&appid=${API_KEY}&units=metric`;
        return await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const newData = {
                    ...data,
                    daily: data?.daily.slice(1, 6),
                    hourly: data?.hourly.slice(1, 12),
                };

                setForecast(newData);
                return newData;
            })
            .catch((error) => {});
    } else {
    }
};
//#endregion

//#region getFiveDayForecast

const getFiveDaysForecast = async (city) => {
    const url = `http://api.openweathermap.org/data/2.5/onecall?lat=${city?.lat}&lon=${city?.lon}&appid=${API_KEY}&units=metric`;
    if (city) {
        return await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // const
                const daily = data?.daily.slice(1, 6);
                return data;
            })
            .catch((error) => {});
    } else {
    }
};

//#endregion

export { searchGeoLocation, getForecast, getLocation, getFiveDaysForecast };
