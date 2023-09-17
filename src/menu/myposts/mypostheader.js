import React from "react"
import ReactDom from "react-dom"
import back from "../../icons/left-arrow.svg"
import "../css/mypostheader.css"

class MypostHeader extends React.Component{
    constructor(props) {
        super(props);

    }
    render() {
        return(
            <div id="header" style={{fontFamily:this.props.font}}>
                <img id="back" src={back} onClick={this.props.fallBack}/>
                <label id="backlbl">Back</label>
            </div>
        )
    }

}
export default MypostHeader