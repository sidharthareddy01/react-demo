import { Component } from "react"

class ErrorBoundary extends Component {

    
    state = ({
        hasError : false,
        errorMessage : ''
    });

    componentDidCatch = (error,info)=>{
        this.setState({
            hasError : true,
            errorMessage : error
        })
    }
    render(){
        return (this.state.hasError?<h1>{this.state.errorMessage}</h1>:this.props.children);
    }
}
export {ErrorBoundary}; 