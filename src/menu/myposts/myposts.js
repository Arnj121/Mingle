import React from "react"
import ReactDom from "react-dom"
import MypostHeader from "./mypostheader"
import MypostContetn from "./mypostcontent"
import "../css/profile.css"

class MyPosts extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <div>
                <MypostHeader fallBack={this.props.fallBack} font={this.props.font} />
                <MypostContetn font={this.props.font} ackno={this.props.ackno}/>
            </div>
        )
    }

}

export default MyPosts