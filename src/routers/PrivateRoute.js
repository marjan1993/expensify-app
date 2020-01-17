import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest //contains everything except -> isAuthenticated and component
}) => (
   <Route {...rest} component={(props) => (
      isAuthenticated ? (
        <div>
          <Header />
          <Component {...props} />
        </div>
      ): (
         <Redirect to="/" />
      )
   )} />
);
//destructuring objects -> ...rest all stuff that we did not destructuring
//spread an object -> ...props

const mapStateToProps = (state) => ({
   isAuthenticated: !!state.auth.uid//!! boolean values (true or false)
});

export default connect(mapStateToProps)(PrivateRoute);