import * as React from "react"
import { Link } from "react-router-dom"
import Axios from "axios";


class Signin extends React.Component<any, any>{
  constructor(props: any){
    super(props)
    this.state = {
      username: '',
      password: '',
      alert: {
        type: '',
        msg: ''
      }
    }
  }
  handleKeyInput(e: any){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  submit(e: any){
    e.preventDefault();
    let form = {
      username: this.state.username,
      password: this.state.password
    }
    Axios.post("/signin", form).then(res => {
      if(res.data.success){
        this.setState({
          alert: {
            type: 'success',
            msg: 'Login Successful'
          }
        })
        if(form.username != 'admin'){
          window.location.href = "/";
        } else {
          window.location.href = "/dashboard";
        }
      } else {
        this.setState({
          alert: {
            type: 'warning',
            msg: res.data.error
          }
        })
      }
    })
  }
  goBack() {
    console.log('called');
    this.props.history.goBack()
  }
  clearAlert = () => {
    this.setState({
      alert: {
        type: '',
        msg: ''
      }
    });
  }
  render(){
    let {alert} = this.state;
    return (
      <article className="main-container">
        <div className="card">
          <form onSubmit={this.submit.bind(this)} className="card-body">
            <div className="form-group">
              <div className="d-flex align-items-center">
                <span className="h5 mb-0">Sign in</span>
                <button type="button" onClick={this.goBack.bind(this)} className="mb-0 btn text-dark btn-link ml-auto">
                  <i className="material-icons">arrow_back</i>
                </button>
              </div>
            </div>
            {alert.type != '' && 
              <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                {alert.msg}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.clearAlert}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            }
            <div className="form-group">
              <input type="text" name="username" id="username" autoComplete="off" placeholder="Username" className="form-control" onChange={this.handleKeyInput.bind(this)}/>
            </div>
            <div className="form-group">
              <input type="password" name="password" id="password" autoComplete="off" placeholder="Password" className="form-control" onChange={this.handleKeyInput.bind(this)} />
            </div>
            <div className="form-group form-inline">
              <button type="submit" className="text-white btn btn-warning ml-auto d-flex align-items-center">
                <i className="material-icons">send</i>
              </button>
            </div>
            <div className="form-group form-inline d-flex justify-content-between">
              <Link to="/reset-password" className="text-info">Forgot Password?</Link>
              <Link to="/signup" className="text-info">Sign Up</Link>
            </div>
          </form>
        </div>
      </article>
    )
  }
}
export default Signin