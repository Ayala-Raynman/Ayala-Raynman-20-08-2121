import { createStore, applyMiddleware } from 'redux';
//צריך את הרדיוסר
// import {reducer} from './reducers';
import reducer from '../weather/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import produce from 'immer';

//סטיט התחלתי יכול להיות בפונקציה של הרדיוסר
//הוספת תוספים לסטור לחזק אותו
const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(ReduxThunk)
    )

)
export default store;