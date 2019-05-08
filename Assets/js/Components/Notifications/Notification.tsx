import * as React from 'react';
import Axios, { AxiosResponse } from 'axios';
import { NavLink, Link } from 'react-router-dom';

class Notification extends React.Component<any, any>{
  state: any = {
    notification: {}
  };
  serializeData(notification: any): void{
    Axios.post('/api/getNotificationDetails', {...notification}).then((res: AxiosResponse) => {
      this.setState({
        notification: res.data
      });
    });
  }
  
  componentWillReceiveProps(props: any){
    let {notification} = props;
    this.serializeData(notification);
  }
  response(data: any, shop: any, type: string){
    if(type == 'review'){
      return `${data.firstname} ${data.lastname} has reviewed your shop(${shop.Name})`;
    } else if(type == 'question'){
      return `${data.firstname} ${data.lastname} ask a question your shop(${shop.Name})`;
    } else if(type == 'answer'){
      return `${data.firstname} ${data.lastname} answered your question at shop(${shop.Name})`;
    }
  }
  render(){
    let {data, shop} = this.state.notification;
    let {type} = this.props;
    // console.log(data);
    return (
      <>
        {data !== undefined  && 
          <Link className="dropdown-item" to={`/shops/${shop.Category.toLowerCase()}/${shop.Name.toLowerCase()}`}>
            <span>{this.response(data, shop, type)}</span>
          </Link>
        }
        {/* {review !== undefined && type === 'question' && 
          <NavLink className="btn d-block" to={`/`}>Notification</NavLink>
        }
        {type === 'shop' && 
          <NavLink to={`/`}>Notification</NavLink>
        }
        {type === 'contact' && 
          <NavLink to={`/`}>Notification</NavLink>
        }
        {type === 'answer' && 
          <NavLink to={`/`}>Notification</NavLink>
        } */}
      </>
    );
  }
}
export default Notification;