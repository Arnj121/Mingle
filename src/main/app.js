import React from "react"
import ReactDom from "react-dom"

import Header from "../components/header"
import Footer from "../components/footer"
import Content from "../components/content"
import Profile from "../menu/profile/profile";
import MyPosts from "../menu/myposts/myposts"
import Settings from "../menu/settings/settings"
import Loginsignup from "../init/loginsignup"
import "./css/app.css"
import "../components/css/header.css"

class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:localStorage.getItem('email') || "",
            username: localStorage.getItem('username')|| "",
            ackno:localStorage.getItem('ackno') || "",
            main: true,
            profile: false,
            settings: false,
            myposts: false,
            font: "sans-serif",
            backcolor: "#01579b",

        };
        this.ProfileHandler = this.ProfileHandler.bind(this);
        this.mypostsHandler = this.mypostsHandler.bind(this);
        this.settingsHandler = this.settingsHandler.bind(this);
        this.fallBack = this.fallBack.bind(this);
        this.writeemail = this.writeemail.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    ProfileHandler(){
        console.log('profile');
        this.setState({main:false,profile:true,settings:false,myposts:false})
    }

    mypostsHandler(){
        console.log('post');
        this.setState({main:false,profile:false,settings:false,myposts:true})

    }
    settingsHandler(){
        console.log('settings');
        this.setState({main:false,profile:false,settings:true,myposts:false})

    }

    async logoutHandler(){
        console.log('logout');
        let formdata = new FormData();
        let result = "";
        formdata.append('ackno',this.state.ackno);
        await fetch('http://localhost/social/back-end/logout.php',{method: 'POST',body: formdata})
            .then(function (response) {
                return response.json()
            })
            .then(function (body) {
                console.log(body);
                result = body;
            });
         if (result['status'] === 1){
             this.setState({email:"",username:"",ackno:""})
         }

    }
    fallBack(){
        console.log('main');
        this.setState({main:true,profile:false,settings:false,myposts:false});
        localStorage.clear()
    }
    writeemail(username,emailid,ackno){
        localStorage.setItem('email',emailid);localStorage.setItem('username',username);localStorage.setItem('ackno',ackno);
        this.setState({email:emailid,username:username,ackno:ackno})
    }
    async componentDidMount() {
        let formdata = new FormData();
        formdata.append('ackno',this.state.ackno);
        await fetch('http://localhost/social/back-end/updateprof.php', {method: 'POST', body: formdata});
    }

    render(){

        if (this.state.email.length !== 0) {
            if (!this.state.main && !this.state.profile && !this.state.settings && this.state.myposts) {
                return (
                    <div>
                        <MyPosts font={this.state.font} fallBack={this.fallBack} ackno={this.state.ackno}/>
                    </div>
                )
            }
            //show the profile
            if (!this.state.main && this.state.profile && !this.state.settings && !this.state.myposts) {
                return (
                    <div>
                        <Profile font={this.state.font} fallBack={this.fallBack} ackno={this.state.ackno}/>
                    </div>
                )
            }
            //show the main page
            if (this.state.main && !this.state.profile && !this.state.settings && !this.state.myposts) {
                return (
                    <div>
                        <Header font={this.state.font} backcolor={this.state.backcolor}
                                ProfileHandler={this.ProfileHandler} mypostsHandler={this.mypostsHandler}
                                settingsHandler={this.settingsHandler} logoutHandler={this.logoutHandler} username={this.state.username} ackno={this.state.ackno}/>
                        <Content font={this.state.font} ackno={this.state.ackno}/>
                        <Footer/>
                    </div>
                )
            }
            //show the settings page
            if (!this.state.main && !this.state.profile && this.state.settings && !this.state.myposts) {
                return (
                    <div>
                        <Settings font={this.state.font} fallBack={this.fallBack} email={this.state.email} ackno={this.state.ackno}/>
                    </div>
                )
            }
        }
        else{
            return(
                <Loginsignup writeemail={this.writeemail}/>
            )
        }
    }
}

export default App