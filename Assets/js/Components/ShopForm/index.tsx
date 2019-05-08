import * as React from "react"
import Form from './Form'
// import Axios from "axios"

class ShopForm extends React.Component<any, any>{
    constructor(props: any){
      super(props)
      this.state = {
        status: {
          type: '',
          msg: ''
        }
      }
    }
    handleAlertMessage(type: string, msg: string){
      this.setState({
        status: {type, msg}
      });
    }
    
    render(){
      let State = this.state;
      return (
        <div className="modal" id="myshopModal" tabIndex={-1} role="dialog">
          <div className="modal-dialog modal-lg" role="document">
          {State.status.type === 'success' && <div className="shop-manager-alert" style={{zIndex: 1}}>
            <div className="h4">
                <strong>{State.status.msg}</strong>
            </div>
          </div>}
          {State.status.type === 'error' && <div className="alert alert-danger position-absolute w-100 mt-3" style={{zIndex: 1}} v-if="alertError">
            <div className="h4">
              <strong>{State.status.msg}</strong>            
            </div>
          </div>}
          <Form id={this.props.id} onChange={this.handleAlertMessage.bind(this)} action={this.props.action} onSuccess={() => this.props.updateList()}/>
        </div>
      </div>
    )
  }
}
export default ShopForm;