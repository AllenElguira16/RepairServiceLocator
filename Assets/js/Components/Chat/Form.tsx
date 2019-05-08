import * as React from 'react';
import Module from '../../Classes/Module';

class Form extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      input: ""
    }
  }

  // Sets value of states on input Change
  handleInput(e: any) {
    this.setState({
      input: e.target.value
    });
  }

  // Send chat on enter hit
  enterHit(e: any) {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      this.submitChat(e);
    }
  }

  // send chat to the backend server
  submitChat(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    if (this.state.input !== "") {
      let chatData = { ChatContent: this.state.input };
      Module.sendChat(this.props.id, chatData)
      .then(res => {
        if (res.data.success) {
          this.setState({
            input: ''
          });
        }
      });
    }
  }

  componentWillUnmount(){
    this.setState({
      input: ""
    });
  }
  
  render(){
    return (
      <form className="border-top p-2 m-0" onSubmit={this.submitChat.bind(this)} id="chat-box" >
        <div className="row" style={{ bottom: 0 }}>
          <div className="col-sm-12 w-100">
            <textarea
              value={this.state.input}
              className="form-control overflow-hidden"
              style={{ height: "40px" }}
              id="chat-input"
              placeholder="Type a message"
              onChange={this.handleInput.bind(this)}
              onKeyDown={this.enterHit.bind(this)}
            />
          </div>
          {/* <div className="col-sm-2 p-0">
            <button type="submit" className="d-flex btn btn-warning">
              <i className="material-icons text-white">send</i>
            </button>
          </div> */}
        </div>
      </form>
    )
  }
}
export default Form;