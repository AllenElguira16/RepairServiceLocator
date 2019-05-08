import * as React from "react";
import { Link } from "react-router-dom";

// import Navigation from "./Navigation";
import Axios from "axios";

class Header extends React.Component<any, any> {
	constructor(props: any){
	super(props);
		this.state = {
			search: "",
			shops: [],
			searchCategory: ""
		};
	}

	componentDidMount() {
		Axios.get("/api/shops").then(res => {
			this.setState({
				shops: res.data
			});
		});
	}
	isTyped = (e: React.FormEvent<HTMLInputElement>) => {
		this.setState({
			search: e.currentTarget.value
		});
	}
	shopLink(name: string, category: string) {
		return `/shops/${category.toLowerCase()}/${name.replace(/\ /g, "+")}`;
	}
	clearInput(){
		this.setState({
			search: ''
		})
	}
	render() {
		let filteredShops = this.state.shops.filter((shop: any) => {
			return shop.Name.toLowerCase().indexOf(this.state.search.toLocaleLowerCase()) !== -1;
		});
		return (
			<header>
				<div className="container pb-2">
					<div className="d-flex justify-content-between py-4">
						<div className="d-flex mt-2">
							<img src={require("../../images/RepairService.png")} alt="Site Logo" height="100" width="120"/>
							<div className="header-title">
								<h3 className="m-0">REPAIR</h3>
								<h3 className="m-0 text-warning">SERVICE</h3>
								<h3 className="m-0">LOCATOR</h3>
							</div>
						</div>
						<div className="mr-5 mt-4">
							<form action="/" className="search position-relative">
								<div className="m-0 p-0 input-group ">
									<input onChange={this.isTyped.bind(this)} value={this.state.search} type="text" className="form-control border-white" placeholder="Type to Search"/>
									<div className="input-group-append">
										<div className="input-group-text">
											<i className="material-icons">search</i>
										</div>
									</div>
								</div>
								<div className="card position-absolute w-100" style={{ zIndex: 1000 }}>
								{this.state.search.length !== 0 && (
									<div className="card-body">
									{filteredShops.length !== 0 ? 
										filteredShops.map((shop: any, i: any) => (
										<div key={i}> 
											<Link onClick={this.clearInput.bind(this)} className="link text-dark" to={this.shopLink(shop.Name, shop.Category)}>{shop.Name}</Link>
										</div>
										))
									: 
										<div>No Match</div>
									}
									</div>
								)}
								</div>
							</form>
							<div className="d-flex">
								<i className="material-icons">local_phone</i>
								<span>Call us at 09XXXXXXXXX</span>
							</div>
						</div>
					</div>
				</div>
				{/* <Navigation user={this.props.user} /> */}
			</header>
		);
	}
}

export default Header;
