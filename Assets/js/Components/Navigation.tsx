import * as React from "react"
import { NavLink } from "react-router-dom";
class Navigation extends React.PureComponent<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
        // user: [],
      isLoading: false
    }
  }
  componentWillUpdate(){
    setTimeout(() => {
      this.setState({
        isLoading: true
      }
    )}, 1000);
  }
  render(){
      // let user = this.props.user
    return (
      <nav className="navbar navbar-expand-sm sticky-top navbar-dark bg-dark" id="main-nav" style={{zIndex: 1000}}>
        {/* <!-- Button for Mobile Devices --> */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="collapsibleNavbar">
            {/* <!-- Nav Brand --> */}
            <div className="navbar-brand">
                {/* <NavLink to="/" className="nav-link text-white"> */}
              <div className="d-flex align-items-center">
                <span>
                  <img src={"/images/RepairService.png"} alt="Site Logo" className="img-fluid" style={{ height: "70px" }} />
                </span>
                <span className="pl-4">
                  <div className="small">REPAIR SERVICE</div>
                  <div className="small pl-3">ONLINE LOCATOR</div>
                </span>
              </div>
            </div>
          <div className="navbar-nav ">
            <NavLink className="nav-link text-white" to="/signin">LOGIN</NavLink>
            <NavLink className="nav-link bg-warning text-dark" to="/signup">REGISTER</NavLink>
          </div>
        </div>
      </nav>
    )
  }
}
export default Navigation;