import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router, Route, Link, Switch, BrowserRouter } from 'react-router-dom'
import Home from './components/weather/Home';
import Favorites from './components/weather/Favorites';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './components/weather/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import { cityadd } from './components/weather/actions'
const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(ReduxThunk)
  )

)
export default store;

ReactDOM.render(

  <Provider store={store}>
    <div>
      <Router>
        <React.StrictMode>
          <div className="routerbttn">
            <div className="btntop">
              <div> <Link to='/'><button className="home">Home</button></Link></div>
              <div><Link to='/Favorites'><button className="favorites">Favorites</button></Link></div>
            </div>
          </div>

        </React.StrictMode>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/favorites" component={Favorites} />
        </Switch>
      </Router>
    </div>
  </Provider>,

  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
