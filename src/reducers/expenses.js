//Expense Reducer 

const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
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


//export default expensesReducer; //old way , we use new way above to export function