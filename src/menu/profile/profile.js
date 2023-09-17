import React from "react"
import ReactDom from "react-dom"
import ProfileHeader from "./ProfileHeader"
import Profilecontent from "./profilecontent"
import "../css/profile.css"

class Profile extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <ProfileHeader fallBack={this.props.fallBack} font={this.props.font}/>
                <Profilecontent font={this.props.font} ackno={this.props.ackno}/>
            </div>
        );
    }

}

export default Profile