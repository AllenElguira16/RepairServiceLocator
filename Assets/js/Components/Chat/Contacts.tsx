import * as React from 'react';
import Axios from 'axios';
import Module from '../../Classes/Module';

class Contacts extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      contacts: []
    }
  }

  setContacts(){
    Module.getUserContacts().then(res => {
      if (res.data.length !== 0) {
        this.setState({
          contacts: res.data
        });
      }
    });
  }
  // get friends of the current user
  getNames() {
    this.setContacts();
    setTimeout(() => {
      this.props.setCurrentId(this.state.contacts[0].FriendId);
    }, 2000);
  }

  componentDidMount(){
    Module.runSocket().on("newChat", () => {
      // setTimeout(() => {
      //   console.log('ayep');
        this.setContacts();
      // }, 2000);
    });
    this.getNames();
  }

  setCurrentId(id: number){
    this.setContacts();
    this.props.setCurrentId(id);
  }

  render(){
    return (
      // onClick = { this.getChats.bind(this, contact.FriendId) } 
      <div className="col-sm-4 border-right p-0">
        {this.state.contacts.length != 0 ?
          this.state.contacts.map((contact: any) => (
            <button onClick={this.setCurrentId.bind(this, contact.FriendId)} key={contact.FriendId} className={`btn border-bottom m-0 w-100 ${this.state.currentId == contact.FriendId ? "active" : ""}`} style={{ textTransform: "none" }}>
              <h6 className={`m-0 p-2 ${contact.isNewMsg == 1 ? 'font-weight-bold' : ''}`}>{contact.firstname + " " + contact.lastname}</h6>
            </button>
          ))
          : ""}
      </div>
    );
  }
}
export default Contacts;