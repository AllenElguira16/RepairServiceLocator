import * as React from 'react';
import {Route} from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Account from './account';
import Password from './Password';
import AddProfile from './AddProfile';

class Settings extends React.Component<any, any>{
  render(){
    return (
      <div className="container p-5">
        <div className="row">
          <div className="col-2 bg-white p-0 shadow border">
            {/* <nav className="navbar"> */}
              <ul className="nav nav-pills">
                <li className="nav-item w-100">
                  <NavLink to="/settings/account" className="nav-link">Account</NavLink>
                </li>
                <li className="nav-item w-100">
                  <NavLink to="/settings/password" className="nav-link">Password</NavLink>
                </li>
                <li className="nav-item w-100">
                  <NavLink to="/settings/profile" className="nav-link">Profile</NavLink>
                </li>
                {/* <li className="nav-item w-100">
                  <NavLink to="/settings/contacts" className="nav-link">Contacts</NavLink>
                </li> */}
              </ul>
            {/* </nav> */}
          </div>
          <div className="col-10">
            <Route exact path="/settings/account" component={(props) => <Account {...props} user={this.props.user}/>}/>
            <Route exact path="/settings/password" component={(props) => <Password {...props} user={this.props.user}/>}/>
            <Route exact path="/settings/profile" component={(props) => <AddProfile {...props} user={this.props.user}/>}/>
            {/* <Route exact path="/settings/contacts" component={(props) => <Account {...props} user={this.props.user}/>}/> */}
          </div>
        </div>
      </div>
    );
  }
}
export default Settings;