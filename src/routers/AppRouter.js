import React from 'react';
import { Router, Route, Switch, Link, NavLink} from "react-router-dom";
// import createHistory from "history/createBrowserHistory";
import { createBrowserHistory } from 'history'
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const history = createBrowserHistory();

//when URL matches the path then render component
//when we remove the path react-router is always considers that a match
//browser-router needs a single root element so we put them in div
const AppRouter = () => (
    <Router history={history}>
       <div>
        <Switch>
         <PublicRoute path="/" component={LoginPage} exact={true}/>
         <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
         <PrivateRoute path="/create" component={AddExpensePage} />
         <PrivateRoute path="/edit/:id" component={EditExpensePage} />
         <Route component={NotFoundPage} />
       </Switch>
       </div>
     </Router>
);
 

export default AppRouter;