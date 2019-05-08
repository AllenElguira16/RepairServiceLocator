import * as React from "react";
import { Route } from "react-router-dom";
import Shop from "./Shops";
import Default from "./Default";
import Users from "./Users";
import Nav from './Nav';
import Requests from './Requests';

class Dashboard extends React.Component<any, any>{
  render(){
    return (
      <article className="container-fluid p-0 m-0 row">
        {/* <div className="col-2 p-0">
          <Nav />
        </div> */}
        <div className="col p-0">
          <div className="container-fluid pt-4">
            <Route exact path="/dashboard" component={Default} />
            <Route path="/dashboard/requests" component={Requests} />
            <Route path="/dashboard/users" component={Users} />
          </div>
        </div>
      </article>
    );
  }
}
export default Dashboard;