import React, { useEffect } from "react";
import cockpit_css from "./Cockpit.module.css";
// import WithClass from "../../higher_order_component/WithClass";
import Auxiliary from "../../higher_order_component/Auxillary";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

const Cockpit = (props) => {
  // const authContext = useContext(AuthContext);

  useEffect(() => {
    console.log("cockpit useEffect");
    // it can handle the http request
    setTimeout(() => {
      console.log("Saved!");
    }, 1000);
    // },[props.showPersons]);
    return () => {
      console.log("clean up work in 1st use-effect");
    };
  });

  useEffect(() => {
    console.log("2nd use-effect");
    return () => {
      console.log("clean up work in 2nd use-effect");
    };
  }, []);

  let classes = [];
  if (props.length <= 2) {
    classes.push(cockpit_css.blue);
  }
  if (props.length <= 1) {
    classes.push(cockpit_css.white);
  }
  return (
    <Auxiliary className="Cockpit">
      <div>
        <h1>Hello, Welcome to react tutorial.</h1>
        <p className={classes.join(" ")}>There are {props.length} persons.</p>
        <button onClick={props.switchNameHandler}>Change names</button>
        <button
          className={
            props.showPersons ? cockpit_css.buttonRed : cockpit_css.button
          }
          onClick={props.showPersonsHandler}
        >
          {props.showPersons ? "hide" : "show"}
        </button>
        {/* <AuthContext.Consumer>
            {(context)=> <button onClick={context.login}>Login</button>}
          </AuthContext.Consumer> */}
        {/* <button onClick={authContext.login}>Login</button> */}
      </div>
      <section>Hello, this is a adjacent section component</section>
    </Auxiliary>
  );
};

export default React.memo(Cockpit);
