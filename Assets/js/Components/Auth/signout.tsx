import * as React from "react"
import {ReactNode} from "react"
import Axios from "axios";

class Signout extends React.Component<any, any>{
    signout(isTrue: boolean){
        if(isTrue){
            Axios.post("/logout").then(res => {
                if(res.data.success){
                    window.location.href = "/"
                } 
            })
        } else {
            this.props.history.goBack()
        }
    }
    render() {
        return (
            <article className="main-container">
                <div className="card">
                    <div className="card-header">Warning!</div>
                    <div className="card-body">
                        <p>Are you sure you want to logout?</p>
                        <div className="form-group form-inline justify-content-between">
                            <button className="btn btn-primary" onClick={this.signout.bind(this, true)}>Yes</button>
                            <button className="btn btn-dark"  onClick={this.signout.bind(this, false)}>No</button>
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}
export default Signout
