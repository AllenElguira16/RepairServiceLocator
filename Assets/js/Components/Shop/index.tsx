import * as React from "react";
import * as io from "socket.io-client";
import Axios, { AxiosResponse } from "axios";
import Questions from "./Questions/Questions";
import Reviews from "./Review/Reviews";
import StarRatings from "react-star-ratings";
import Module from "../../Classes/Module";
import { Link } from "react-router-dom";

class Shop extends React.Component<any, any>{
  constructor(props: any){
    super(props)
    this.state = {
      shop: {},
      user: [],
      question: '',
      isSameUser: false,
      questions: [],
      isLoggedIn: false,
      ratings: '',
      alreadyInContacts: false
    }
  }

  fetchData(route: any){
    Module.getShops(route.category, route.shopName).then((res1: any)=> {
      this.setState({
        shop: res1.data[0]
      });
      Module.getUser().then((res: any)=> {
        let shopOwnerId = this.state.shop.UserId;
        if (res.data.length !== 0) {
          let UserId = res.data[0].id;
          this.setState({
            isSameUser: shopOwnerId === UserId,
            isLoggedIn: true,
            user: res.data[0]
          })
        }
      });
      this.ratings();
      Axios.post('/api/checkIfAlreadyInContacts', {shopOwnerId: this.state.shop.UserId}).then((res: AxiosResponse) => {
        this.setState({alreadyInContacts: res.data});
      });
    });
  }

  componentDidMount(){
    this.fetchData(this.props.match.params);
  }

  componentWillReceiveProps(props: any){
    this.fetchData(props.match.params);
  }

  ratings(){
    Module.getTotalRatings(this.state.shop.Id).then(res => {
      this.setState({
        ratings: res.data
      });
    });
  }

  addToContacts(shopOwnerId: any){
    let form = {shopOwnerId};
    Module.addToContacts(form).then(res => {
      if(res.data.success){
        this.setState({alreadyInContacts: res.data});
      }
    });
  }
  
  componentWillUpdate() {
    const socket = io("https://www.repairservicelocator.test:8000");
    socket.on("newRating", () => {
      this.ratings();
    });
  }

  render(){
    let {shop} = this.state;
    // console.log(this.state.ratings);
    return (
      <div className="container py-5">
        <div className="card">
          <div className="card-body">
            <div className="d-flex">
              <div className="float-left">
                {shop.Name &&
                  <img src={`/uploads/shops/${shop.Name}/${shop.Logo}`} className="img-fluid" style={{height: "200px", width: "250px"}} alt=""/>
                }
              </div>
              <div className="px-5 py-2">
                <div className="h3">{shop.Name}</div>
                <div>
                  <StarRatings
                    rating={this.state.ratings.average}
                    numberOfStars={5}
                    starRatedColor="#fd7e14"
                    starDimension="22px"
                    starSpacing="2px"
                  />
                </div>
                <div>
                  <Link to={`/user/${shop.username}`}>{`${shop.firstname} ${shop.lastname}`}</Link>
                  {(this.state.isLoggedIn && !this.state.isSameUser && !this.state.alreadyInContacts) && 
                    <button className="d-block btn btn-link text-warning small p-0" onClick={this.addToContacts.bind(this, shop.UserId)}>Add to contacts</button>
                  }
                </div>
                <div>{shop.StreetNumber} {shop.Barangay}</div>
                <div>{shop.ContactNumber}</div>
              </div>
            </div>
          </div>
        </div>
        <Reviews user={this.state.user} shop={this.state.shop} isSameUser={this.state.isSameUser} isLoggedIn={this.state.isLoggedIn}/>
        <Questions shop={this.state.shop} isSameUser={this.state.isSameUser} isLoggedIn={this.state.isLoggedIn}/>
      </div>
    )
  }
}
export default Shop;