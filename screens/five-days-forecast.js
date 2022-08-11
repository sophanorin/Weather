import { currentForecast } from "../scripts/states.js";
import {
    milisecondsToDay,
    milisecondsToMonth,
    milisecondToAmPm,
} from "../scripts/utils.js";

class FiveDaysForecast extends HTMLElement {
    constructor() {
        super();
        const forecast = currentForecast;
        this.innerHTML = `
        <div class="container mx-auto space-y-6">
            <div class="flex justify-start divide-x overflow-auto">
            ${forecast?.daily.map((f) => {
                return `
                <div
                    class="hover:bg-rose-200 card hover:cursor-pointer min-w-[150px] max-w-[200px] bg-gray-100 flex flex-col justify-start items-center p-4">
                    <div class="text-left">
                        <h3 class="upppercase text-rose-500 text-lg font-bold">${milisecondsToDay(
                            f.dt,
                            forecast.timezone_offset
                        )}</h3>
                        <p class="text-gray-400 uppercase">${milisecondsToMonth(
                            f.dt,
                            forecast.timezone_offset
                        )}</p>
                        <img src="http://openweathermap.org/img/wn/${
                            f.weather[0].icon
                        }.png" class="w-24 h-24 mx-auto" alt="weather icon"/>
                        <h4 class="text-xl">${(
                            (f.temp.min + f.temp.max) /
                            2
                        ).toFixed(2)} °C</h4>
                        <div class="flex">
                            <span class="text-gray-400 capitalize">${
                                f.weather[0].main
                            }</span>
                        </div>
                    </div>
                </div>
            `;
            })}
                
        </div>
        <!-- Hourly Weather -->
        <div class="p-5 bg-white">
            <h3 class="font-bold text-rose-500 uppercase text-lg">Hourly</h3>
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
                            return ` 
                            <tr class="flex flex-col">
                                <td class="long font-bold">${milisecondToAmPm(
                                    h.dt,
                                    forecast?.timezone_offset
                                )}</td>
                                <td>
                                <img src="http://openweathermap.org/img/wn/${
                                    forecast?.current.weather[0].icon
                                }.png" class="pl-8 absolute top-0 left-0 right-0 bottom-0" alt="weather icon"/>
                                </td>
                                <td class="long">${h.weather[0].main}</td>
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
        </div>
      `;
    }

    connectedCallback() {
        const card = $(".card");
        card.on("click", function () {
            card.addClass("bg-gray-100");
            card.removeClass("bg-white");
            $(this).removeClass("bg-gray-100");
            $(this).addClass("bg-white");
        });
    }
}

customElements.define("five-days-forecast", FiveDaysForecast);
