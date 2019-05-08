import * as React from "react";
import { NavLink, Link } from "react-router-dom";
import Axios from "axios";
import Notifications from "../Notifications";
import Search from "./Search";

class UserNav extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      search: '',
      shops: []
    };
  }
  componentDidMount() {
    Axios.get("/api/shops").then(res => {
      this.setState({
        shops: res.data
      });
    });
  }
  render(){
    let user: any;
    if(this.props.user.length){
      user = this.props.user[0];
    }
    return (
      <nav className="navbar navbar-expand-sm p-2 border-bottom shadow-sm sticky-top bg-light" id="MainNav">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <i className="material-icons text-dark">menu</i>
        </button>
        <div className="navbar-brand">
          <Link to="/">
            <img src={"/images/RepairService.png"} alt="Site Logo" className="img-fluid" style={{ height: "70px" }} />
          </Link>
        </div>
        <div className="navbar-collapse collapse justify-content-between" id="collapsibleNavbar">
          <div className="d-flex">
            <NavLink className="text-dark nav-link" to="/">Home</NavLink>
            <div className="dropdown">
              <a href="#" className="btn-no-outline nav-link text-dark text-decoration-none" id="ShopDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span>Category</span>
              </a>
              <div className="dropdown-menu" aria-labelledby="ShopDropdown">
                <NavLink className="dropdown-item" to="/shops/appliances">Appliances</NavLink>
                <NavLink className="dropdown-item" to="/shops/automotives">Automotives</NavLink>
                <NavLink className="dropdown-item" to="/shops/gadgets">Gadgets</NavLink>
                <NavLink className="dropdown-item" to="/shops/pc+hardware">PC Hardware</NavLink>
              </div>
            </div>
            <NavLink className="text-dark nav-link" to="/maps">Maps</NavLink>
            {user.status != 1 && <NavLink className="text-dark nav-link" to="/about">AboutUs</NavLink>}
            {user.status == 1 && <NavLink className="text-dark nav-link" to="/dashboard/users">User</NavLink>}
            {user.status == 1 && <NavLink className="text-dark nav-link" to="/dashboard/requests">Requests</NavLink>}
          </div>
          <Search/>
          <div className="navbar-nav ">
            {user.status != 1 && 
              <div className="dropdown-no-caret nav-item">
                <a href="#" className="nav-link dropdown-toggle text-dark" id="Notif" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="material-icons">notifications</i>
                </a>
                <div className="dropdown-menu dropdown-menu-right" style={{width: 500}} aria-labelledby="Notif">
                  <Notifications user={user}/>
                </div>
              </div>
            }
            <div className="dropdown-no-caret nav-item">
              <a href="#" className="nav-link dropdown-toggle text-dark" id="User" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="material-icons">person</i>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="Notif">
                {user.status == 1 && <NavLink className="dropdown-item" to="/dashboard" >Dashboard</NavLink>}
                {user.status == 2 && <NavLink className="dropdown-item" to="/myshop">My Shops</NavLink>}
                {user.status != 1 && <NavLink className="dropdown-item" to={"/user/" + user.username}>Profile</NavLink>}
                {user.status != 1 && <NavLink className="dropdown-item" to="/settings/account">Settings</NavLink>}
                <NavLink className="dropdown-item" to="/logout">Logout</NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default UserNav;