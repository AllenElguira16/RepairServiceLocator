import * as React from "react";
import Contacts from './Contacts';
import Content from './Content';
import Form from './Form';
import Module from "../../Classes/Module";
import Axios, { AxiosResponse } from "axios";
import 'animate.css';

class Chat extends React.Component<any, any>{
	constructor(props: any) {
		super(props);
		this.state = {
			contacts: [],
      currentId: null,
      user: [],
			isOpen: false,
      isLoggedIn: false,
      isNewMessage: false,
		};
  }

  checkForNewMessage(){
    Axios.get('/api/checkForNewMessages').then((res: AxiosResponse) => {
      this.setState({
        isNewMessage: res.data.success
      });
    });
  }

  componentDidMount() {
    if(this.state.isOpen){
      Module.runSocket().on("newChat", () => {
        this.checkForNewMessage();
      });
    }
    this.checkForNewMessage();
    Module.getUser()
    .then(res => {
      this.setState({
        isLoggedIn: res.data.length !== 0,
        user: res.data[0],
      });
    });
  }
  
  setCurrentId(id: number){
    this.setState({
      currentId: id
    });
  }

  private setAsSeen(id: number){
    Axios.post('/api/setAsSeen', {id: id});
  }

  handleChat = () => {
    if(this.state.isOpen){
      Module.runSocket().emit('newChat');
      this.setAsSeen(this.state.currentId);
    }
  }

	// Open chat box
	toggleChat(e: any) {
    e.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  }
  
	render() {
    let {isNewMessage, isOpen} = this.state;
		return (
			<div className="fixed-bottom mr-5" style={{ maxWidth: "600px", left: "auto", bottom: 100 }} >
				{!isOpen ? (
          <button className={`btn btn-warning p-2 m-0 ${isNewMessage ? 'font-weight-bold animated infinite bounce' : ''}`} onClick={this.toggleChat.bind(this)}>
            <div className={`text-white`}>Messages</div>
          </button>
				) : (
          <div className="card border-0" style={{ width: "600px" }}>
            <div className="card-header bg-warning text-white">
              <div className="d-flex justify-content-between">
                <span className="m-0">Messages</span>
                <a href="#" className="text-decoration-none text-white d-flex" onClick={this.toggleChat.bind(this)}>
                  <i className="material-icons">arrow_drop_down</i>
                </a>
              </div>
            </div>
            <div className="card-body d-flex p-0" style={{ minHeight: "400px" }} onClick={this.handleChat}>
              <Contacts setCurrentId={this.setCurrentId.bind(this)}/>
                <div className="col-sm-8 p-0 ">
                <Content id={this.state.currentId} user={this.state.user} checkForNewMessage={this.checkForNewMessage.bind(this)}/>                  
                <Form id={this.state.currentId}/>
                </div>
            </div>
          </div>
				)}
			</div>
		);
	}
}
export default Chat;
