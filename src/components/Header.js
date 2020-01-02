import React from 'react';
import { NavLink } from "react-router-dom";

//<NavLink to="/edit" activeClassName="is-active"> Edit Expense</NavLink>
const Header = () => (
    <header>
       <h1>Expensify</h1>
       <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
       <NavLink to="/create" activeClassName="is-active"> Create Expense</NavLink>
    </header>
);

export default Header;