import * as React from 'react';
import Axios, { AxiosResponse } from 'axios';

class UserVerification extends React.Component<any, any>{
  state: any = {
    isCodeSend: false,
    code: ''
  }
  generateCode(){
    Axios.post('/api/generateCodeForActivation').then((res: AxiosResponse) => {
      if(res.data.success){
        this.setState({
          isCodeSend: true
        });
      }
    });
  }
  sendCode = () => {
    Axios.post('/api/verifyUser', {code: this.state.code}).then((res: AxiosResponse) => {
      console.log(res.data);
      if(res.data.success){
        window.location.href = "/";
      } else {
        this.setState({
          alert: 'Incorrect Code'
        });
      }
    });
  }
  handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  render(){
    let {user} = this.props;
    let {isCodeSend} = this.state;
    return (
      <div className="main-container d-flex justify-content-center">
        {/* <div className="col-sm-6"> */}
        <div className="card">
          <div className="card-header">Email Verification</div>
          <div className="card-body">
            {isCodeSend ? 
              <>
                <div className="input-group">
                  <input type="text" name="code" placeholder="Enter 6 Digit Code" onChange={this.handleInput.bind(this)} className="form-control"/>
                  <button type="submit" className="btn btn-primary input-group-append" onClick={this.sendCode}>
                    <i className="material-icons">send</i>
                  </button>
                </div>
              </>
            : 
              <>
                <div className="card-text">
                  <div className="p-4">In order to use our site you must need to enter the code</div>
                  <div className="input-group d-flex justify-content-around">
                    <a href="#" onClick={(e: any) => {
                      e.preventDefault()
                      this.setState({isCodeSend: true})
                    }}>Already have a code?</a>
                    <button className="btn btn-warning" onClick={this.generateCode.bind(this)}>Send Code</button>
                  </div>
                </div>
              </>
            }
          </div>
        </div>
        {/* </div> */}
      </div>
    )
  }
}
export default UserVerification;