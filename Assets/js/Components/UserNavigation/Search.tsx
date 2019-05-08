import * as React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class Search extends React.Component<any, any>{
  state: any = {
    filteredShops: [{}],
    isOpenSearchBox: false,
    search: ''
  }
  isTyped = (e: any) => {
    let value = e.target.value;
    Axios.post('/api/search', {search: value}).then(res => {
      console.log(res.data);
      this.setState({
        filteredShops: res.data,
        isOpenSearchBox: value !== '' ? true : false,
        search: value
      });
    });
  }
  
  shopLink(name: string, category: string) {
    return `/shops/${category.toLowerCase()}/${name.replace(/\ /g, "+")}`;
  }
  
  clearInput = () => {
    this.setState({
      search: '',
      isOpenSearchBox: false
    })
  }
  render(){
    // let filteredShops: any = this.state.shops.filter((shop: any) => {
    //   return shop.Name.toLowerCase().indexOf(this.state.search.toLocaleLowerCase()) !== -1;
    // });
    let {filteredShops, isOpenSearchBox} = this.state;
    return(
      <div className="navbar-nav d-inline w-50 position-relative">
        <div className="input-group align-items-center bg-white border d-flex input-group rounded-pill">
          <input value={this.state.search} onChange={this.isTyped.bind(this)} type="text" className="bg-transparent border-0 form-control" placeholder="Search Shops"/>
            <i className="material-icons px-2">search</i>
          </div>
          {isOpenSearchBox && (
          <div className="card position-absolute w-100" style={{ zIndex: 1000 }}>
            <div className="card-body">
              {filteredShops.length !== 0 ?
                filteredShops.map((shop: any, i: number) => (
                  <div key={i}>
                    <Link onClick={this.clearInput.bind(this)} className="link text-dark" to={this.shopLink(shop.Name, shop.Category)}>{shop.Name}</Link>
                  </div>
                ))
                :
                <div>No Match</div>
              }
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default Search;