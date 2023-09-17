import React from "react"
import ReactDom from "react-dom"
import FeedDisplay from "./feeddisplay"
import "../css/mypostcontent.css"
import "../css/feeddisplay.css"


class MypostContent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            show: "showall",
            rank: false,
            feeds: [],
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    changeshow =(e) =>{
        const name = e.target.name;
        this.setState({show:name})

    };
    changerank = (e) => {
        const name = e.target.name;
        this.setState({[name]:!this.state[name]})
    };
    async componentDidMount() {
        let formdata = new FormData();
        let result = "";
        formdata.append('ackno', this.props.ackno);
        await fetch('http://localhost/social/back-end/myposts.php', {method: 'POST', body: formdata})
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                console.log(body);
                result = body;

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
                console.log('feed', feed);
                return <FeedDisplay key={feed['mult']} likes={feed['likes']} upvotes={feed['upvotes']} down={feed['down']}
                                    type={feed['type']} added={feed['added']} content={feed['content']}
                                    mult={feed['mult']}/>
            });
            console.log(components);
            this.setState({feeds: components})
        }
    }

    render() {
        return(
            <div style={{fontFamily:this.props.font}}>
                <label id="youpos">you'r posts</label>
                <div id="show">
                    <button
                        style={{backgroundColor:this.state.show === "showall" ? "dodgerblue" : "white",color:this.state.show === "showall" ? "white" : "black"}}
                        name="showall" onClick={this.changeshow} className="commonbox" id="showall">Show All</button>
                    <button
                        style={{backgroundColor:this.state.show === "showimg" ? "dodgerblue" : "white",color:this.state.show === "showimg" ? "white" : "black"}}
                        name="showimg" onClick={this.changeshow} className="commonbox" id="showimg">Show Images</button>
                    <button
                        style={{backgroundColor:this.state.show === "showtext" ? "dodgerblue" : "white",color:this.state.show === "showtext" ? "white" : "black"}}
                        name="showtext" onClick={this.changeshow} className="commonbox" id="showtext">Show Text</button>
                    <button
                        style={{backgroundColor:this.state.show === "showvid" ? "dodgerblue" : "white",color:this.state.show === "showvid" ? "white" : "black"}}
                        name="showvid" onClick={this.changeshow} className="commonbox" id="showvid">Show Videos</button>
                </div>
                <button
                    style={{backgroundColor:this.state.rank ? "dodgerblue" : "white",color:this.state.rank ? "white" : "black"}}
                    name="rank" onClick={this.changerank} className="commonbox" id="rank">Rank By Votes</button>
                <hr id="linebr"/>
                <div id="displayfeeds">
                    {this.state.feeds}
                </div>
            </div>
        )
    }

}
export default MypostContent
