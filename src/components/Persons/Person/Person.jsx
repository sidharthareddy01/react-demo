import React, { useEffect } from "react";
import "./Person.css";
import { useRef } from "react";
import withClass from "../../../higher_order_component/WithClass";
import PropTypes from "prop-types";
import AuthContext from "../../../context/AuthContext";
import { useContext } from "react";


const Person = ({ changed, name, age, deleted, children, isAuthenticated }) => {
  const inputSelectRef = useRef();
  const authContext = useContext(AuthContext);

  useEffect(()=>{
    console.log("person useEffect");
    inputSelectRef.current.focus();
  })

  const rndm = Math.random();
  if (rndm >= 1) {
    throw new Error("something went wrong...");
  }

  const handleChange = (e) => {
    e.stopPropagation();
  };

  return (
    <div onClick={deleted}>
      {/* <AuthContext.Consumer>
        {(context)=> context.authenticated ? <p>Authenticated</p>:<p>Log in</p>}
      </AuthContext.Consumer> */}
      {authContext.authenticated ? <p>Authenticated</p>:<p>Log in</p>}
      <p>
        My name is {name}, and i am {age} years old.
      </p>
      <p>{children}</p>
      <input type="text" ref={inputSelectRef} onChange={changed} onClick={handleChange} value={name}/>
    </div>
  );
};


Person.propTypes = {
  deleted : PropTypes.func,
  name : PropTypes.string,
  age : PropTypes.number,
  changed : PropTypes.func
};

export default withClass(Person,"person");
