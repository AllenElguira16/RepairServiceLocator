import * as React from 'react';
import Axios from 'axios';
import ReactTimeAgo from "react-time-ago";
import Module from '../../Classes/Module';
import Loader from '../Loader';
// import * as io from "socket.io-client";

class Content extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      chats: [],
      currentId: null,
      isLoading: true
    }
  }

  // set left and right positions for users and friend
  checkChatPosition(id: number) {
    let user = this.props.user;
    if (user.id === id) {
      return "justify-content-end";
    }
    return "justify-content-start";
  }

  // set html classes for user and friend chat bubble
  checkChat(id: number) {
    let user = this.props.user;
    if (user.id === id) {
      return "bg-warning text-white border-warning";
    }
    return "bg-light text-dark";
  }

  // scroll to bottom of chat
  scrollToBottom() {
    let div = document.querySelector("#chatContents");
    div.scrollTop = div.scrollHeight;
  }

  componentDidMount(){
    Module.runSocket().on("newChat", () => {
      this.getChats(this.props.id);
    });
    // console.log(this.props);
  }

  // gets chat data of User and the other one
  private getChats(id: number) {
    Module.getChats(id).then(res => {
      this.props.checkForNewMessage();
      this.setState({
      	chats: res.data
      });
      this.scrollToBottom();
    });
  }

  private setAsSeen(id: number){
    Axios.post('/api/setAsSeen', {id: id});
    this.props.checkForNewMessage();
  }

  componentWillReceiveProps(props: any, propss: any){
    // console.log(propss);
    let {currentId} = this.state;
    if(currentId != props.id){
      this.setState({currentId: props.id})
      this.getChats(props.id);
      this.setAsSeen(props.id);
    }
  }

  componentWillUnmount(){
    this.setState({
      chats: [],
      currentId: null,
      isLoading: true
    });
  }

  render(){
    let {isLoading} = this.state;
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 2000)
    return (
      <div id="chatContents" className="p-2" style={{ height: "400px", overflowY: "auto"}}>
        {!isLoading ?   
          this.state.chats !== null && this.state.chats.map((chat: any) => (
            <div key={chat.id} className={`d-flex ${this.checkChatPosition(chat.UserId)}`}>
              <div className="m-2">
                <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }} className={`shadow-sm border rounded p-2 ${this.checkChat(chat.UserId)}`}>
                  <span>{chat.Content}</span>
                </div>
                <div className={`text-black-50 d-flex small ${this.checkChatPosition(chat.UserId)}`}>
                  <ReactTimeAgo date={new Date(chat.Date)} />
                </div>
              </div>
            </div>
          ))
        :
          <Loader/>
        }
      </div>
    )
  }
}
export default Content;