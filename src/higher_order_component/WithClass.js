import React from "react";
import './WithClass.css';

// const withClass = props =>{
//     return (
//         <div className={props.className}>{props.children}</div>
//     );
// }
const withClass = (WrappedComponent, className) => {
    return (props) => (
        <div className={className}>
            <WrappedComponent {...props}/>
        </div>
        );
};

export default withClass;