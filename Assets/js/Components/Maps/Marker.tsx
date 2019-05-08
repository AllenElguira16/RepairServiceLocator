import * as React from 'react';
import {Marker as BaseMarker} from 'google-maps-react';

class Marker extends React.Component<any, any>{
  constructor(props: any){
    super(props);

  }
  render(){
    let shop = this.props.shop;
    console.log(this.props);
    return (
      <BaseMarker
        title={shop.Name}
        name={shop.Name}
        position={this.props.position}
        onClick={this.props.onClick}
        icon={{
          url: require(`../../../images/uploads/${shop.Name}/${shop.Logo}`),
          anchor: new this.props.google.maps.Point(32, 32),
          scaledSize: new this.props.google.maps.Size(64, 64)
        }}
        shop={shop}
      />
    )
  }
}
export default Marker;