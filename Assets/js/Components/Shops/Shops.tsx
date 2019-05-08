import * as React from "react";
import { withRouter } from "react-router";

import ShopBlock from "./ShopBlock"

class Shops extends React.Component<any, any>{
  parseUrlToString(url: string){
    let parsedText = url.replace(/\+/g, ' ');
    return parsedText.charAt(0).toUpperCase() + parsedText.slice(1);
  }
  render(){    
    let {category} = this.props.match.params;
    return (
      <div className="container p-3">
        {/* <header>
          <img src={`/images/${category}.jpg`} alt="Main Shop Logo" className="img-fluid"/>
        </header> */}
        <div className="card shadow">
          <div className="card-header">
            <h4>{this.parseUrlToString(category)}</h4>
          </div>
          <div className="card-body">
            <div className="row justify-content-around">
              <ShopBlock category={category}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Shops