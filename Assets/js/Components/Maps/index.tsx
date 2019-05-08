import * as React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper} from "google-maps-react";

import Axios from "axios";

export class Maps extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      shops: [],
      isShown: false,
      activeMarker: {},
      selectedPlace: {},
    }
  }
  
  componentDidMount(){
    let dis = this;
    let geocoder = new this.props.google.maps.Geocoder();
    Axios.get('/api/shops').then(res => {
      res.data.map((shop: any) => {
        geocoder.geocode({ 'address': `${shop.Barangay}` }, function (res: any, stat: any) {
          if (stat == 'OK') {
            console.log(res[0]);
            let lat = res[0].geometry.location.lat();
            let lng = res[0].geometry.location.lng();
            dis.setState({
              shops: [...dis.state.shops, {shop, position: {lat, lng} }]
            })
          }
        });
      });
    });
  }

  onMarkerClick = (props: any, marker: any, e: any) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      isShown: true
    });
  }
  onClick(t: any, map: any, coord: any) {
    
  }
  strToUrl(str: string){
    return str.replace(/ /g, '+');
  }
  render(){
    let selectedShop = this.state.selectedPlace.shop;
    return (
      <Map 
        google={this.props.google} 
        zoom={14}
        initialCenter={{
          lat: 16.0433,
          lng: 120.3333
        }}
        onClick={this.onClick.bind(this)}
      >
        {this.state.shops.map((shops: any, i: any) => 
          // shops.shop.map((shops: ))
          <Marker
            key={i}
            title={shops.shop !== undefined ? shops.shop.Name: ''}
            name={shops.shop !== undefined ? shops.shop.Name: ''}
            position={shops.position}
            onClick={this.onMarkerClick}
            icon={{
              url: shops.shop !== undefined ? `/uploads/Shops/${shops.shop.Name}/${shops.shop.Logo}` : `../../images/logo.jpg`,
              anchor: new this.props.google.maps.Point(32, 32),
              scaledSize: new this.props.google.maps.Size(64, 64)
            }}
            shop={shops.shop}
          />
        )}
        <InfoWindow 
            visible={this.state.isShown}
            marker={this.state.activeMarker}
        >
          {selectedShop !== undefined ? <div>
            <h4>{selectedShop.Name}</h4>
            <div>
              <a href={`/shops/${selectedShop.Category}/${this.strToUrl(selectedShop.Name)}`}>Click to visit shop</a>
            </div>
          </div>: <div></div>}
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCQ8NfDQY8_mduQyM0sof-W48x4Mw7iIC4"
})(Maps)