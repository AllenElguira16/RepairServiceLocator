import * as React from "react";

class Loader extends React.Component<any, any>{
  render(){
    let {className} = this.props;
    return (
      <div className="d-flex">
        <div className="m-auto">
          <img src="/images/loading.gif" alt="Loader"/>
        </div>
      </div>
    );
  }
}

export default Loader;