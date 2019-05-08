import * as React from "react"

class Footer extends React.Component<any, any>{
  render(){
    return (
      // <img src="" alt="footer" className="img-fluid"/>
      <div style={{height: 100}}>
        <footer className="fixed-bottom" style={{
          background: "url(/images/footer.jpg) no-repeat center center",
          backgroundSize: "cover",
          height: 100,
          zIndex: 0
        }}
        ></footer>
      </div>
    )
  }
}
export default Footer