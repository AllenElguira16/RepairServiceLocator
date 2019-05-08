import * as React from "react"
import { NavLink } from "react-router-dom";

class Home extends React.Component<any, any>{
  render (){
    let user = [];
    if (this.props.user){
        user = this.props.user;
    }
    return (
      <article id="home">
        {user.length === 0 ? 
        <div className="container-fluid p-0">
          <div className="position-relative" >
            <main className="main-page-overlay">
              <div className="col-md-4 d-flex h-100" style={{ backgroundColor: "rgba(255,255,255,0.7)" }}>
                <div className="align-self-center">
                  <header >
                    <img src={'images/logo.png'} alt="logo text" style={{height: "auto", width: "100%"}}/>
                  </header>
                  <section>
                    <span className="ml-2">Find a repair shops that suits your needs</span>
                    <div className="py-4 d-flex justify-content-around">
                      <NavLink className="btn btn-lg btn-primary text-white" to="/signup">CREATE ACCOUNT</NavLink>
                      <NavLink className="btn btn-lg btn-outline-success text-dark" to="/signin">LOGIN</NavLink>
                    </div>
                    <span className="ml-2"><em>WE GUARANTEE FAST SERVICE NO MATTER HOW LONG IT TAKES</em></span>
                  </section>
                </div>
              </div>
            </main>
          </div>
        </div>
        :
        <div className="main-page-user">

        </div>
        }
      </article>
    )
  }
}
export default Home;