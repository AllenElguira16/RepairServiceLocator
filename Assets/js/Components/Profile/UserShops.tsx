import * as React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";


class UserShops extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      shops: []
    };
  }

  fetchData() {
    Axios.get(`/api/myshop`).then(res => {
      this.setState({
        shops: res.data
      });
    });
  }

  shopLink(name: string, category: string) {
    return `/shops/${category.replace(/\ /g, "+")}/${name.replace(/\ /g, "+")}`;
  }

  componentWillMount() {
    this.fetchData();
  }

  render() {
    return this.state.shops.map((shop: any, i: any) =>
      <Link key={i} className="card m-4 p-0 text-dark text-decoration-none" to={this.shopLink(shop.Name, shop.Category)} style={{width: 200}}>
        <img style={{ height: "200px" }} src={`/uploads/Shops/${shop.Name}/${shop.Logo}`} alt="Image" className="img-fluid card-img-top" />
        <div className="card-body">
          <span className="card-title">{shop.Name}</span>
        </div>
      </Link>
    );
  }
}
export default UserShops;
