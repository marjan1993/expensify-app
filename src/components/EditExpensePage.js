import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense, removeExpense } from "../actions/expenses";;

export class EditExpensePage extends React.Component {
   onSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id , expense);
    this.props.history.push("/");
  }
  onRemove = () => {
    this.props.removeExpense({ id: this.props.expense.id });
    this.props.history.push("/");
  }
  render() {
    return (
      <div>
         <ExpenseForm 
            expense={this.props.expense}
            onSubmit={this.onSubmit}
         />
         <button onClick={this.onRemove}>Remove</button>
      </div>
   );
  } 
} 

const mapStateToProps = (state, props) => { //also we can implicitly returned this object using (state, props) => ({expense: ---})
    return {
      expense: state.expenses.find((expense) => expense.id === props.match.params.id)//using arrow function shorthand 
      //{return expense.id === props.match.params.id;} // this is regular way arrow function that return an expression
    };
};

const mapDispatchToProps = (dispatch, props) => ({
  editExpense : (id, expense) => dispatch(editExpense(props.expense.id , expense)),
  removeExpense : (data) => dispatch(removeExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);