
// import {ADD_CITY} from './actions';
import * as actions from '../weather/actionTypes';
import { getLastFocusable } from '@fluentui/react';
// import {reducer} from './reducers';

// import {City} from '../redux/interface.ts';


const arr = { id: "mi", name: "nnnn" };

//או ערך אפס למונה
//כול רדיוס צריך משתני ם אתחלתיים בנתיים זה יה שם אר כך נרא הלי מערך ריק של ערים
const initialState = {
    arr: [],
    defultCity: {
        "Version": 1,
        "Key": "215854",
        "Type": "City",
        "Rank": 31,
        "LocalizedName": "Tel Aviv",
        "Country": {
            "ID": "IL",
            "LocalizedName": "Israel"
        },
        "AdministrativeArea": {
            "ID": "TA",
            "LocalizedName": "Tel Aviv"
        }
    }

}
//normally use ES6 default argument syntax to provide initial state
//בהרצה הראשנית סטי הוא אנדפיין אז לכן הוא יקבל את האינשל
export default function reducer(state = initialState, action) {
    switch (action.type) {
        //אם האקשן הוא הוספת עיר
        case actions.ADD_CITY:
            return {
                ...state,


                //המערך החדש יהיה המערך הקודם פלוס מה שיש לנו בפאילוד של אקשן
                arr: state.arr.concat(action.paylaod)

            };
        case actions.REMOVE_CITY:
            return {
                ...state,
                arr: [...state.arr.filter(({ Key }) => Key !== action.Key)]
            };
        case actions.FAVORITECIRY:
            return {
                ...state,
                defultCity: action.obj
            }


        default:
            return state;

    }
}