import React from 'react';
import ExpenseForm from "./ExpenseForm";
import { connect } from "react-redux";
import { startAddExpense } from "../actions/expenses"; 

 export class AddExpensePage extends React.Component {
    onSubmit= (expense) => {
      this.props.startAddExpense(expense);
      this.props.history.push("/");
   }
   render() {
     return (
      <div>
         <h1>Add Expenses</h1>
         <ExpenseForm
           onSubmit={this.onSubmit}
         />
      </div>
    );
  }
 }

const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense)) // explicitly returned the object
});
 
export default connect(undefined, mapDispatchToProps)(AddExpensePage);//connect(mapStateToProps, mapDispatchToProps) which in this case first one is undefined