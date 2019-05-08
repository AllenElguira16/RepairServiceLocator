import * as React from "react";
import ReactTimeAgo from "react-time-ago";

class Question extends React.Component<any, any>{
  constructor(props: any){
    super(props);
  }

  render(){
    let question = this.props.question;
    return (
      <div className="col-sm-12">
        <div>{question.Content}</div>
        <div className="small">
          <ReactTimeAgo date={new Date(question.Date)}/>
        </div>
      </div>
    )
  }
}
export default Question;