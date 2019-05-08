import * as React from 'react';
import "react-image-crop/lib/ReactCrop.scss";
import Axios from 'axios';

class AddProfile extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      image: '',
      file: '',
      alert: {
        type: '',
        msg: ''
      }
    }
  }
  FileCapture = (e: any) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      this.setState({
        image: reader.result,
        file
      })
    }
  }
  submit(e: React.FormEvent<HTMLInputElement>){
    e.preventDefault();
    let form = new FormData;
    form.append('image', this.state.file);
    Axios.post('/api/add-profile', form).then((res: any) => {
      if(res.data.success){
        // this.props.history.push('/');
        this.setState({alert: {
          type: 'success',
          msg: 'Profile Changed'
        }})
      } else {
        this.setState({alert: {
          type: 'warning',
          msg: 'Error changing profile'
        }})
      }
    });
  }

  clearAlert = () => {
    this.setState({
      alert: {
        type: '',
        msg: ''
      }
    });
  }

  render(){
    let {alert} = this.state;
    return (
      <div className="col-sm-6 container">
        <div className="card">
          <header className="card-header"><h4>Profile picture</h4></header>
          <div className="card-body">
            <form action="" onSubmit={this.submit.bind(this)}>
              {alert.type != '' && 
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                  <strong>Holy guacamole!</strong> {alert.msg}
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.clearAlert}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              }
              <div className="form-group">
                <div className="overflow-hidden" style={{width: "100%", height: "340px"}}>
                  <img src={this.state.image !== '' ? this.state.image : `/images/defaulProfile.jpg`} className="rounded-circle border img-fluid w-100 h-100"/> 
                </div>
                <div className="col">
                  <div className="row justify-content-between">
                    <label htmlFor="file" className="btn btn-dark m-0">Choose Picture</label>
                    <button type="submit" className="btn btn-warning">Submit</button>
                  </div>
                </div>
                <input className="d-none" id="file" type="file" name="fileUpload" accept="image/*" onChange={this.FileCapture.bind(this)}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default AddProfile;