import { getForecast, searchGeoLocation } from "../scripts/api.js";
import { currentCity, currentForecast } from "../scripts/states.js";
import { milisecondToAmPm, timeFromXtoX } from "../scripts/utils.js";

class TodayForecast extends HTMLElement {
    constructor() {
        super();
        const forecast = currentForecast;
        var today = new Date();
        var date =
            today.getFullYear() +
            "/" +
            (today.getMonth() + 1) +
            "/" +
            today.getDate();
        this.innerHTML = `
        <div class="container mx-auto space-y-6">
            <!-- Current Weather -->
            <div class="p-5 bg-white ">
                <div class="flex justify-between items-end">
                    <h3 class="font-bold text-rose-500 uppercase text-lg">Current Weather</h3>
                    <p class="font-bold text-rose-500 text-lg">Date: ${date}</p>
                </div>
                <div class="grid grid-cols-4 gap-4 py-6">
                    <div class="text-center">
                        <img src="http://openweathermap.org/img/wn/${
                            forecast?.current.weather[0].icon
                        }.png" class="w-24 h-24 mx-auto" alt="weather icon"/>
                        <p class="text-gray-700">${
                            forecast?.current.weather[0].main
                        }</p>
                    </div>
                    <div class="flex justify-center items-center w-full">
                        <div class="text-left">
                            <h2 class="text-xl md:text-2xl lg:text-4xl uppercase">${
                                forecast?.current.temp
                            } °C</h2>
                            <p class="text-gray-700 text-sm md:text-md">Real Feel ${
                                forecast?.current.feels_like
                            }°</p>
                        </div>
                    </div>
                    <div class="col-span-2 flex justify-start md:justify-center items-center w-full">
                        <div class="text-left ">
                            <p class="test">Sunrise: <span class="ml-4">${milisecondToAmPm(
                                forecast?.current.sunrise,
                                forecast?.timezone_offset
                            )}</span> </p>
                            <p class="test2">Sunset: <span class="ml-4">${milisecondToAmPm(
                                forecast?.current.sunset,
                                forecast?.timezone_offset
                            )}</span></p>
                            <p>Duration: ${timeFromXtoX(
                                forecast?.current.sunrise,
                                forecast?.current.sunset
                            )} </p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End current weather -->

            <!-- Hourly Weather -->
            <div class="p-5 bg-white">
                <h3 class="font-bold text-rose-500 uppercase text-lg">Current Weather</h3>
                <div class="overflow-auto">
                    <table class="min-w-full flex table-auto whitespace-nowrap text-left ">
                        <thead class="flex flex-col sticky left-0 bg-white z-10 font-bold" >
                            <tr>
                                <td class="long headcol  z-10 pr-2">Today</td>
                            </tr>
                            <tr>
                                <td class="long headcol pr-2"> ${"-"}</td>
                            </tr> 
                            <tr>
                                <td class="long headcol pr-2">Forecast</td>
                            </tr>
                            <tr>
                                <td class="long headcol pr-2">Temp (℃)</td>
                            </tr>
                            <tr>
                                <td class="long headcol pr-2">Real Feel</td>
                            </tr>
                            <tr>
                                <td class="long headcol pr-2">Wind (km/h)</td>
                            </tr>
                        </thead>
                        <tbody class="flex">
                            ${forecast?.hourly.map((h) => {
                                return ` <tr class="flex flex-col">
                                        <td class="long font-bold">${milisecondToAmPm(
                                            h.dt,
                                            forecast?.timezone_offset
                                        )}</td>
                                        <td>
                                            <img src="http://openweathermap.org/img/wn/${
                                                forecast?.current.weather[0]
                                                    .icon
                                            }.png" class="pl-8 absolute top-0 left-0 right-0 bottom-0" alt="weather icon"/>
                                        </td>
                                        <td class="long">${
                                            h.weather[0].main
                                        }</td>
                                        <td class="long">${h.temp}°</td>
                                        <td class="long">${h.feels_like}°</td>
                                        <td class="long">${h.wind_speed}</td>
                                    </tr>
                                `;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- End Hourly Weather -->

            <!-- Nearby Places -->
            <div class="p-5 bg-white">
                <h3 class="font-bold text-rose-500 uppercase text-lg">Nearby Places</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                    <div class="flex items-center p-2 bg-gray-100">
                        <p class="grow text-lg font-bold text-gray-500">Cambodia</p>
                        <i class="fa-solid fa-sun text-yellow-300 text-2xl px-4"></i>
                        <p class="text-lg px-4">39 C</p>
                    </div>
                    <div class="flex items-center p-2 bg-gray-100">
                        <p class="grow text-lg font-bold text-gray-500">Cambodia</p>
                        <i class="fa-solid fa-sun text-yellow-300 text-2xl px-4"></i>
                        <p class="text-lg px-4">39 C</p>
                    </div>
                    <div class="flex items-center p-2 bg-gray-100">
                        <p class="grow text-lg font-bold text-gray-500">Cambodia</p>
                        <i class="fa-solid fa-sun text-yellow-300 text-2xl px-4"></i>
                        <p class="text-lg px-4">39 C</p>
                    </div>
                    <div class="flex items-center p-2 bg-gray-100">
                        <p class="grow text-lg font-bold text-gray-500">Cambodia</p>
                        <i class="fa-solid fa-sun text-yellow-300 text-2xl px-4"></i>
                        <p class="text-lg px-4">39 C</p>
                    </div>
                </div>
            </div>
            <!-- End Nearby Places -->
        </div>
        `;
    }
}

customElements.define("today-forecast", TodayForecast);
