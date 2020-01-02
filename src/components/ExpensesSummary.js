import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import numeral from "numeral";
import selectExpensesTotal from "../selectors/expenses-total";
import selectExpenses from "../selectors/expenses";

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
    const expenseWord = expenseCount === 1 ? "expense" : "expenses";
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');//expensesTotal is in cent so we expensesTotal / 100 to in $Dollar

    return (
      <div>
         <h1>Viewing {expenseCount} {expenseWord} totalling {formattedExpensesTotal}</h1>
      </div>
    );
};

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);

  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);