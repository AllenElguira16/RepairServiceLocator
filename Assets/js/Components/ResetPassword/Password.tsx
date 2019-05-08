import * as React from 'react';
import Axios, { AxiosResponse } from 'axios';

class Password extends React.Component<any, any>{
  state: any = {
    newPassword: '',
    rePassword: '',
    alert: {
      type: '',
      msg: ''
    }
  };
  clearAlert = () => {
    this.setState({
      alert: {
        type: '',
        msg: ''
      }
    });
  }
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let {newPassword, rePassword} = this.state;
    let {email} = this.props;
    Axios.post('/api/resetPassword', {
      newPassword, rePassword, email
    }).then((res:AxiosResponse) => {
      if(res.data){
        this.setState({alert: res.data});
      }if(res.data.type == 'success'){
        window.location.href = "/";
      }
    });
  }
  handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  }
  render(){
    let {alert, newPassword, rePassword} = this.state;
    return (
      // <div className="card">
      //   <div className="card-header">
      //     <h4>Account Settings</h4>
      //   </div>
      //   <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            {alert.type != '' && 
              <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                <strong>Holy guacamole!</strong> {alert.msg}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.clearAlert}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            }
            <div className="form-group row">
              <label htmlFor="Password" className="col-2">New Password</label>
              <div className="col-10">
                <input type="password" className="form-control" id="Password" placeholder="New Password" name="newPassword" value={newPassword} onChange={this.handleInput}/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="RePassword" className="col-2">Username</label>
              <div className="col-10">
                <input type="password" className="form-control" id="RePassword" placeholder="Re enter password" name="rePassword" value={rePassword} onChange={this.handleInput}/>
              </div>
            </div>
            <button className="btn btn-primary rounded-pill">Save Changes</button>
          </form>
      //   </div>
      // </div>
    )
  }
}
export default Password;