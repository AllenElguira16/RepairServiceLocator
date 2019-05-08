import * as React from "react";
import * as io from "socket.io-client";
import Axios from "axios";
import Star from "react-star-ratings";
// let Star = require("react-star-ratings");

class Reviews extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      rating: 0,
      ratings: '',
      reviewContent: '',
      shop: {},
      reviews: []
    }
  }

  // change Rating value
  changeRating = (newRating: any) => {
    this.setState({
      rating: newRating
    });
  }

  // submit review to the back-end
  submitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let {rating, reviewContent} = this.state;
    let {shop} = this.props;
    let form = {
      rating: rating,
      reviewContent: reviewContent,
      shopId: shop.Id,
      ownerId: shop.UserId
    };
    Axios.post("/api/shops/reviews", form).then(res => {
      console.log(res.data);
      if(res.data){
        this.setState({
          rating: 0,
          reviewContent: ''
        });
      }
    });
  }

  // handleInput
  handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  }

  // fetch Reviews of the shop
  fetchData(){
    Axios.get(`/api/shops/${this.state.shop.Id}/reviews`).then(res => {
      this.setState({
        reviews: res.data
      })
    });
  }
    
  // get props that are send to this component
  componentWillReceiveProps(newProps: any){
    this.setState({
      shop: newProps.shop
    })
    this.fetchData();
  }

  // Updates review after submit
  componentWillUpdate(){
    const socket = io("https://www.repairservicelocator.test:8000");
    socket.on("newRating", () => {
      this.fetchData();
    });
  }

  render(){
    let isUserHasReview = false;
    let reviews = this.state.reviews;
    if(reviews.length !== 0){
      reviews.map((review: any) => {
        isUserHasReview =  review.UserId === this.props.user.id;
      });
    }

    return (
      <div className="card mt-4">
        <div className="card-header">Reviews</div>
        <div className="card-body">
          {reviews !== 0 ? reviews.map((review: any) => 
          <div key={review.UserId} className="border-bottom">
            <Star 
              rating={parseInt(review.Count)}
              numberOfStars={5}
              starRatedColor="#fd7e14"
              starDimension="22px"
              starSpacing="2px"
              />
            <div className="small">by {review.firstname} {review.lastname}</div>
            <div>{review.Content}</div>
          </div>    
          ) : 
            <div>No ratings</div>
          }
          {(!isUserHasReview == !this.props.isSameUser == this.props.isLoggedIn) &&
          <form onSubmit={this.submitReview} className="p-2">
            <textarea name="reviewContent" id="review" className="form-control" placeholder="Write a review" value={this.state.reviewContent} onChange={this.handleInput}/>
            <div className="container">
              <div className="row justify-content-between">
                <Star 
                  rating={this.state.rating}
                  numberOfStars={5}
                  starRatedColor="#fd7e14"
                  starHoverColor="#fd7e14"
                  changeRating={this.changeRating}
                  name="rating"
                  starDimension="22px"
                  starSpacing="2px"
                />
                <button className="btn btn-warning text-white d-flex">
                  <span className="pr-1">Submit</span>
                  <i className="material-icons">send</i>
                </button> 
              </div>
            </div>
          </form>
          }{(reviews.length == 0) && 
            <div>No reviews</div>
          }
        </div>
      </div>
    );
  }
}
export default Reviews;