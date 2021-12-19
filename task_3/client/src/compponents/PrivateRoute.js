import React,{useEffect,useState} from "react";
import { Route, Redirect } from "react-router-dom";
import { state, getState } from "../state";

export default function PrivateRoute ({ component: Component, ...rest }) {


  useEffect(() => {
    
   
  }, [])

  console.log(state, "state");
  return (
    <Route
      {...rest}
      exact
      render = {() => {
        if (state.login) {
          return <Component username={state.username} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
}
