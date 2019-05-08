import * as React from 'react';
import Axios from 'axios';
import Module from '../../../Classes/Module';

class Requests extends React.Component<any, any>{
  state: any = {
    requests: [],
    alert: {
    }
  }
  
  private fetchShops(){
    Axios.get("/api/requests").then(res => {
      this.setState({ requests: res.data });
    });
  }
  componentDidMount(){
    this.fetchShops();
    Module.runSocket().on('newShops', () => {
      this.fetchShops();
    });
  }

  acceptShop(id: any){
    Axios.post('/api/requests', {id}).then(res => {
      if (res.data){
        this.fetchShops();
        this.setState({alert: res.data});
      } 
    });
  }
  deleteShop(id: any){
    Axios.post('/api/deleteRequests', {id}).then(res => {
      if (res.data) {
        this.fetchShops();
        this.setState({alert: res.data});
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
    let {requests, alert} = this.state;
    return(
      <div className="card">
        <header className="card-header">Pending Requests</header>
        <div className="card-body">
          {alert.type != '' && 
            <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
              {alert.msg}
              <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.clearAlert}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          }
          <table className="table">
            <thead>
              <tr>
                <th>Shop Name</th>
                <th>Address</th>
                <th>Contact Number</th>
                <th>Business Permits</th>
                <th>Category</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {requests.length == 0 && 
                <tr><td colSpan={5}>Looks like there are no pending requests!</td></tr>
              }
              {requests.map((request: any) => 
                <tr key={request.Id}>
                  <td>{request.Name}</td>
                  <td><address>{request.Barangay}</address></td>
                  <td>{request.ContactNumber}</td>
                  <td><a href={`/uploads/Shops/${request.Name}/${request.BusinessPermits}`}>Link</a></td>
                  <td>{request.Category}</td>
                  <td className="d-flex">
                    <button className="btn btn-success" onClick={this.acceptShop.bind(this, request.Id)}>Accept</button>
                    <button className="btn btn-danger" onClick={this.deleteShop.bind(this, request.Id)}>Delete</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
export default Requests;