import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink} from "react-router-dom";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";
import Header from "../components/Header";


//when URL matches the path then render component
//when we remove the path react-router is always considers that a match
//browser-router needs a single root element so we put them in div
const AppRouter = () => (
    <BrowserRouter>
       <div>
        <Header/>
        <Switch>
         <Route path="/" component={ExpenseDashboardPage} exact={true}/>
         <Route path="/create" component={AddExpensePage} />
         <Route path="/edit/:id" component={EditExpensePage} />
         <Route path="/help" component={HelpPage} />
         <Route component={NotFoundPage} />
       </Switch>
       </div>
     </BrowserRouter>
    
);
 

export default AppRouter;