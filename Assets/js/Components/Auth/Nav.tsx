import * as React from 'react';

class Nav extends React.Component<any, any>{
  goBack() {
    this.props.history.goBack()
  }
  render(){
    return (
      <div className="form-group">
        <div className="d-flex align-items-center">
          <span className="h5 mb-0">{this.props.header}</span>
          <button type="button" onClick={this.goBack.bind(this)} className="mb-0 btn text-dark btn-link ml-auto">
            <i className="material-icons">arrow_back</i>
          </button>
        </div>
      </div>
    );
  }
}
export default Nav;