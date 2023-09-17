import React from "react"
import ReactDom from "react-dom"
import "../css/profilecontent.css"
import edit from "../../icons/edit.svg"
import hide from "../../icons/hidden.svg"
import visi from "../../icons/visible.svg"

class Profilecontent extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            visibility:"hidden",
            ackno:this.props.ackno,
            username:"",
            email:"",
            phno:"Add phone",
            followers:"",
            upvotes:"",
            likes:"",
            psswd:"",
            posts:"",
            birth:"Add",
            gender:"Select",
            prof:"Add",
            tps:1,
            tps1:1,
            tn:1,
            te:1,
            tph:1,
            tb:1,
            tg:1,
            tpr:1

        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.savechanges = this.savechanges.bind(this);

    }
    async componentDidMount() {
        let formdata = new FormData();
        let result = "";
        formdata.append('ackno',this.state.ackno);
        await fetch('http://localhost/social/back-end/profile.php',{method: 'POST',body: formdata})
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                result = body;
                console.log(result)
            });
        let username=result["username"];
        let email = result['email'];
        let phno = result['phno'];
        let following=result['followers'];
        let upvotes = result['upvotes'];
        let likes = result['likes'];
        let posts = result['posts'];
        let birth = result['birth'];
        let gender = result['gender'];
        let psswd = result['psswd'];
        let prof = result['prof'];
        this.setState({username:username,email:email,phno:phno,followers:following,upvotes:upvotes
        ,likes:likes,posts:posts,birth:birth,gender:gender,prof:prof,psswd:psswd});
    }

    handlevisi = () => {
          this.setState({visibility: "visible"})
    };
    handlehide = () => {
        let ptoggle = document.getElementById("ptoggle");
        let psswd = document.getElementById("password");
        if (this.state.tps === 1){
            ptoggle.src = visi;
            psswd.type = "text";
            this.setState({tps:0})
        }
        else{
            ptoggle.src = hide;
            psswd.type="password";
            this.setState({tps:1})
        }
    };
    handleuser = () => {
        console.log(1);
        let ele = document.getElementById("name");
        if (this.state.tn === 1) {
            console.log(ele.value);
            ele.disabled = false;
            this.setState({tn:0})
        }
        else{
            ele.disabled = "true";
            this.setState({tn:1})
        }
    };
    handleemail = () => {
        console.log(1);
        let ele = document.getElementById("emailid");
        if (this.state.te === 1) {
            ele.disabled = false;
            this.setState({te:0})
        }
        else{
            ele.disabled = true;
            this.setState({te:1})
        }
    };
    handlephone = () => {
        console.log(1);
        let ele = document.getElementById("phno");
          if (this.state.tph === 1) {
              ele.disabled = false;
              this.setState({tph:0})
          }
          else{
              ele.disabled = true;
              this.setState({tph:1})
          }
    };

    handlebirth = () => {
        console.log(1);
        let ele = document.getElementById("birth");
          if (this.state.tb === 1) {
              ele.disabled = false;
              this.setState({tb:0})
          }
          else{
              ele.disabled = true;
              this.setState({tb:1})
          }
    };
    handlegen = () => {
        console.log(1);
        let ele = document.getElementById("gender");
          if (this.state.tg === 1) {
              ele.disabled = false;
              this.setState({tg:0})
          }
          else{
              ele.disabled = true;
              this.setState({tg:1})
          }
    };
    handlepsswd =() => {
        console.log(1);
        let ele = document.getElementById("password");
        if (this.state.tps1 === 1) {
            ele.disabled = false;
            this.setState({tps1:0})
        }
        else{
            ele.disabled = true;
            this.setState({tps1:1})
        }
    };
    handleprof = () => {
        console.log(1);
        let ele = document.getElementById("profess");
          if (this.state.tpr === 1) {
              ele.disabled = false;
              this.setState({tpr:0})
          }
          else{
              ele.disabled = true;
              this.setState({tpr:1})
          }
    };
    async savechanges(){
        let formdata = new FormData();
        formdata.append('username',this.state.username);
        formdata.append('email',this.state.email);
        try {
            var phno = this.state.phno;
            phno = parseInt(phno);
        }
        catch (err) {
            return;
        }
        formdata.append('phno',phno);
        formdata.append('ackno',this.state.ackno);
        formdata.append('psswd',this.state.psswd);
        formdata.append('gender',this.state.gender);
        formdata.append('prof',this.state.prof);
        formdata.append('birth',this.state.birth);
        await fetch('http://localhost/social/back-end/saveprofile.php',{method: 'POST',body: formdata})
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                console.log(body)
            });
    };
    handlechange = (e) =>{
        let {name,value} = e.target;
        this.setState({[name]:value})
    };
    render() {
        return(
            <div style={{fontFamily:this.props.font}}>
                <img id="profimg" src="#"/>

                <div id="userdiv" className="box1">
                    <input type="text" disabled={true} id="name" name="username" value={this.state.username} onChange={this.handlechange}/>
                    <img id="useredit" src={edit} onClick={this.handleuser}/>
                </div>

                <div id="emaildiv" className="box1">
                    <input type="text" disabled={true} id="emailid" name="email" value={this.state.email} onChange={this.handlechange}/>
                    <img id="emailedit" src={edit} onClick={this.handleemail}/>
                </div>

                <div id="phonediv" className="box1">
                    <input type="text" disabled={true} id="phno" name="phno" value={this.state.phno} onChange={this.handlechange}/>
                    <img id="phoneedit" src={edit} onClick={this.handlephone}/>
                </div>

                <div id="psswddiv" className="box1">
                <input type="password" value={this.state.psswd} name="psswd" id="password" disabled={true} onChange={this.handlechange}/>
                    <img id="psswdedit" src={edit} onClick={this.handlepsswd}/>
                    <img id="ptoggle" src={hide} onClick={this.handlehide}/>
                </div>
                <label
                    className="box1" id="followers">{this.state.followers} Followers</label>
                <label
                    className="box1" id="upvotes">{this.state.upvotes} upvotes</label>
                <label
                    className="box1" id="likes">{this.state.likes} likes</label>
                <label
                    className="box1" id="posts">{this.state.posts} Posts till now</label>
                <button
                    id="more" onClick={this.handlevisi}>more ></button>
                <div style={{visibility:this.state.visibility}} id="moreinfo">
                    <div id="birthdiv" className="box1">
                    <input type="date" value={this.state.birth} name="birth" disabled={true} id="birth" onChange={this.handlechange}/>
                        <img id="birthedit" src={edit} onClick={this.handlebirth}/>
                    </div>

                    <div id="gendiv" className="box1">
                        <input type="text" value={this.state.gender} name="gender" disabled={true} id="gender" onChange={this.handlechange}/>
                        <img id="genedit" src={edit} onClick={this.handlegen}/>
                    </div>

                    <div id="profdiv" className="box1">
                        <input type="text" value={this.state.prof} name="prof" disabled={true} id="profess" onChange={this.handlechange}/>
                        <img id="profedit" src={edit} onClick={this.handleprof}/>
                    </div>
                </div>
                <button id="savech" onClick={this.savechanges}>Save</button>
            </div>
        )
    }

}

export default Profilecontent