import * as React from 'react';
import Axios, { AxiosResponse } from 'axios';

class Account extends React.Component<any, any> {
  constructor(props: any){
    super(props);
    this.state = {
      username: '',
      email: '',
      firstname: '',
      lastname: '',
      alert: {
        type: '',
        msg: ''
      }
    }
  }
  componentDidMount(){
    let user = this.props.user[0];
    this.setState({
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    })
  }
  handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let user = this.state;
    let form = {
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    }
    Axios.post('/api/updateUser', {...form}).then((res: AxiosResponse) => {
      if(res.data){
        this.setState({
          alert: res.data
        })
        if(res.data.type == 'success'){
          window.location.href = "/";
        }
      }
    });
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
    let {username, email, firstname, lastname, alert} = this.state;
    // console.log(user);
    return (
      <div className="card">
        <div className="card-header">
          <h4>Account Settings</h4>
        </div>
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            {alert.type != '' && 
              <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                <span>{alert.msg}</span>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.clearAlert}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            }
            <div className="form-group row">
              <label htmlFor="Username" className="col-2">Fullname</label>
              <div className="col-10 input-group">
                <input type="text" className="form-control" id="Firstname" placeholder="Firstname" name="firstname" value={firstname} onChange={this.handleInput}/>
                <input type="text" className="form-control" id="Lastname" placeholder="Lastname" name="lastname" value={lastname} onChange={this.handleInput}/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="Username" className="col-2">Username</label>
              <div className="col-10">
                <input type="text" className="form-control" id="Username" placeholder="Username" name="username" value={username} onChange={this.handleInput}/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="Email" className="col-2">Email</label>
              <div className="col-10">
                <input type="email" className="form-control" id="Email" placeholder="Email" name="email" value={email} onChange={this.handleInput}/>
              </div>
            </div>
            <button className="btn btn-primary rounded-pill">Save Changes</button>
          </form>
        </div>
      </div>
    );
  }
}
export default Account;