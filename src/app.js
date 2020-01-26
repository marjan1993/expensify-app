import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { startSetExpenses } from "./actions/expenses";
import { login, logout } from "./actions/auth";
import getVisibleExpenses from "./selectors/expenses";
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import "react-dates/lib/css/_datepicker.css";
import 'react-dates/initialize';
import firebase from 'firebase/app'; // doing import firebase from 'firebase' or import * as firebase from firebase is not good practice. 
import 'firebase/auth';
import LoadingPage from "./components/LoadingPage"
// import "./playground/promises";

const store = configureStore();//redux store

const jsx = (
  <Provider store={store}> 
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage/>, document.getElementById('app'));



firebase.auth().onAuthStateChanged((user) => {//onAuthStateChanged takes a callback function and runs the callback function when the authentication data changed
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === "/") {
        history.push("/dashboard");
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});

