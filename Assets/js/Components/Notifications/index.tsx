import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Axios, { AxiosResponse } from 'axios';
import Notification from './Notification';
import * as io from 'socket.io-client';

class Notifications extends React.Component<any, any>{
  state: any = {
    notifications: [{}],
    isLoading: true
  }
  fetchData(){
    Axios.get('/api/notifications').then((res: AxiosResponse) => {
      this.setState({notifications: res.data});
    });
  }
  componentDidMount(){
    this.fetchData();
  }
  componentWillUpdate(){
    let socket = io('https://www.repairservicelocator.test:8000');
    socket.on('reloadNotif', () => {
      console.log('heya!');
      this.fetchData();
    });
  }
  render(){
    let {notifications, isLoading} = this.state;
    return(
      <>
        {}
        {notifications.length ? 
          notifications.map((notification: any, i: number) => 
            <Notification notification={notification} type={notification.type} key={i}/>
          )
        :
          <div>No notifications</div>
        }
      </>
    );
  }
}
export default Notifications;