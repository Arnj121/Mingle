import React from "react"
import ReactDom from "react-dom"
import "../css/settingscontent.css"

class SettingsContent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            theme:"",
            font:"",
            light:"",
            dark:"",
            custom:"",
            showrecent1:"",
            showfollow:"",
            twostepval:"",
            twostep1:"",

        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.saveHandle = this.saveHandle.bind(this);

    }
    changetheme = (e) =>{
        const name=e.target.name;
        this.setState({theme:name});
    };
    changefont = (e)=> {
        const name=e.target.name;
        this.setState({font:name});
    };
    showrecent = () => {
        if (this.state.showrecent1)
            this.setState({showrecent1:0});
        else
            this.setState({showrecent1:1});

    };
    showfoll = () => {
        if (this.state.showfollow)
            this.setState({showfollow:0});
        else
            this.setState({showfollow:1});

    };
    twostep = () => {
        if (this.state.twostep1) {
            this.setState({twostep1: 0});
            this.state.twostepval = 'Activate';
        }
        else {
            this.setState({twostep1: 1});
            this.state.twostepval = 'Activated';
        }
    };
    async componentDidMount() {
        let formdata = new FormData();
        let result = "";
        formdata.append('ackno',this.props.ackno);
        formdata.append('request',"Load");
        await fetch('http://localhost/social/back-end/settings.php',{method: 'POST',body: formdata})
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                result = body;
                console.log(result)
            });
        let themes=result["themes"];
        let fonts=result["fonts"];
        let showrecent = parseInt(result["showrecent"]);
        let showfollow = parseInt(result["showfollow"]);
        let twostep = parseInt(result["twostep"]);
        let lightval, darkval,customval,twostepval;
        if (themes === 'light'){
            lightval = true;
            darkval = false;
            customval = false;
        }
        else if(themes === 'dark'){
            lightval = false;
            darkval = true;
            customval = false;
        }
        else {
            lightval = false;
            darkval = false;
            customval = true;
        }
        if (twostep === 1){
            twostepval = "Activated";
            twostep = 1;
        }
        else{
            twostepval = "Activate";
            twostep = 0;
        }
        this.setState({theme:themes,font:fonts,light:lightval,dark:darkval,custom:customval,showfollow:showfollow,showrecent1:showrecent,twostepval:twostepval,twostep1:twostep});
        console.log(typeof this.state.showrecent1,typeof this.state.showfollow);

    }
    async saveHandle(){
        let formdata = new FormData();
        let result = "";
        formdata.append('ackno',this.props.ackno);
        formdata.append('request',"save");
        formdata.append('themes',this.state.theme);
        formdata.append('fonts',this.state.font);
        formdata.append('showrecent',this.state.showrecent1);
        formdata.append('showfollow',this.state.showfollow);
        formdata.append('twostep',this.state.twostep1);
        await fetch('http://localhost/social/back-end/settings.php',{method: 'POST',body: formdata})
            .then(function (response) {
                return response.text();
            })
            .then(function (body) {
                result = body;
                console.log(result)
            });
    }
    render() {
        return (
            <div style={{fontFamily:this.props.font}}>
                <label id="themes">Themes</label>
                <div id="themecontain">
                    <button
                        style={{backgroundColor:this.state.theme === "dark" ? "dodgerblue" : "white",color:this.state.theme === "dark" ? "white" : "black"}}
                        name="dark" onClick={this.changetheme} className="commonbox" id="dark">Dark</button>
                    <button
                        style={{backgroundColor:this.state.theme === "light" ? "dodgerblue" : "white",color:this.state.theme === "light" ? "white" : "black"}}
                        name="light" onClick={this.changetheme} className="commonbox" id="light">Light</button>
                    <button
                        style={{backgroundColor:this.state.theme === "custom" ? "dodgerblue" : "white",color:this.state.theme === "custom" ? "white" : "black"}}
                        name="custom" onClick={this.changetheme} className="commonbox" id="custom">Custom</button>

                </div>

                <label id="fonts">Fonts</label>
                <div id="fontcontain">
                    <button style={{backgroundColor:this.state.font === "sans-serif" ? "dodgerblue" : "white",color:this.state.font === "sans-serif" ? "white" : "black"}}
                            name="sans-serif" onClick={this.changefont} className="commonbox" id="font1">sans-serif</button>
                    <button
                        style={{backgroundColor:this.state.font === "times-new roman" ? "dodgerblue" : "white",color:this.state.font === "times-new roman" ? "white" : "black"}}
                        name="times-new roman" onClick={this.changefont} className="commonbox" id="font2">times new roman</button>
                    <button
                        style={{backgroundColor:this.state.font === "sans" ? "dodgerblue" : "white",color:this.state.font === "sans" ? "white" : "black"}}
                        name="sans" onClick={this.changefont} className="commonbox" id="font3">sans</button>
                    <button
                        style={{backgroundColor:this.state.font === "newfont" ? "dodgerblue" : "white",color:this.state.font === "newfont" ? "white" : "black"}}
                        name="newfont"  onClick={this.changefont} className="commonbox" id="font4">newfont</button>
                    <button
                        style={{backgroundColor:this.state.font === "newfont" ? "dodgerblue" : "white",color:this.state.font === "newfont" ? "white" : "black"}}
                        name="newfont"  onClick={this.changefont} className="commonbox" id="font5">newfont</button>
                </div>

                <label id="feeddisplay">Feeds</label>
                <button
                    style={{backgroundColor:this.state.showrecent1 ? "dodgerblue" : "white",color:this.state.showrecent1 ? "white": "black"}}
                    name="showrecent1" onClick={this.showrecent} className="commonbox" id="showrecent">Show recent</button>
                <button style={{backgroundColor:this.state.showfollow  ? "dodgerblue" : "white",color:this.state.showfollow ? "white": "black"}}
                        name="showfollow" onClick={this.showfoll} className="commonbox" id="showfoll">show followers only</button>

                <label id="account">Account</label>
                <label id="delete">Delet Account</label>
                <button name="" className="commonbox" id="tmp">I'll be back soon</button>
                <button name="" className="commonbox" id="perm">Goodbye</button>
                <label id="twostep">2-Step Verification</label>
                <button style={{backgroundColor:this.state.twostep1 ? "dodgerblue" : "white",color:this.state.twostep1 ? "white": "black"}}
                    name="twostep1" className="commonbox" onClick={this.twostep} id="endis">{this.state.twostepval}</button>
                <button className="commonbox" id="save" onClick={this.saveHandle}>Save</button>
            </div>
        );
    }

}
export default SettingsContent