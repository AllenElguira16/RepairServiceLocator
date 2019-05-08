import * as React from 'react';
import * as io from 'socket.io-client';
import Axios, { AxiosResponse } from 'axios';

class Users extends React.Component<any, any>{
  state: any = {
    users: [{}]
  }
  componentDidMount(){
    let socket = io('https://www.repairservicelocator.test:8000');
    socket.on('userLoggedIn', () => {
      this.getUsers();
    });
    this.getUsers();    
  }

  getUsers(){
    Axios.get('/api/users').then((res: AxiosResponse) => {
      this.setState({users: res.data});
    });
  }

  setUserType(status: number){
    if(status == 2){
      return 'Shop Owner'
    } else if (status == 3) {
      return 'Client'
    }
  }

  render(){
    let {users} = this.state;
    return (
      <div className="card">
        <header className="card-header">User lists</header>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Username</th>
                <th>Email</th>
                <th>Type</th>
                <th>Online Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any, i: number) => 
                <tr key={i}>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{this.setUserType(user.status)}</td>
                  <td>{user.online == 1 ? 'Online' : 'Offline'}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Users;