import * as React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Nav from "../Nav";
import Alert from "../Alert";
// const BrowserHistory = require("react-router/lib/BrowserHistory").default;

class signup extends React.Component<any, any>{
  constructor(props: any){
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      email: '',
      repassword: '',
      userType: '',
      errorMsg: null
    }
  }
  handleKeyInput(e: React.FormEvent<HTMLInputElement>){
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  submit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    let form = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      repassword: this.state.repassword,
      userType: this.state.userType
    }
    Axios.post("/signup", form).then(res => {
      if(res.data.success){
        window.location.href = "/";
      } else {
        this.setState({
          errorMsg: res.data.error
        })
      }
    })
  }
  render(){
    return (
      <article className="main-container">
        <div className="card">
          <form onSubmit={this.submit.bind(this)} className="card-body" id="FormInput">
            <Nav {...this.props} header={'Sign Up'}/>
            {this.state.errorMsg !== null && <Alert message={this.state.errorMsg}/>}
            <div className="form-group input-group">
              <input type="text" name="firstname" autoComplete="off" id="firstname" placeholder="Firstname" className="form-control" onChange={this.handleKeyInput.bind(this)}/>
              <input type="text" name="lastname" autoComplete="off" id="lastname" placeholder="Lastname" className="form-control" onChange={this.handleKeyInput.bind(this)}/>
            </div>
            <div className="form-group">
              <input type="text" name="username" autoComplete="off" id="username" placeholder="Username" className="form-control" onChange={this.handleKeyInput.bind(this)}/>
            </div>
            <div className="form-group">
              <input type="text" name="email" autoComplete="off" id="email" placeholder="Email" className="form-control" onChange={this.handleKeyInput.bind(this)}/>
            </div>
            <div className="form-group input-group">
              <input type="password" name="password" autoComplete="off" id="password" placeholder="Password" className="form-control" onChange={this.handleKeyInput.bind(this)}/>
              <input type="password" name="repassword" autoComplete="off" id="repassword" placeholder="Retype Password" className="form-control" onChange={this.handleKeyInput.bind(this)}/>
            </div>
            <div className="form-group">
              <select name="userType" className="form-control" value={this.state.userType} onChange={this.handleKeyInput.bind(this)}>
                <option value="" className="bg-secondary" defaultValue="true" disabled hidden>Choose user type</option>
                <option value="3">Customer</option>
                <option value="2">Shop Owner</option>
              </select>
            </div>
            <div className="form-group form-inline">
              <button type="submit" className=" btn btn-warning ml-auto d-flex align-items-center">
                <span className="p-2">Send</span>
                <i className="material-icons">send</i>
              </button>
            </div>
          </form>
        </div>
      </article>
    )
  }
}

export default signup;