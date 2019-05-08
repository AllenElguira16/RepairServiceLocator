import * as React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Axios from "axios";
import JavascriptTimeAgo from "javascript-time-ago";
const en = require('javascript-time-ago/locale/en');

JavascriptTimeAgo.locale(en);

// Components
import Home from "./Components/Home";
import Signin from "./Components/Auth/signin"
import Signout from "./Components/Auth/signout"
import Footer from "./Components/Footer"
import Shops from "./Components/Shops/Shops";
import Shop from "./Components/Shop";
import MyShop from "./Components/MyShop";
import Chat from "./Components/Chat/Chat"
import signup from "./Components/Auth/Signup";
import Dashboard from "./Components/Dashboard";
import Maps from "./Components/Maps";
import Navigation from "./Components/Navigation";
import UserNav from "./Components/UserNavigation";
import AboutUs from "./Components/Essentails/AboutUs";
// import AddProfile from "./Components/AddProfile/AddProfile";
import Profile from "./Components/Profile";
import UserVerification from "./Components/UserVerification";
import Settings from "./Components/Settings";
import ResetPassword from "./Components/ResetPassword";
/**
 * Frontend Bootstrapper
 * 
 */
class App extends React.Component<any, any> {
  constructor(props: any){
    super(props);
    this.state = {
      user: []
    }
  }
  componentDidMount(){
    Axios.post("/api/userDetails").then((res: any) => {
      this.setState({
        user: res.data
      })
    })
  }
  render(){
    let {user} = this.state;
    let userDetails = user[0];
    return (
      <Router>
        <Route render={() => 
          user.length === 0 ? 
            <div className="container-fluid p-0 m-0">
              <Navigation/>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={signup} />
                <Route path="/reset-password" component={ResetPassword}/>
              </Switch>
              <Footer />
            </div>
          :
            <div className="container-fluid p-0 m-0">
              <UserNav user={user}/>
              {userDetails.active === "0" ?
                <Switch>
                <Route exact path="/logout" component={Signout} />
                <Route exact path="/" component={() => 
                  <UserVerification user={userDetails}/>
                }/>
                <Route component={() => 
                  <>
                    <div>You must need to verify your account</div>
                    <Link to="/">Click to Redirect</Link>
                  </>
                }/>
                </Switch>
              :
                <Switch>
                  <Route exact path="/" 
                    render={(props) => <Home {...props} user={this.state.user}/>}
                  />
                  {/* <Route exact path="/add-profile" component={AddProfile}/> */}
                  <Route exact path="/logout" component={Signout} />
                  <Route exact path="/shops/:category" component={Shops} />
                  <Route exact path="/shops/:category/:shopName" component={Shop} />
                  <Route exact path="/myshop" component={MyShop} />
                  <Route path="/Dashboard" component={Dashboard} />
                  <Route path="/Maps" component={Maps} />
                  <Route path="/about" component={AboutUs} />
                  <Route path="/user/:username" 
                    render={(props) => <Profile {...props} user={this.state.user}/>}
                  />
                  <Route path="/settings" component={(props) => 
                    <Settings {...props} user={this.state.user}/>
                  }/>
                </Switch>
              }
              <Chat />
              <Footer />
          </div>
        }
        />
      </Router>
    )
  }
}
export default App;