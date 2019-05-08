import * as React from "react";

class Shop extends React.Component{
  render(){
    return (
      <article className="card">
        <div className="card-header">
          <span>Manage Stores</span>
        </div>
        <div className="card-body">
          <div className="row container px-0">
            {/* <!-- Store Navigation --> */}
            <nav className="navbar">
              <div className="navbar-nav">
                <a href="#" className="nav-link">Add Store</a>
                <a href="#" className="nav-link">Remove Store</a>
                <a href="#" className="nav-link">Update Store</a>
              </div>
            </nav>
          </div>
        </div >
      </article >
    );
  }
}
export default Shop;