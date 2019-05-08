import * as React from 'react';
import Axios from 'axios';

export default class DeleteConfirmation extends React.Component<any, any>{
  delete(){
    Axios.post('/api/deleteShop', {id: this.props.shopId}).then(res => {
      this.props.updateList()
    });
  }
  render(){
    return(
      <div className="modal" id="DeleteConfirmation" tabIndex={-1} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="h4">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Alert!</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>  
              </div>
              <div className="modal-body">
                <div>Are you sure you wan't to delete?</div>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-primary" data-dismiss="modal" onClick={this.delete.bind(this)}>yes</button>
                  <button className="btn btn-secondary" data-dismiss="modal">no</button>
                </div>    
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}