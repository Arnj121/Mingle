import React from "react"
import ReactDom from "react-dom"
import "./css/header.css"
import menuicon from "../icons/menu.svg"
import user from "../icons/user.svg"
class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menuopen:false,
            username:this.props.username,
        }
    }
    openmenu = () => {
        this.setState({menuopen:!this.state.menuopen})
    };

    render() {
        if (this.state.menuopen){
            return(
                <div style={{backgroundColor: "#01579b"}} id="mheader">
                    <label style={{fontFamily: this.props.font}} id="mwebsite">PostIt.com</label>
                    <img id="userhicon" src={user}/>
                    <label style={{fontFamily: this.props.font}} id="user">{this.state.username}</label>
                    <img  id="menuicon" src={menuicon} onClick={this.openmenu}/>
                    <div style={{fontFamily: this.props.font}} id="menubar">
                        <button className="commonmenu" id="profile" onClick={this.props.ProfileHandler}>Profile</button>
                        <button className="commonmenu" id="settings" onClick={this.props.settingsHandler}>Settings</button>
                        <button className="commonmenu" id="myposts" onClick={this.props.mypostsHandler}>My Posts</button>
                        <button className="commonmenu" id="logout" onClick={this.props.logoutHandler}>Log out</button>

                    </div>
                </div>
            );
        }
        return(
            <div style={{backgroundColor: "#01579b"}} id="mheader">
                <label style={{fontFamily: this.props.font}} id="mwebsite">PostIt.com</label>
                <img id="userhicon" src={user}/>
                <label style={{fontFamily: this.props.font}} id="user">{this.state.username}</label>
                <img  id="menuicon" src={menuicon} onClick={this.openmenu}/>

            </div>
        );
    }
}

export default Header
