import React from "react"
import ReactDom from "react-dom"
import "./css/feeds.css"
import refershicon from "../icons/reload.svg"
import SubsDisplay from "./subsdisplay"
import FeedDisplay from "./feeddisplay";
import {traverseFast} from "@babel/types";
class Feeds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feeds: [],
            ackno:this.props.ackno,
            subs:[],
            cattext:"false",
            catlink:"false",
            catimg:"false",
            catvid:"false",
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.refresh = this.refresh.bind(this);
        this.selectsub = this.selectsub.bind(this);
    }
    async selectsub(e){
        let subemail = e.target.name;
        let formdata = new FormData();
        formdata.append('ackno',this.state.ackno);
        formdata.append('sub',subemail);
        formdata.append('text',this.state.cattext);
        formdata.append('image',this.state.catimg);
        formdata.append('video',this.state.catvid);
        formdata.append('link',this.state.catlink);
        console.log(subemail);
        let result ="";
        await fetch('http://localhost/social/back-end/subfeed.php', {method: 'POST', body: formdata})
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                result = body;
                console.log(body);

            });
        let comp = result[1];
        if (comp !== 'false') {
            let list = [];
            let len = comp.length;
            for (let i = 0; i < len; i++) {
                list.push(JSON.parse(comp[i]));
            }
            console.log(list);
            const components = list.map(feed => {
                return <FeedDisplay font={this.props.font} feedid={feed['feedid']} emailid={feed['emailid']}
                                    likes={feed['likes']} upvotes={feed['upvotes']} down={feed['down']}
                                    type={feed['type']} added={feed['added']} content={feed['content']}
                                    username={feed['username']} comments={feed['comments']}
                                    mult={feed['mult']} following={feed['following']} ackno={this.props.ackno}/>
            });
            console.log(components);
            this.setState({feeds: components});
        }
        else {
            this.setState({feeds:[]})
        }
        let formdata1 = new FormData();
        let result1 = "";
        formdata1.append('ackno', this.state.ackno);
        console.log(this.props.ackno);
        await fetch('http://localhost/social/back-end/subs.php', {method: 'POST', body: formdata})
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                result1 = body;
                console.log(result1);


            });
        let comp1 = result1[1];
        if (comp1 !== "false"){
            let c =-1;
            const components1 = comp1.map(subs => {
                c++;
                return <SubsDisplay subfunc ={this.selectsub} c={c} subemail={subs} font={this.props.font}/>
            });
            console.log(components1);
            this.setState({subs:components1});
        }
    }


    async refresh(){
        let formdata = new FormData();
        let result = "";
        formdata.append('ackno', this.state.ackno);
        formdata.append('text',this.state.cattext);
        formdata.append('image',this.state.catimg);
        formdata.append('video',this.state.catvid);
        formdata.append('link',this.state.catlink);
        await fetch('http://localhost/social/back-end/feedviewer.php', {method: 'POST', body: formdata})
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                result = body;
                console.log(result);

            });
        let comp = result[1];
        if (comp !== 'false') {
            let list = [];
            let len = comp.length;
            for (let i = 0; i < len; i++) {
                list.push(JSON.parse(comp[i]));
            }
            console.log(list);
            const components = list.map(feed => {
                return <FeedDisplay font={this.props.font} feedid={feed['feedid']} emailid={feed['emailid']}
                                    likes={feed['likes']} upvotes={feed['upvotes']} down={feed['down']}
                                    type={feed['type']} added={feed['added']} content={feed['content']}
                                    username={feed['username']} comments={feed['comments']}
                                    mult={feed['mult']} following={feed['following']} ackno={this.props.ackno}/>
            });
            console.log(components);
            this.setState({feeds: components});
        }
        let formdata1 = new FormData();
        let result1 = "";
        formdata1.append('ackno', this.state.ackno);
        console.log(this.props.ackno);
        await fetch('http://localhost/social/back-end/subs.php', {method: 'POST', body: formdata})
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                result1 = body;

            });
        let comp1 = result1[1];
        if (comp1 !== "false"){
            let c =-1;
            const components1 = comp1.map(subs => {
                c++;
                return <SubsDisplay subfunc ={this.selectsub} c={c} subemail={subs} font={this.props.font}/>
            });
            console.log(components1);
            this.setState({subs:components1});
        }
    }
    async componentDidMount() {
        let formdata = new FormData();
        let result = "";
        formdata.append('ackno', this.state.ackno);
        console.log(this.props.ackno);
        await fetch('http://localhost/social/back-end/feedviewer.php', {method: 'POST', body: formdata})
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                result = body;
                console.log(result);

            });
        let comp = result[1];
        if (comp !== "false") {
            let list = [];
            let len = comp.length;
            for (let i = 0; i < len; i++) {
                list.push(JSON.parse(comp[i]));
            }
            console.log(list);
            const components = list.map(feed => {
                return <FeedDisplay font={this.props.font} unemail={feed['emailid']} feedid={feed['feedid']}
                                    likes={feed['likes']} upvotes={feed['upvotes']} down={feed['down']}
                                    type={feed['type']} added={feed['added']} content={feed['content']}
                                    username={feed['username']} comments={feed['comments']}
                                    mult={feed['mult']} following={feed['following']} ackno={this.props.ackno}/>
            });
            console.log(components);
            this.setState({feeds: components})
        }
        let formdata1 = new FormData();
        let result1 = "";
        formdata1.append('ackno', this.state.ackno);
        console.log(this.props.ackno);
        await fetch('http://localhost/social/back-end/subs.php', {method: 'POST', body: formdata})
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                result1 = body;
                console.log(result1);

            });
        let comp1 = result1[1];
        if (comp1 !== "false"){
            let c=-1;
            const components1 = comp1.map(subs => {
                c++;
                return <SubsDisplay c={c} subemail={subs} subfunc ={this.selectsub} font={this.props.font}/>
            });
            console.log(components1);
            this.setState({subs:components1});
        }

    }
    chtext =() =>{
        if (this.state.cattext === 'false'){
            this.setState({cattext:'true'});
            this.refresh();
        }
        else{
            this.setState({cattext:'false'});
            this.refresh();

        }
    };
    chlink =() =>{
        if (this.state.catlink === 'false'){
            this.setState({catlink:'true'});
            this.refresh();
        }
        else{
            this.setState({catlink:'false'});
            this.refresh();

        }
    };
    chimg =() =>{
        if (this.state.catimg === 'false'){
            this.setState({catimg:'true'});
            this.refresh();
        }
        else{
            this.setState({catimg:'false'});
            this.refresh();

        }
    };
    chvid =() =>{
        if (this.state.catvid === 'false'){
            this.setState({catvid:'true'});
            this.refresh();
        }
        else{
            this.setState({catvid:'false'});
            this.refresh();

        }
    };
    render() {
        return (
            <div style={{fontFamily:this.props.font}} id="mainfeed">
                <div id="subscribers">
                    {this.state.subs}
                </div>
                <div id="categories">
                    <label id="catlbl">Show Only</label>
                    <button name="cattext" value={this.state.cattext} id="cattext" className="commonbox"
                            style={{backgroundColor: this.state.cattext === 'true' ? 'dodgerblue' : 'white'}} onClick={this.chtext}>Text</button>
                    <button name="catlink" value={this.state.catlink} id="catlink" className="commonbox"
                            style={{backgroundColor: this.state.catlink === 'true' ? 'dodgerblue' : 'white'}} onClick={this.chlink}>Link</button>
                    <button name="catimg" value={this.state.catimg} id="catimg" className="commonbox"
                            style={{backgroundColor: this.state.catimg === 'true' ? 'dodgerblue' : 'white'}} onClick={this.chimg}>Images</button>
                    <button name="catvid" value={this.state.catvid} id="catvid" className="commonbox"
                            style={{backgroundColor: this.state.catvid === 'true' ? 'dodgerblue' : 'white'}} onClick={this.chvid}>Videos</button>
                </div>
                <label id='reflbl'>Refresh</label>
                <img id="refresh" onClick={this.refresh} src={refershicon}/>
                {this.state.feeds}
            </div>
        )

    }
}
export default Feeds