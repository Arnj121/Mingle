import React from "react"
import ReactDom from "react-dom"
import SettingsHeader from "./settingsHeader"
import SettingsContent from "./settingscontent"
import "../css/profile.css"

class Settings extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <div>
                <SettingsHeader fallBack={this.props.fallBack} font={this.props.font}/>
                <SettingsContent font={this.props.font} ackno={this.props.ackno}/>
            </div>
        )
    }

}

export default Settings