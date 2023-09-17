import React from "react"
import ReactDom from "react-dom"
import "./css/feeddisplay.css"
import user from "../icons/user.svg";
import like from "../icons/like.svg";
class FeedDisplay extends React.Component{
    constructor(props) {
        super(props);
        this.updateupvote = this.updateupvote.bind(this);
        this.updatedownvote = this.updatedownvote.bind(this);
        this.updatelike = this.updatelike.bind(this);
        this.togglefollow = this.togglefollow.bind(this);
    }
    async updateupvote(e){
        let key = e.target.name;
        let formdata = new FormData();
        let result = "";
        formdata.append('feedid',key);
        formdata.append('type','upvote');
        formdata.append('ackno',this.props.ackno);
        await fetch('http://localhost/social/back-end/updatevotes.php', {method: 'POST', body: formdata})
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                result = body;
                console.log(result);
            });
    };
    async updatedownvote(e){
        let key = e.target.name;
        let formdata = new FormData();
        let result = "";
        formdata.append('feedid',key);
        formdata.append('type','downvote');
        formdata.append('ackno',this.props.ackno);
        await fetch('http://localhost/social/back-end/updatevotes.php', {method: 'POST', body: formdata})
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                result = body;
                console.log(result);
            });
    };
    async updatelike(e){
        let key = e.target.name;
        let formdata = new FormData();
        let result = "";
        formdata.append('feedid',key);
        formdata.append('type','like');
        formdata.append('ackno',this.props.ackno);
        await fetch('http://localhost/social/back-end/updatevotes.php', {method: 'POST', body: formdata})
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                result = body;
                console.log(result);
            });
    };
    async togglefollow(e){
        let name=e.target.name;let value=e.target.value;
        let formdata = new FormData();
        if (value === 1){
            formdata.append('ackno',this.props.ackno);
            formdata.append('name',name);
            formdata.append('what',value);
            await fetch('http://localhost/social/back-end/togglefollow.php', {method: 'POST', body: formdata})
                .then(function (response) {
                    return response.json();
                })
                .then(function (body) {
                    console.log(body);
                });
        }
        else{
            formdata.append('ackno',this.props.ackno);
            formdata.append('name',name);
            formdata.append('what',value);
            await fetch('http://localhost/social/back-end/togglefollow.php', {method: 'POST', body: formdata})
                .then(function (response) {
                    return response.json();
                })
                .then(function (body) {
                    console.log(body);
                });
        }

    }

    render() {
        let height,mult,th,dh,ch,ct,dt;
        if (this.props.type === 'text'){
             height = '70%';
             mult = 90;
             ch = '8%';
             dh = '40%';
             th = '6%';
             ct = '15%';
             dt = '25%';
        }
        else if(this.props.type === 'link'){
            height = '40%';
            mult = 90;
            dh = '20%';
            th = '10%';
            ct = '15%';
            ch = '10%';
            dt = '28%';
        }
        return(
            <div style={{top:(35+(mult*(parseInt(this.props.mult)-1))).toString()+'%',left:'20%',position:'absolute',fontFamily:this.props.font,height: height,
            }} id="mindivfeed">
                <img id="musericon" src={user}/>
                <label id="mpostername">{this.props.username}</label>
                <p id="comments" style={{height:ch,top:ct,left:'5%',width:'50%'}}>{this.props.comments}</p>
                <p id="mdata" style={{height:dh,top:dt}}>{this.props.content}</p>
                <button name={this.props.feedid} id="mupvoteimg" onClick={this.updateupvote}/>
                <button name={this.props.feedid} id="mdownvoteimg" onClick={this.updatedownvote}/>
                <button name={this.props.feedid} id="mlikeimg" onClick={this.updatelike}/>
                <button id="mhide">Hide</button>
                <button name={this.props.unemail} id="follow" onClick={this.togglefollow} value={this.props.following}>{this.props.following ? "following..." : "+Follow"}</button>
                <label id="muplbl">{this.props.upvotes}</label>
                <label id="mlikelbl">{this.props.likes}</label>
                <label id="mdownlbl">{this.props.down}</label>
                <label id="mtypelbl" style={{height:th}}>{this.props.type}</label>
                <label id="maddedlbl">{this.props.added}</label>
            </div>
        )
    }

}

export default FeedDisplay