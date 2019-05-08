import * as React from "react"
import Axios from "axios";
import ShopForm from "../ShopForm"
import TableHeading from "./TableHeading";
import Content from "./Content";
import DeleteConfirmation from "./DeleteConfirmation";

class MyShop extends React.Component<any, any>{
  constructor(props: any){
    super(props)
    this.state = {
      shops: [],
      action: '',
      id: null
    }
    this.child = React.createRef()
  }
  child: any = {};
  fetchShopList(){
    Axios.get("/api/myshop").then(res => {
      this.setState({
        shops: res.data
      })
    })
  }
  componentDidMount(){
    this.fetchShopList()
  }
  openAddShop(){
    this.setState({action: "/addShop", id: null});
  }
  fillForm(id: number|null){
    this.setState({action: "/updateShop", id})
  }
  setActiveId(id: any){
    this.setState({id: id});
  }
  render(){
    return (
      <div className="container p-5">
        {this.state.shops.length != 0 ? 
        <div>
          <header>
            <h4>My Shop</h4>
            <a href="#" onClick={this.openAddShop.bind(this)} data-toggle="modal" data-target="#myshopModal" className="text-warning">Add shop</a>
          </header>
          <div className="table-responsive">
            <table className="table bg-white table-striped border">
              <TableHeading />
              <Content updateList={this.fetchShopList.bind(this)} shops={this.state.shops} fillForm={this.fillForm.bind(this)} setActiveId={this.setActiveId.bind(this)}/>
            </table>
          </div>
          <DeleteConfirmation updateList={this.fetchShopList.bind(this)} shopId={this.state.id}/>
        </div>
        :
        <div className="container p-5">
          <div className="text-center p-5 m-5">
            <span>Looks like you don't have any shops listed in here</span>
            <br/>
            <span>Start clicking <a href="#" onClick={this.openAddShop.bind(this)} data-toggle="modal" data-target="#myshopModal">me</a> to add your own shop</span>
          </div>
        </div>
        }
        <ShopForm action={this.state.action} id={this.state.id} updateList={this.fetchShopList.bind(this)} />
      </div>
    )
  }
}
export default MyShop;