import React from "react"
import ReactDom from "react-dom"
import SearchSender from "./searchsender"
import search from "../icons/search.svg"
import "./css/search.css"
import FeedDisplay from "./feeddisplay";
class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            search:"",
            issearching:false,
            searchresult:"",
        };
        this.handleSearch = this.handleSearch.bind(this);
    }
    returnsearch(search){
        this.setState({search:search});
    }
    async  handleSearch(e) {
        this.setState({issearching: true});
        this.setState({search: e.target.value});
        this.returnsearch(e.target.value);
        let result = "";
        let formdata = new FormData();
        formdata.append('ackno', this.props.ackno);
        formdata.append('keywords', e.target.value);
        await fetch('http://localhost/social/back-end/search.php', {method: 'POST', body: formdata})
            .then(function (response) {
                return response.json();
            })
            .then(function (body) {
                result = body;
                console.log(result);
            });
        let comp = result[1];
        if (comp === 'false') {
            this.setState({issearching:false})
        }
        else {
            let list = [];
            let len = comp.length;
            for (let i = 0; i < len; i++) {
                list.push(JSON.parse(comp[i]));
            }
            let c= -1;
            const components = list.map(feed => {
                c++;
                if (feed['type'] === 1){
                    return <SearchSender font={this.props.font} ackno={this.props.ackno} emailid={feed['email']}
                                         username={feed['username']} follow={parseInt(feed['follow'])} c={c} type={feed['type']}/>
                }
                else{
                    return <SearchSender font={this.props.font} ackno={this.props.ackno} comment={feed['comment']}
                                         postid={feed['postid']} c={c} type={feed['type']}/>
                }

            });
            this.setState({searchresult: components})
        }
        if (this.state.search.length === 0) {
            this.setState({issearching:false})
        }
        }
    render() {
        if (this.state.issearching){
            return (
                <div id="searchmenu">
                    <input id="search" type="text" name="search" value={this.state.search}
                           onChange={this.handleSearch}/>
                    <img id="searchicon" src={search}/>
                    <div id="searchresults">
                        {this.state.searchresult}
                    </div>
                    <p>{this.state.search}</p>
                </div>
            )
        }
        else{
        return (
            <div id="searchmenu">
                <input id="search" placeholder="Search for People" type="text" name="search" value={this.state.search}
                       onChange={this.handleSearch}/>
                <img id="searchicon" src={search}/>
                </div>
            );
        }
    }

}
export default Search