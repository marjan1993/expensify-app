import React from 'react';
import ExpenseList from "./ExpenseList";
import ExpenseListFilters from "./ExpenseListFilters";


const ExpenseDashboardPage = () => (// there is no need for {return();} we just can write the code directly and without return using shorthand syntax
    <div>
      <ExpenseListFilters />
      <ExpenseList />
    </div>
);

export default ExpenseDashboardPage;