import React from "react"
import ReactDom from "react-dom"
import "./css/loginsignup.css"

class Loginsignup extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            psswd:"",
            usernmae:"",
            gender:"",
            conpsswd:"",
            status:true
        };
        this.handlesubmit = this.handlesubmit.bind(this)

    }
    handlechange = (e) => {
      const {name,value} = e.target;
      this.setState({[name]:value})
    };
    loginsignup = () => {
        this.setState({status:!this.state.status})
    };
    async handlesubmit(e){
        e.preventDefault();
        const name = e.target.name;
        var formdata = new FormData();
        var result = '';
        if (name === "login"){
            formdata.append('authentication','login');
            formdata.append('email',this.state.email);
            formdata.append('password',this.state.psswd);
            await fetch('http://localhost/social/back-end/server.php',{method: 'POST',body: formdata})
                .then(function (response) {
                    return response.json();
                })
                .then(function (body) {
                    console.log(body);
                    result = body;
                });
            if (result.result === "true"){
                this.props.writeemail(result['username'],result['email'],result['ackno'])
            }
        }
        else if (name === "signup"){
            if (this.state.conpsswd === this.state.psswd) {
                formdata.append('authentication','signup');
                formdata.append('username', this.state.username);
                formdata.append('email', this.state.email);
                formdata.append('password', this.state.psswd);
                await fetch('http://localhost/social/back-end/server.php',{method: 'POST',body: formdata})
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (body) {
                        result = body;
                    });
                if (result.result === "true"){
                    this.props.writeemail(result['pid'],result['username'],result['email'],result['ackno'])
                }
            }


        }

    };
    render() {

        if (this.state.status){
            return(
                <div>
                    <div id="header">
                        <label id="website">PostIt.com</label>
                    </div>
                    <div id="information">
                        <p>PostIt.com is a social site where it allows people to post content of thier own,new ideas,recent trends
                            and much more.
                            It allows you to pin you'r favoriate posts, you can follow other people and
                            thier post.
                        </p>
                        <p>Sign Up now for free to post you'r ideas</p>
                        <span id="small">By signing up you agree to our terms and conditons</span>
                    </div>
                    <div id="login">
                        <form>
                        <label id="loginlbl">Login</label>
                        <input id="email" name="email" value={this.state.email} placeholder="Email" type="email" onChange={this.handlechange}/>
                        <input id="psswd" name="psswd" value={this.state.psswd} placeholder="Password" type="password" onChange={this.handlechange}/>
                        <button id="loginbtn" name="login" onClick={this.handlesubmit}>Login</button>
                        <p id="notify">Don't Have an Account? <a id="lognotify" onClick={this.loginsignup}>Create Account</a></p>
                        </form>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div>
                    <div id="header">
                        <label id="website">PostIt.com</label>
                    </div>
                    <div id="information">
                        <p>PostIt.com is a social site where it allows people to post content of thier own,new ideas,recent trends
                            and much more.
                            It allows you to pin you'r favoriate posts, you can follow other people and
                            thier post.
                        </p>
                        <p>Sign Up now for free to post you'r ideas </p>
                        <span id="small">Yy signing up you agree to our terms and conditions</span>

                    </div>
                    <div id="sign">
                        <label id="signuplbl">Create Account</label>
                        <input id="username" name="username" value={this.state.username} placeholder="Username" type="email" onChange={this.handlechange}/>
                        <input id="email1" name="email" value={this.state.email} placeholder="Email" type="email" onChange={this.handlechange}/>
                        <input id="psswd1" name="psswd" value={this.state.psswd} placeholder="Password" type="password" onChange={this.handlechange}/>
                        <input id="psswd2" name="conpsswd" value={this.state.conpsswd} placeholder="Confirm Password" type="password" onChange={this.handlechange}/>
                        <button id="signupbtn" name="signup" onClick={this.handlesubmit}>Sign Up</button>
                        <p id="notify2">Have an Account? <a id="signnotify" onClick={this.loginsignup}>Log in</a></p>
                    </div>
                </div>
            )
        }
    }

}
export default Loginsignup