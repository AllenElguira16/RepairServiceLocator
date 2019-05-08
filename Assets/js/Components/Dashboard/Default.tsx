import * as React from 'react';
import * as io from 'socket.io-client';
import Axios from 'axios';

class Default extends React.Component< any, any>{
  state: any = {
    totalShops: 0,
    totalUsers: 0,
    totalUsersOnline: 0
  }
  componentDidMount(){
    let socket = io('https://www.repairservicelocator.test:8000');
    socket.on('userLoggedIn', () => {
      this.fetch();
    });
    this.fetch();
  }

  fetch(){
    Axios.get('/api/totalShops').then(res => {
      this.setState({totalShops: res.data});
    });
    Axios.get('/api/totalUsers').then(res => {
      this.setState({totalUsers: res.data});
    });
    Axios.get('/api/totalUsersOnline').then(res => {
      this.setState({totalUsersOnline: res.data});
    });
  }
  render(){
    let {totalShops, totalUsers, totalUsersOnline} = this.state;
    return (
      <div className="row mt-5">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h3>{totalUsersOnline}</h3>
              <span>Members Online</span>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h3>{totalUsers}</h3>
              <span>Total Users</span>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h3>{totalShops}</h3>
              <span>Total Shops</span>
            </div>
          </div>
        </div>
        {/* <div className="col-lg-3">
          <div className="card">
            <div className="card-body">
              <h3>999</h3>
              <span>Total Visits</span>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}
export default Default;