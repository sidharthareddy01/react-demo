import React from "react";
import Person from "./Person/Person";

const Persons = (props) => {
  return props.persons.map((person, index) => {
    return (
      <Person
        name={person.name}
        key={person.id}
        age={person.age}
        changed={(event) => props.dynamicNameChangeHandler(event, person.id)}
        deleted={props.deletePersonHandler.bind(this, index)}
      />
    );
  });
};

export default Persons;
