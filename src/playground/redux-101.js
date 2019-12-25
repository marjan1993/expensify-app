import { createStore } from "redux";

//Action generators - functions that return action objects

// const incrementCount = () => {
//    return {
//      type: "INCREMENT"
//    };
// };

//same result bu using the shorthand syntax
const incrementCount = ({ incrementBy = 1 } = {}) => ({//using destructuring 
  type: "INCREMENT" ,
  //incrementBy: incrementBy 
  incrementBy //setting object property equal to a variable name with same name we can short it
}); //way to return the object directly

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: "DECREMENT",
    decrementBy
});

const setCount = ({ count } = {}) => ({
   type: "SET",
   count
});

const resetCount = () => ({
   type:"RESET"
});

//Reducers
// //1.Reducers are pure functions
// //example o a Not pure function
// let a = 10;
// const add = (b) => {
//   return a + b 
// };
// //the output of this function what it returns  dose not just depend on the input ,ot also depends on global variable which could change thats why it can not be pure function
// //now here is the example of a pure function that only depends on th input
// const add = (a,b) => {
//   return a + b 
// };
// //2.Never change state or action


const countReducer = (state = { count: 0 }, action) => {// the default current state object ,if there is not current state then we start with count = 0
  switch (action.type) {
      case "INCREMENT":
        // const incrementBy = typeof action.incrementBy === "number" ? action.incrementBy : 1;
       return {
          count: state.count + action.incrementBy
       };

      case "DECREMENT":
        // const decrementBy = typeof action.decrementBy === "number" ? action.decrementBy : 1;
        return {
        count: state.count - action.decrementBy
       };
      case "SET":
        return {
          count: action.count
        };
      case "RESET":
        return {
          count: 0
       };

      default: 
         return state;
  }
  
  //same result but using switch is easier

  // if (action.type === "INCREMENT") {
  //     return {
  //         count: state.count + 1
  //      };
  // }
  // else {
  //   return state;
  // };
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

//Actions - is an object,that gets sent to the store


// store.dispatch({
//      type: "INCREMENT",
//      incrementBy: 5
// });

//prefer this way, it's shorter
store.dispatch(incrementCount({ incrementBy: 5 }));

//unsubscribe();

// store.dispatch({
//     type: "INCREMENT"
// });

//prefer this way, it's shorter
store.dispatch(incrementCount());

// store.dispatch({
//     type: "DECREMENT",
//     decrementBy: 10
// });
store.dispatch(decrementCount({ decrementBy: 10 }));

// store.dispatch({
//     type: "RESET"
// });
store.dispatch(resetCount());

store.dispatch(incrementCount());

// store.dispatch({
//     type: "SET",
//     count: 101
// });
store.dispatch(setCount({ count: 101 }));
