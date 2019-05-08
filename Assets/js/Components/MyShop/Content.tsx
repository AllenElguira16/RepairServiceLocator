import * as React from "react";
import DeleteConfirmation from "./DeleteConfirmation";

class Content extends React.Component<any, any>{
  state: any = {
    activeId: null
  }
  fillForm(id: any){
    this.props.fillForm(id);
  }
  setActiveId(shopId: any){
    // this.setState({
    //   activeId: shopId
    // })
    this.props.setActiveId(shopId);
  }
  render(){
    return(
      <>
      <tbody>
        {this.props.shops.map((shop: any, i: any) =>
          <tr key={i}>
            <th>{shop.Name}</th>
            <th>{shop.StreetNumber} {shop.Barangay}</th>
            <th>{shop.ContactNumber}</th>
            <th>{parseInt(shop.Status, 10) === 0 ? 'Pending' : 'Good'}</th>
            <th className="d-flex">
              <a 
                href="#" 
                data-toggle="modal" 
                data-target="#myshopModal" 
                className="btn btn-primary"
                onClick={this.fillForm.bind(this, shop.Id)} 
              >Edit</a>
              <a 
                href="#" 
                data-toggle="modal" 
                data-target="#DeleteConfirmation" 
                className="btn btn-danger" 
                onClick={this.setActiveId.bind(this, shop.Id)}
              >Delete</a>
            </th>
          </tr>
        )}
      </tbody>
      </>
    );
  }
}
export default Content;