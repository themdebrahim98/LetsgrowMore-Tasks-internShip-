import React,{useEffect,useState} from "react";
import { Route, Redirect } from "react-router-dom";
import { state, getState,studentState } from "../state";

export default function StudentPrivateRoute ({ component: Component, ...rest }) {


  // useEffect(() => {
    
   
  // }, [])

  console.log(studentState, "studentState");
  return (
    <Route
      {...rest}
      exact
      render = {() => {
        if (studentState.login) {
          return <Component username={studentState.username} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
}
