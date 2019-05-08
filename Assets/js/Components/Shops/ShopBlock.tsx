import * as React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

class ShopBlock extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			shops: []
		};
	}

	fetchData(category: string) {
		Axios.get(`/api/shops/${category}`).then(res => {
			this.setState({
				shops: res.data
			});
		});
	}

	shopLink(name: string) {
		return `/shops/${this.props.category}/${name.replace(/\ /g, "+")}`;
	}

	componentWillReceiveProps(nextProps: any) {
		if (nextProps.category !== this.props.category) {
			this.fetchData(nextProps.category);
		}
	}

	componentWillMount() {
		this.fetchData(this.props.category);
	}

	render() {
    let {shops} = this.state;

		return shops.length ? shops.map((shop: any, i: any) => 
			<Link key={i} className="card m-2 col-md-2 p-0 text-dark text-decoration-none" to={this.shopLink(shop.Name)}>
				<img style={{ height: "200px" }} src={`/uploads/Shops/${shop.Name}/${shop.Logo}`} alt="Image" className="img-fluid card-img-top"/>
				<div className="card-body">
					<span className="card-title">{shop.Name}</span>
				</div>
			</Link>
    )
    :
    <div className="container p-5">
      <div className="m-auto">
        <h1>Oops looks like this category has no shops</h1>
      </div>
    </div>
	}
}
export default ShopBlock;
