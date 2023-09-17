import React from "react"
import ReactDom from "react-dom"
import "./css/subsdisplay.css"
import subimg from "../icons/user.svg"
class SubsDisplay extends React.Component{
    constructor(props) {
        super(props);

    }
    render() {
        return(
            <div id="indivsubs" style={{position: 'absolute',  top: '2%',  left: (5+(25*this.props.c)).toString()+'%',
            fontFamily:this.props.font}}>
                <button name={this.props.subemail} id="subbtn" onClick={this.props.subfunc}/>
                <label id="sublbl">{this.props.subemail}</label>
            </div>
        )
    }


}
export default SubsDisplay