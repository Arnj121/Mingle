import React from "react"
import ReactDom from "react-dom"
import "./css/addpost.css"
import addpic from "../icons/picture.svg"
import addtext from "../icons/file.svg"
import addvideo from "../icons/video-file.svg"
import send from "../icons/send.svg"
import dontsend from "../icons/delete.svg"
import selectimg from "../icons/photo.svg"
import link from "../icons/link.svg"
import selectvid from "../icons/video-file.svg"
class AddPost extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showadd:false,
            showtext:false,
            showimg:false,
            showvid:false,
            written:"//Type Here...",
            link:0,
            linkval:"",
            comments:"//Comments Here",
        };
        this.posttextcontent = this.posttextcontent.bind(this);

    }
    addposttext = () =>{
        this.setState({showadd:true,showtext:true,showimg:false,showvid:false})
    };
    addpostimg = () =>{
        this.setState({showadd:true,showimg:true,showtext:false,showvid:false})

    };
    addpostvid = () =>{
        this.setState({showadd:true,showvid:true,showtext:false,showimg:false})

    };
    updatewritten = (e) =>{
        let value=e.target.value;
        this.setState({written:value})
    };

    async posttextcontent(){
        let formdata = new FormData();
        let result ="";
        formdata.append('ackno',this.props.ackno);
        if ((this.state.link === 1) && (this.state.linkval.length > 4)){
            formdata.append('type','link');
            formdata.append('linkval',this.state.linkval);
            formdata.append('comment',this.state.comments);
        }
        else {
            formdata.append('type','text');
            formdata.append('written',this.state.written);
            formdata.append('comment',this.state.comments);
        }
        await fetch('http://localhost/social/back-end/addpost.php', {method: 'POST', body: formdata});
        this.setState({showadd:false,written:"//Type Here..."})
    }
    cancel =() =>{
      this.setState({showadd:false,written:"//Type Here...",linkval:"",
          comments:"//Comments Here",link:0});
    };
    handlechange = (e) =>{
        const {name,value} = e.target;
        this.setState({[name]:value});
    };
    show =()=>{
      this.setState({link:1});
    };
    render() {
        if (this.state.showadd){
            if (this.state.showtext) {
                return (
                <div id="mypost">
                    <textarea onChange={this.updatewritten} value={this.state.written} id="textarea"/>
                    <textarea onChange={this.handlechange} name="comments" id="comment" value={this.state.comments}/>
                    <label id="or1">or</label>
                    {this.state.link === 0 ? <img id="imglink1" src={link} onClick={this.show}/> : null}
                    {this.state.link === 0 ? <label id="linklbl1">Link An Article</label> : <input id="linkval" type="text" name="linkval" placeholder="paste the link" value={this.state.linkval} onChange={this.handlechange}/>}
                    {this.state.link === 1 ? <textarea name="comments" value={this.state.comments} id="comments" onChange={this.handlechange}/> : null}
                    <img id="postbtn" src={send} onClick={this.posttextcontent}/>
                    <img id="cancel" src={dontsend} onClick={this.cancel}/>
                </div>
                );
            }
            if (this.state.showimg) {
                return (
                    <div id="mypost">
                        <input  name="imageinput" id="imageinput" type="file"/>
                        <label htmlFor="imageinput" id="selectimg" ><img src={selectimg}/></label>
                        <label id="addlbl">Add An image</label>
                        <label id="or">or</label>
                        <img id="imglink" src={link}/>
                        <label id="linklbl">Link An image</label>
                        <textarea onChange={this.updatewritten} value={this.state.written} id="textareaimg">Write Here</textarea>
                        <img id="postbtn" src={send} onClick={this.posttextcontent}/>
                        <img id="cancel" src={dontsend} onClick={this.cancel}/>

                    </div>
                );
            }
            if (this.state.showvid) {
                return (
                    <div id="mypost">
                        <input  name="videoinput" id="videoinput" type="file"/>
                        <label htmlFor="videoinput" id="selectvid" ><img src={selectvid}/></label>
                        <label id="addlbl">Add An image</label>
                        <label id="or">or</label>
                        <img id="imglink" src={link}/>
                        <label id="linklbl">Link An Video</label>
                        <textarea onChange={this.updatewritten} value={this.state.written} id="textareavid">Write Here</textarea>
                        <img id="postbtn" src={send} onClick={this.posttextcontent}/>
                        <img id="cancel" src={dontsend} onClick={this.cancel}/>
                    </div>
                );
            }
        }
        else {
            return (
                <div id="mypost">
                    <div id="postcontent">
                        <img src={addtext} className="add" onClick={this.addposttext}/>
                    </div>
                    <div id="postimg">
                        <img src={addpic} className="add" onClick={this.addpostimg}/>
                    </div>
                    <div id="postvid">
                        <img src={addvideo} className="add" onClick={this.addpostvid}/>
                    </div>
                </div>
            );
        }
    }


}
export default AddPost