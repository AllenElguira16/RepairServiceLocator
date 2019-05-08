import * as React from 'react';
import {Link} from 'react-router-dom';

class Nav extends React.Component<any, any>{
  state: any = {
    height: "97px"
  }
  componentDidMount() {
    let elem: HTMLElement = document.getElementById('MainNav');
    this.setState({ height: elem.clientHeight });
  }
  render(){
    return(
      <div className="card" style={{ height: `calc(100vh - ${this.state.height})` }}>
        <div className="card-body">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/users">Users</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/requests">Requests</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
export default Nav;