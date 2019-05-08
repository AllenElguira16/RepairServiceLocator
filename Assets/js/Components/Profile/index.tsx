import * as React from 'react';
import Axios from 'axios';
import UserShops from './UserShops'

class Profile extends React.Component<any, any>{
  state: any = {
    user: [],
    loading: true
  }
  componentWillReceiveProps(props: any){
    Axios.get(`/api/user/${props.match.params.username}`).then(res => {
      this.setState({
        user: res.data[0],
        loading: false
      })
    });
  }

  componentDidMount(){
    // console.log(props);
    Axios.get(`/api/user/${this.props.match.params.username}`).then(res => {
      this.setState({
        user: res.data[0],
        loading: false
      })
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
    let {user, loading} = this.state;
    if(!loading){
      return (
        <div className="container mt-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex">
                <div className="m-2" style={{ width: "250px", height: "250px" }}>
                  <img src={user.profile == null ? `/images/defaulProfile.jpg` : `/uploads/profile/${user.id}/${user.profile}`} className="border rounded-circle img-fluid w-100 h-100" />
                </div>
                <div className="col">
                  {/* <div className="border p-2 w-100 mb-3 shadow"></div>
                  <div className="border p-2 w-100 mb-3 shadow">{user.username}</div>
                  <div className="border p-2 w-100 mb-3 shadow">{user.email}</div> */}
                  <div className="h4 font-weight-bold">{`${user.firstname} ${user.lastname}`}</div>
                  <div className="my-4">
                    <div className="text-muted">Username</div>
                    <div className="">{user.username}</div>
                  </div>
                  <div className="my-4">
                    <div className="text-muted">Email</div>
                    <div className="">{user.email}</div>
                  </div>
                  <div className="my-4">
                    <div className="text-muted">Role</div>
                    <div className="">{this.setUserType(user.status)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <UserShops />
          </div>
        </div>
      );
    } else {
      return (<div>Loading</div>)
    }
  }
}
export default Profile;