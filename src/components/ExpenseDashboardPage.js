import React from 'react';
import ExpenseList from "./ExpenseList";
import ExpenseListFilters from "./ExpenseListFilters";
import ExpensesSummary from "./ExpensesSummary";


const ExpenseDashboardPage = () => (// there is no need for {return();} we just can write the code directly and without return using shorthand syntax
    <div>
      <ExpensesSummary />
      <ExpenseListFilters />
      <ExpenseList />
    </div>
);

export default ExpenseDashboardPage;