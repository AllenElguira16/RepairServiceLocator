import * as React from 'react';
import Axios from 'axios';
import Module from '../../Classes/Module';
class Form extends React.Component<any, any>{
  state: any = {
    id: '',
    Name: '',
    Barangay: '',
    ContactNumber: '',
    Category: '',
    Logo: '',
    BusinessPermits: '',
    _preview: ''
  }
  handleInput(e: any) {
    this.setState({[e.target.name]: e.target.value})
  }
  handleFileInput(e: any) {
    if(e.target.name === "Logo"){
      this.setState({_preview: URL.createObjectURL(e.target.files[0])});
    }
    this.setState({[e.target.name]: e.target.files[0]});
  }
  handleSubmit(e: any) {
    e.preventDefault()
    let State = this.state;
    let formData = new FormData();
    formData.append('id', State.id);
    formData.append('Name', State.Name);
    formData.append('Logo', State.Logo, State.Logo.name);
    formData.append('BusinessPermits', State.BusinessPermits);
    formData.append('Barangay', State.Barangay);
    formData.append('ContactNumber', State.ContactNumber);
    formData.append('Category', State.Category);
    Axios.post(e.target.action, formData).then(res => {
      console.log(res.data);
      if (res.data.success) {
        this.props.onSuccess();
        this.props.onChange('success', 'Uploaded successfully');
      } else if (res.data.error) {
        this.props.onChange('error', 'Uploading failed');        
      }
    })
  }
  fillForm(id: any) {
    Axios.get(`/api/myshop/${id}`).then(res => {
      let shop = res.data[0];
      Axios.post(`/api/imageToBase64`, { dir: `/Public/uploads/Shops/${shop.Name}/${shop.Logo}`}).then(img => {
        this.setState({
          _preview: img.data,
          Logo: Module.dataURLtoFile(img.data, shop.Logo)
        });
      });
      this.setState({
        id: shop.Id,
        Name: shop.Name,
        Barangay: shop.Barangay,
        ContactNumber: shop.ContactNumber,
        Category: shop.Category,
      });
    });
  }
  
  componentWillReceiveProps(props: any){
    if(props.id !== null) this.fillForm(props.id);
    else if(props.id === null) this.clearForm();
  }

  clearForm() {
    this.setState({
      id: '',
      Name: '',
      Barangay: '',
      ContactNumber: '',
      Category: '',
      Logo: '',
      BusinessPermits: '',
      _preview: '',
    })
  }
  render(){
    let State = this.state;
    return (
      <form className="modal-content container" onSubmit={this.handleSubmit.bind(this)} action={this.props.action}>
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body row">
          <div className="col-sm-6">
            <div className="form-group">
              <input value={State.Name} type="text" className="form-control" placeholder="Shop name" name="Name" onChange={this.handleInput.bind(this)} />
            </div>
            <div className="form-group">
              <input value={State.Barangay} type="text" className="form-control" placeholder="Barangay" name="Barangay" onChange={this.handleInput.bind(this)} />
            </div>
            <div className="form-group">
              <input value={State.ContactNumber} type="text" className="form-control" placeholder="Contact #" name="ContactNumber" onChange={this.handleInput.bind(this)} />
            </div>
            <div className="form-group">
              <select value={this.state.Category} className="form-control" aria-placeholder="Category" name="Category" onChange={this.handleInput.bind(this)}>
                <option value="" defaultValue="true" disabled hidden>Please select</option>
                <option value="Appliances">Appliance</option>
                <option value="Automotives">Automotive</option>
                <option value="Gadgets">Gadgets</option>
                <option value="PC Hardware">PC Hardware</option>
              </select>
            </div>
            <div className="form-group">
              <input type="file" name="BusinessPermits" className="form-control-file" onChange={this.handleFileInput.bind(this)} accept=".zip,.rar" />
            </div>
          </div>
          <div className="col-sm-6 h-auto">
            <div className="border d-flex align-items-center justify-content-center h-100">
              {State.Logo &&
                <img alt="url" className="img-fluid" src={this.state._preview} />
              }
              <label htmlFor="store-logo" className="position-absolute">
                {State.Logo === '' ?
                  <span className="btn btn-dark">Store Logo</span>
                  :
                  <span className="btn btn-dark bg-light border">Change Logo</span>
                }
              </label>
            </div>
            <input type="file" name="Logo" className="d-none form-control-file" id="store-logo" ref="imageFile" onChange={this.handleFileInput.bind(this)} accept="image/*"/>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" className="btn btn-primary">Save changes</button>
        </div>
      </form>
    );
  }
}
export default Form;