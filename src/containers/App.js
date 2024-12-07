// import logo from './logo.svg';
// import './App.css';
// import styled from 'styled-components'
import css_modules from "./App.module.css";
import { useCallback, useState } from "react";
import { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import Auxiliary from "../higher_order_component/Auxillary";
import withClass from "../higher_order_component/WithClass";
import AuthContext from "../context/AuthContext";

//! using styled components
// let ButtonStyled = styled.button`
//   background-color: ${props => props.alt==="true"?"red":"green"};
//   color: white;
//   border: none;
//   padding: 10px 20px;
//   border-radius: 5px;
//   &:hover{
//     background-color: ${props =>props.alt==="true"?"salmon":"lightgreen"};
//     color : black;
//     cursor : pointer;
//   }
//   `;

function App() {
  const [currState, updState] = useState({
    persons: [
      { id: "ab", name: "sidharth", age: 21 },
      { id: "cd", name: "sonu", age: 17 },
      { id: "ef", name: "siddu", age: 23 },
    ],
    others: "my hobbies are ",
    showPersons: false,
    showCockpit: true,
    countUpdate: 0,
    authenticated: false,
  });
  const [noOfPerson, setNoOfPerson] = useState(currState.persons.length);
  const [showPerson] = useState(currState.showPersons);

  const switchNameHandler = useCallback(() => {
    updState({
      persons: [
        { id: "ab", name: "reddy", age: 25 },
        { id: "cd", name: "kumar", age: 17 },
        { id: "ef", name: "sid", age: 21 },
      ],
      others: "my hobbies are ",
      showPersons: true,
      showCockpit: true,
      countUpdate: currState.countUpdate + 1,
    });
  });

  const dynamicNameChangeHandler = (event, index) => {
    let personIndex = currState.persons.findIndex((p) => {
      return p.id === index;
    });

    const person = { ...currState.persons[personIndex] };
    person.name = event.target.value;

    let persons = [...currState.persons];
    persons[personIndex] = person;
    updState((prevState, props) => {
      return {
        persons: persons,
        others: "my hobbies are",
        showPersons: true,
        showCockpit: true,
        countUpdate: prevState.countUpdate + 1,
      };
    });
  };

  console.log(currState);

  const showPersonsHandler = useCallback(() => {
    const showHideValue = currState.showPersons;
    updState({
      persons: [
        { id: "ab", name: "sidharth", age: 21 },
        { id: "cd", name: "sonu", age: 17 },
        { id: "ef", name: "siddu", age: 23 },
      ],
      others: "my hobbies are ",
      showPersons: !showHideValue,
      showCockpit: true,
    });
  });

  function deletePersonHandler(personIndex) {
    const persons = currState.persons;
    persons.splice(personIndex, 1);
    updState({
      persons: persons,
      others: "my hobbies are ",
      showPersons: true,
      showCockpit: true,
    });
  }

  // to show/hide the person components in effective way
  let persons = null;
  if (currState.showPersons) {
    //     persons = (<div><Person style={style} changed={dynamicNameChangeHandler} click={switchNameHandler.bind(this,"sid")} name={currState.persons[0].name} age={currState.persons[0].age}>I like react</Person>
    //     <Person click={switchNameHandler.bind(this,"kona")} name={currState.persons[1].name} age={currState.persons[1].age}>I like java</Person>
    //     <Person style={style} name={currState.persons[2].name} age={currState.persons[2].age}>I like sql</Person>
    //     </div>
    // )
    // to add in a dynamic way
    persons = (
      <div>
        <Persons
          persons={currState.persons}
          dynamicNameChangeHandler={dynamicNameChangeHandler}
          deletePersonHandler={deletePersonHandler}
          isAuthenticated={currState.authenticated}
        />
      </div>
    );
  }

  const loginHandler = () => {
    const login = currState.authenticated;
    updState({
      persons: [
        { id: "ab", name: "sidharth", age: 21 },
        { id: "cd", name: "sonu", age: 17 },
        { id: "ef", name: "siddu", age: 23 },
      ],
      others: "my hobbies are ",
      showPersons: true,
      showCockpit: true,
      countUpdate: 0,
      authenticated: !login,
    });
  };

  function showCockpit() {
    updState({
      persons: [
        { id: "ab", name: "sidharth", age: 21 },
        { id: "cd", name: "sonu", age: 17 },
        { id: "ef", name: "siddu", age: 23 },
      ],
      others: "my hobbies are ",
      showPersons: true,
      showCockpit: false,
    });
  }

  return (
    <Auxiliary>
      {/* <button onClick={()=>updState({persons : currState.persons,
      others : "my hobbies are",
      showPersons : true,showCockpit : false})}>Remove cockpit</button>
      {currState.showCockpit?
      <Cockpit 
        length = {currState.persons.length}
        switchNameHandler = {switchNameHandler}
        showPersonsHandler = {showPersonsHandler}
        showPersons = {currState.showPersons}></Cockpit>:null} */}
      <button onClick={showCockpit}>Remove Cockpit</button>

      <AuthContext.Provider
        value={{ authenticated: currState.authenticated, login: loginHandler }}
      >
        {currState.showCockpit ? (
          <Cockpit
            length={noOfPerson}
            switchNameHandler={switchNameHandler}
            showPersonsHandler={showPersonsHandler}
            showPersons={showPerson}
          ></Cockpit>
        ) : null}
        <ErrorBoundary>{persons}</ErrorBoundary>
      </AuthContext.Provider>
      {/* using Styled-components */}
      {/* <ButtonStyled alt={currState.showPersons+""} onClick={showPersonsHandler}>{currState.showPersons?"hide":"show"}</ButtonStyled> */}

      {/* {         //condition in a complex way
        currState.showPersons ?
        <div>
        <Person style={style} changed={dynamicNameChangeHandler} click={switchNameHandler.bind(this,"sid")} name={currState.persons[0].name} age={currState.persons[0].age}>I like react</Person>
        <Person style={style} click={switchNameHandler.bind(this,"kona")} name={currState.persons[1].name} age={currState.persons[1].age}>I like java</Person>
        <Person style={style} name={currState.persons[2].name} age={currState.persons[2].age}>I like sql</Person>
      </div> : null
      } */}
    </Auxiliary>
  );
}

export default withClass(App, css_modules.App);
