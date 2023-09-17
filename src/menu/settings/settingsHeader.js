import React from "react"
import ReactDom from "react-dom"
import "../css/settingsheader.css"
import back from "../../icons/left-arrow.svg"

class SettingsHeader extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div id="header" style={{fontFamily:this.props.font}}>
                <img id="back" src={back} onClick={this.props.fallBack}/>
                <label id="backlbl">Back</label>
            </div>
        );
    }

}
export default SettingsHeader