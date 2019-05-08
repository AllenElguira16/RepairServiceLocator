import * as React from "react";

class Star extends React.Component<any, any>{

    Stars(){
        for(let i = 0; i < this.props.count; i++){
            
            <i className="material-icons">star</i>
        }
    }

    render(){
        console.log(this.props.fill);
        return (
            // this.
            // this.props.count
            <i className="material-icons">star</i>
        );
    }
}
export default Star;