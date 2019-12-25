import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import "react-dates/lib/css/_datepicker.css";
import 'react-dates/initialize';

const store = configureStore();//redux store

store.dispatch(addExpense({ description : "Water bill", amount: 4500 }));
store.dispatch(addExpense({ description : "Second Rent", amount: 109500}));
store.dispatch(addExpense({ description : "Gas bill", createdAd: 1000 }));
// store.dispatch(addExpense({ description : "Rent", amount: 109500 }));
//code description:"Rent" will ignore the createdAd = 0 or +1 ,unless i set the createdAd to -1 like "Second Rent" or anything negative i don't know why?find the reason

//store.dispatch(setTextFilter("bill"));//both objects showing up
// store.dispatch(setTextFilter("water"));//just water bill will show up
// setTimeout(() => {
//     store.dispatch(setTextFilter("bill"));
// }, 3000)

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
console.log(visibleExpenses);


// console.log(store.getState());

const jsx = (
  <Provider store={store}> 
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
