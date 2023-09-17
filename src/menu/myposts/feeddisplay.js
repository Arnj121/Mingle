import React from "react"
import ReactDom from "react-dom"
import "../css/feeddisplay.css"
import up from "../../icons/caret-arrow-up.svg"
import downv from "../../icons/caret-down.svg"
import liked from "../../icons/like (1).svg"

class FeedDisplay extends React.Component{
    constructor(props) {
        super(props);

    }
    render() {
        return(
            <div style={{top:(2+(68*(parseInt(this.props.mult)-1))).toString()+'%',left:'5%',position:'absolute'}} id="indivfeed">
                <img id="upvoteimg" src={up}/>
                <img id="downvoteimg" src={downv}/>
                <img id="likeimg" src={liked}/>
                <label id="uplbl">{this.props.upvotes}</label>
                <label id="likelbl">{this.props.likes}</label>
                <label id="downlbl">{this.props.down}</label>
                <label id="typelbl">{this.props.type}</label>
                <label id="addelbl">Posted {this.props.added}</label>
                <p id="values">{this.props.content}</p>
            </div>
        )
    }

}

export default FeedDisplay