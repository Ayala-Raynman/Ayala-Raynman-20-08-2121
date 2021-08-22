import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { IComboBoxStyles, SelectableOptionMenuItemType, IButtonStyles, } from '@fluentui/react';
import DatePicker from "react-datepicker";
import { DialogContentText } from '@material-ui/core';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { ComboBox } from 'office-ui-fabric-react';
import 'bootstrap/dist/css/bootstrap.min.css'
import store from '../weather/store';
import { cityadd, removecity } from '../weather/actions';
import './Home.css'
export default function Home() {
    const APIKEY = "ty8hEdkXcv7m3CXkNgV0SNzigOGsuNDX";
    const [locationKey, setLocationKey] = useState(210841);
    const [location, setLocation] = useState({});
    const [letter, setLetter] = useState("tel aviv");
    const [country, setCountry] = useState("");
    const [cityList, setCityList] = useState([]);
    const [option, setOption] = useState([{ id: 0, LocalizedName: "" }]);
    const [details, setDetails] = useState([]);
    const [fivedays, setFivedays] = useState([]);
    const [city, setCity] = useState([{}]);
    const [favorites, setFavorites] = useState([]);
    const [flag, setFlag] = useState(1);

    useEffect(() => {

        setCity(store.getState().defultCity)
        setLocationKey(store.getState().defultCity.Key);
        cityDetails(store.getState().defultCity.Key);
        // localStorage.setItem("my_colors", JSON.stringify(colors)); //store colors
        // var storedColors = JSON.parse(localStorage.getItem("myFavorites")); //get them b
    }, []);
    //get function to autocomplete
    function getlocation() {
        return axios.get('http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=' + APIKEY + '&q=' + letter + '&language=en')
            .then(res => res.data);
    }
    //insert the autocomplete to list
    function autocomplete() {
        getlocation().then(data => setCityList(data));

    }
    // function saveList() {
    //     localStorage.setItem("myFavorites", JSON.stringify(store.getState().arr)); //store colors
    // }

    //get function for finding the temperature of a particular city
    async function findTemperature(locationKey) {
        return axios.get("http://dataservice.accuweather.com/currentconditions/v1/" + locationKey + "?apikey=" + APIKEY + "&details=true&language=en")
            .then(res => res.data);

    }
    //update city temperature details 
    async function cityDetails(locationKey) {
        findTemperature(locationKey).then(data => setDetails(data))
        DetailsFor5Dais(locationKey)
    }
    //get function for finding a forecast for the next 5 days
    function tempfor5days(locationKey) {
        return axios.get('http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + locationKey + '?apikey=' + APIKEY + '&language=en&details=false&metric=false')
            .then(res => res.data);
    }
    //Update temperature details for 5 days
    function DetailsFor5Dais(locationKey) {
        tempfor5days(locationKey).then(data => setFivedays(data.DailyForecasts))
    };
    function convertDay(day) {
        var day = new Date(day);
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dayName = days[day.getDay()];
        return dayName;
    }
    function convertDate(day) {
        var currentDate = new Date(day);
        var date = currentDate.getDate();
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();
        var dateString = date + "-" + (month + 1) + "-" + year;
        return dateString;
    }
    function isAddRemoveFavorite() {
        let found = store.getState().arr.find(item => item.Key == city.Key);
        if (found != null)
            setFlag(0);
        else
            setFlag(1);
    }
    // addfavorite
    function addfavorite(city) {
        store.dispatch(cityadd(city));
        setFlag(flag - 1)
    }
    //removefavorite
    function removefavorite() {
        store.dispatch(removecity(city.Key));
    }
    return (
        <div>
            <div className="hello" updateBackground ></div>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <div className="btnhome">
                <Combobox aria-label="Cities">
                    <ComboboxInput
                        className="city-search-input"
                        onChange={e => { setLetter(e.target.value) }}
                    />
                    {autocomplete()}
                    {cityList && (
                        <ComboboxPopover className="shadow-popup">
                            {cityList.length > 0 ? (
                                <ComboboxList>
                                    {cityList.map((i, item) => (
                                        <ComboboxOption
                                            key={item}
                                            value={i.LocalizedName}
                                            label="search city.."
                                            onClick={e => <div>{setLocationKey(i.Key)},{setLetter(i.LocalizedName)},{setCountry(i.Country.LocalizedName)},{setCity(i)},</div>} />
                                    ))}
                                </ComboboxList>
                            ) : (
                                <span style={{ display: "block", margin: 8 }}>
                                    No results found
                                </span>
                            )}
                        </ComboboxPopover>
                    )}
                </Combobox>

                <button onClick={e => <div> {cityDetails(locationKey)},{isAddRemoveFavorite()}</div>}>Search</button>
                {
                    flag ?
                        <button onClick={e => { addfavorite(city) }}>Add to Favorites</button> :
                        <button onClick={e => { removefavorite() }}> Remove from Favorites</button>
                }
                <div>
                </div>
                <div class="page-content page-container" id="page-content">
                    <div class="padding">
                        <div class="row container d-flex justify-content-center">
                            <div class="col-lg-8 grid-margin stretch-card">
                                {/* <!--weather card--> */}
                                <div class="card card-weather">
                                    <div class="card-body">
                                        <div class="weather-date-location">
                                            {details.map(i => <h3>{convertDay(i.LocalObservationDateTime)}</h3>)}
                                            <p class="text-gray"> <span class="weather-date">{details.map(i => convertDate(i.LocalObservationDateTime))}</span> <span
                                                class="weather-location">{city.LocalizedName},{country}</span> </p>
                                        </div>
                                        <div class="weather-data d-flex">
                                            <div class="mr-auto">
                                                <h4 class="display-3">{details.map(i => i.Temperature.Metric.Value)} <span class="symbol">°</span>C</h4>
                                                <p> {details.length > 0 ? <div> <h3>{details.map(i => i.WeatherText)}</h3></div> : ''} </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body p-0">
                                        {
                                            details.length > 0 ? <div class="d-flex weakly-weather">
                                                {fivedays.map(i => <div class="weakly-weather-item"><p class='mb-1'>{convertDay(i.Date)}</p><i class="mdi mdi-weather-partlycloudy"></i><p class="mb-0"> {i.Temperature.Minimum.Value}</p></div>)}
                                            </div> : 'erroeee'
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >

    );

}