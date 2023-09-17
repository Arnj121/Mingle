import React from "react"
import ReactDom from "react-dom"
import "./css/feeds.css"
import "./css/serachsender.css"
class SearchSender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            init:15,
        };
        this.togglefollow = this.togglefollow .bind(this)
    };
    async togglefollow(e){
        let name=e.target.name;let value=e.target.value;
        console.log(name,value);
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
    async open(e){
        const {name,value} = e.target;
    }
    render() {
        if (this.props.type === 1) {
            return (
                <div id="searchbox" style={{
                    position: 'absolute',
                    top: (this.state.init * this.props.c).toString() + '%',
                    left: '0'
                }}>
                    <label id="susername">{this.props.username}</label>
                    <button id="searchfollow" name={this.props.emailid} value={this.props.follow}
                            onClick={this.togglefollow}>{this.props.follow === 1 ? "following" : "+follow"}</button>
                </div>
            )
        }
        else{
            return (
                <div id="searchbox" style={{
                    position: 'absolute',
                    top: (this.state.init * this.props.c).toString() + '%',
                    left: '0'
                }}>
                    <button id="conbtn" name={this.props.postid} value={this.props.comment}
                            onClick={this.open}>{this.props.comment}</button>
                </div>
            )
        }
    }
}

export default SearchSender