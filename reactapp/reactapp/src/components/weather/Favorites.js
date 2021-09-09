import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { IComboBoxStyles, SelectableOptionMenuItemType, IButtonStyles, } from '@fluentui/react';
import DatePicker from "react-datepicker";
import { DialogContentText } from '@material-ui/core';
import { HashRouter as Router, Route, Link, Switch, BrowserRouter } from 'react-router-dom'
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import './Favorites.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from '../weather/store';
import { cityadd, favoritecity } from '../weather/actions';

export default function Favorites() {
    const APIKEY = "ty8hEdkXcv7m3CXkNgV0SNzigOGsuNDX";
    const [cities, setCities] = useState([])
    const [details, setDetails] = useState([]);
    // const [tmp, setTmp] = useState(initial_data);
    const [reducre, setReducre] = useState(store.getState().arr);

    function newTemp(cityId) {
        setCities(cities => [...cities, (cityId, details.map(i => i.Temperature.Metric.Value))])
    }


    function detailstemp(locationKey) {
        temperatora(locationKey).then(data => setDetails(data))
        console.log(details)
        let t = details.map(i => i.Temperature.Metric.Value)
        console.log(t)
        return t

    }
    function temperatora(locationKey) {

        console.log(locationKey)
        return axios.get('https://dataservice.accuweather.com/currentconditions/v1/' + locationKey + '?apikey=' + APIKEY + '&language=en&details=false')
            .then(res => res.data);

    }
    function changeDefult(obj) {
        store.dispatch(favoritecity(obj));
    }


    return (
        <div>

            <div class="container d-flex justify-content-center">
                <div class="weather">
                    <div class="row">
                        {reducre.length > 0 ?

                            reducre.map(item => <div>{
                                <div class=" col-md-6">
                                    <div class="card">
                                        <div class="title">
                                            <p>{item.LocalizedName}</p>
                                        </div>
                                        <div class="temp">{detailstemp(item.Key)}<sup>&deg;</sup></div>
                                        <div class="row">
                                            <div class="link-to-home-page"> <Link to='/'><button className="home" onClick={e => changeDefult(item)}>To view the details of the forecast</button></Link></div>
                                        </div>
                                    </div>
                                </div>
                            }</div>)
                            : <h2> dont have favorites</h2>
                        }

                    </div>
                </div>
            </div>
        </div >

    )
}
