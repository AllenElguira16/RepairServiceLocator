import * as React from 'react';
import Axios, { AxiosResponse } from 'axios';
import Password from './Password';

class ResetPassword extends React.Component<any, any>{
  state: any = {
    isCodeSend: false,
    code: '',
    email: '',
    resetPasswordForm: false
  }
  generateCode(){
    Axios.post('/api/generateCodeResetPassword', {email: this.state.email}).then((res: AxiosResponse) => {
      if(res.data.success){
        this.setState({
          isCodeSend: true
        });
      }
    });
  }
  sendCode = () => {
    Axios.post('/api/verifyUserForResetPassword', {code: this.state.code}).then((res: AxiosResponse) => {
      this.setState({
        resetPasswordForm: true
      });      
    });
  }
  handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  render(){
    let {user} = this.props;
    let {isCodeSend, resetPasswordForm, email} = this.state;
    return (
      <div className="container d-flex justify-content-center">
        <div className="col-sm-6">
        <div className="card">
          <div className="card-header">Email Verification</div>
            <div className="card-body">
              {isCodeSend ? 
                !resetPasswordForm ? 
                  <>
                    {/* <form action=""> */}
                    <div className="input-group">
                      {/* <label htmlFor="code"></label> */}
                      <input type="text" name="code" placeholder="Enter 6 Digit Code" onChange={this.handleInput.bind(this)} className="form-control"/>
                      <button type="submit" className="btn btn-primary input-group-append" onClick={this.sendCode}>
                        <i className="material-icons">send</i>
                      </button>
                    </div>
                    {/* </form> */}
                  </>
                  : 
                  <Password email={this.state.email}/>
                : 
                <>
                  <div className="card-text">
                    <div className="p-4">In resetting password we will send you a code to your email</div>
                    <input type="text" name="email" placeholder="Enter email" onChange={this.handleInput.bind(this)} className="form-control"/>
                    <div className="input-group d-flex justify-content-around">
                      {/* <a href="#" onClick={(e: any) => {
                        e.preventDefault()
                        this.setState({isCodeSend: true})
                      }}>Already have a code?</a> */}
                      <button className="btn btn-warning" onClick={this.generateCode.bind(this)}>Send Code</button>
                    </div>
                  </div>
                </>
              }
              {/* {resetPasswordForm && 
                <Password/>
              } */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default ResetPassword;