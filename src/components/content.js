import React from "react"
import ReactDom from "react-dom"
import Feeds from "./feeds"
import Search from "./search"
import AddPost from "./addpost"
import "./css/content.css"
import refersh from "../icons/reload.svg"

class Content extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            mult:5,
            init:95,
            feeds:{},
            addcont:true,
        };
    };

    render() {
        return (
            <div id="content" style={{fontFamily:this.props.font}}>
                <Search style={this.props.font} ackno={this.props.ackno}/>
                <label style={{fontFamily: this.props.font}} id="post-anything">Post Anything</label>
                <div id="post">
                    <AddPost ackno={this.props.ackno}/>
                </div>
                <hr id="line1"/>

                <div id="feed">
                    <Feeds font={this.props.font} ackno={this.props.ackno}/>
                </div>
            </div>
        )
    }
}

export default Content