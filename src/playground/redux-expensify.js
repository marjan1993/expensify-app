import { createStore, combineReducers } from "redux";
import uuid from "uuid";

//ADD_EXPENSE
const addExpense = ({ description = "", note = "", amount = 0, createdAt = 0 } = {}) => ({
    type: "ADD_EXPENSE",
    expense: {
    id: uuid(),
    description,//description : description, but we use shorthand way since the names are the same
    note,
    amount,
    createdAt
    }
});

//REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({ 
    type: "REMOVE_EXPENSE",
    id  //OR id: id 
});

//EDIT_EXPENSE
const editExpense = (id, updates) => ({
   type: "EDIT_EXPENSE",
   id,
   updates
});

//SET_TEXT_FILTER
const setTextFilter = (text = "") => ({
   type: "SET_TEXT_FILTER",
   text
});

//SORT_BY_DATE
const sortByDate = () => ({
    type: "SORT_BY_DATE",
});

//SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: "SORT_BY_AMOUNT"
});

//SET_START_DATE
const setStartDate = (startDate) => ({ // it means: startDate = undefined
    type:"SET_START_DATE",
    startDate
});

//SET_END_DATE
const setEndDate = (endDate) => ({ // it means: endDate = undefined
    type:"SET_END_DATE",
    endDate
});

//Expense Reducer 
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_EXPENSE":
          //return state.concat(action.expense);
          return [
            ...state, //...state means all of the existing items from the array
            action.expense
          ];
        case "REMOVE_EXPENSE":
          return state.filter(({ id }) => { //shorthand way syntax -->> return state.filter(({ id }) => id !== action.id);
             return id !== action.id 
// if it not equal this will result true, meaning the item will be kept 
// and if it is equal result will be false, meaning the item will be filter out
        });
//(expense) --> we want id so ({ id }) code in filter({ id }) will be better
        case "EDIT_EXPENSE":
          return state.map((expense) => {
             if (expense.id === action.id) {
                return {
                    ...expense,
                    ...action.updates
                };
             } else {
                 return expense;
             };
          });
        default:
           return state;
    };
};


//Filters Reducer
const filtersReducerDefaultState = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case "SET_TEXT_FILTER":
          return {
             ...state,//first we grab all of the values from the current filter object
             text: action.text //and then we overwrite the  text
          };
        case "SORT_BY_AMOUNT":
           return {
              ...state,
              sortBy: "amount"
           };
        case "SORT_BY_DATE":
           return {
              ...state,
              sortBy: "date"
           };
        case "SET_START_DATE":
           return {
               ...state,
               startDate: action.startDate
           };
        case "SET_END_DATE":
            return {
               ...state,
               endDate: action.endDate
            };
        default:
          return state;
    }
};


//timestamps (milliseconds --> ms = 10^-3 or 0.0001 or 1/1000)
//January 1st 1970 (unix epoch)
//33400,10 , -283
//positive numbers are gonna come  after 1970 an the negative numbers are gonna be before 1970

//get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
   return expenses.filter((expense) => {
     const startDateMatch = typeof startDate !== "number" || expense.createdAt >= startDate ;// OR ||
     const endDateMatch = typeof endDate !== "number" || expense.createdAt <= endDate;
     const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
     //includes() is case-sensitive so we use toLowerCase()
 
    return startDateMatch && endDateMatch && textMatch; //AND &&
    //if all of this are true the filter function will be true and the item will be kept in the array
    // and if any of these are false the whole we be false because we use AND logical so the item will be removed from the array
   }).sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAd < b.createdAd ? 1 : -1 ;//if a < b so b should comes first :(otherwise if not) a will comes first
      } else if (sortBy === "amount") {
          return a.amount < b.amount ? -1 : 1 ;//if a < b so a should comes first :(otherwise if not) b will comes first
      } 
    //in learnMovieReact code (sortBy === "amount") is: return a.amount < b.amount ? 1 : -1 ;so b would come first like (sortBy === "date"),but I change it 
    // with -1 a would come fist
    // with  1 b would come fist

   });
};


//Store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
   const state = store.getState();
   const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
   console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: "Rent", amount: 100, createdAt: 1000 }));//100 penni = 1$
const expenseTwo= store.dispatch(addExpense({ description: "Coffee", amount: 300, createdAt: -1000 }));//300 penni = 3$
// // console.log(expenseOne, expenseTwo);
// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));//(what we want to update, {which object ones we want to update}})
//store.dispatch(setTextFilter("rent"));
// store.dispatch(setTextFilter("fee"));
// store.dispatch(setTextFilter("e"));
// store.dispatch(setTextFilter());
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// store.dispatch((setStartDate(125)));// one item will showing up
// store.dispatch((setStartDate(2000)));//nothing will show up
// store.dispatch((setStartDate(-2000)));//all of items will show up 
// store.dispatch((setStartDate(0)));
// store.dispatch((setStartDate()));
// store.dispatch((setEndDate(1250)));//one thing back
// store.dispatch((setEndDate(999)));//nothing back

const demoState = {
    expenses: [{
        id: "pahgfjkgl",
        description: "January Rent",
        note: "This was the final payment for that address",
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: "rent",
        sortBy: "amount",//date or amount
        startDate: undefined,
        endDate: undefined
    }
};


// //Example Spreading Objects
// const user = {
//    name: "Jane",
//    age: 25
// };
// console.log({
//     //age: 27 // it is not overwrite the age object because we set it before  ...user,
//     ...user,
//     location: "New York",
//     age: 27 // it will overwrite the age in user object, to create a new object
// });