import React from "react";
import { connect } from "react-redux";
import ExpensesListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

export const ExpenseList = (props) => (
   <div>
      {
        props.expenses.length === 0 ? (
          <p>No Expenses</p>
        ) : (
          props.expenses.map((expenses) => {
            return ( <ExpensesListItem key={expenses.id} {...expenses} />);
          })
        )
      } 
   </div>
);
//map lets you take in an array of something and  get back of an array of something
//{...expenses} means spread out all the thing on expense includes all the properties tat we'll render it in <ExpensesListItem/>
//wee can use this expense = {expenses} but -> in props.expenses.amount the item would have lived,not directory access it like above


//Real codes bases that are using of react and redux 

const mapStateToProps = (state) => {
    return {
     expenses: selectExpenses(state.expenses, state.filters)
    };
 };

export default connect(mapStateToProps)(ExpenseList);
//we define the (mapStateToProps)things that we wanna get off of the store
//and we define the (ExpenseList) component that we wanna create the connected version of 



//this codes are not comment pattern in the code documentation of react and redux it is just for understanding the code
// const ConnectedExpenseList = connect((state) => {
//    return {
//     // name: "Marjan"
//     expenses: state.expenses
//    };
// })(ExpenseList);

// // export default ExpenseList;
// export default ConnectedExpenseList;
