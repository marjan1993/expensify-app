//Higher Order Component (HOC) - A component (HOC) that renders another component
//Here it some of the big Advantages of using high component down blow:
//Reduce code
//Render hijacking
//Prop manipulation
//Abstract state

import React from "react";
import ReactDOM from "react-dom";

const Info = (props) => (// is a react component NOT a regular function, for components we always use UpperCase letter
    <div>
      <h1>Info</h1>
      <p>The info: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {//regular function NOT a react component
   return (props) => (
      <div>
        {props.isAdmin && <p>This is privets info. Please don't share!</p>}
        <WrappedComponent {...props} />
      </div>
   );
};

const requireAuthentication = (WrappedComponent) => {// this is a regular function that returns a higher order component
  return (props) => (  
      <div>
        {props.isAuthenticated ? (
           <WrappedComponent {...props} />
        ) : (
          <p>Please login to view the info</p>
        )}
      </div>
    );
};


const AdminInfo = withAdminWarning(Info);//higher order component that allow us to reuse code up above 
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info="There are the details"/>, document.getElementById("app"));
//isAdmin={false} nothing will show up -> because && means tf it's true show it, if it's not don't show anything at all
ReactDOM.render(<AuthInfo isAuthenticated={false} info="There are the details"/>, document.getElementById("app"));
