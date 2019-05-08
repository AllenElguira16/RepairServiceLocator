import * as React from 'react';

class Alert extends React.Component<any, any>{
  render(){
    return (
      <div className="m-0 alert alert-danger alert-dismissible">
        <button type="button" className="close" data-dismiss="alert">&times;</button>
        <span>{this.props.message}</span>
      </div>
    )
  }
}
export default Alert;