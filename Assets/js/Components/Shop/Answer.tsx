import * as React from "react";
import Axios from "axios";

class Answer extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      answers: [],
      answer: ''
    }
  }
  answerInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    this.setState({
      answer: e.currentTarget.value
    });
  }

  submitAnswer(QuestionId: number){
    Axios.post(`/api/questions/${this.props.shop.Id}/answer`, {QuestionId: QuestionId, Content: this.state.answer}).then(res => {
        
    });
  }

  getAnswer(answers: any){
    answers.filter((answer: any) => {
      if(this.props.question.id === answer.QuestionId){
        this.setState({
          answers: answer
        });
      }
    });
  }

  componentWillReceiveProps(props: any){
    this.getAnswer(props.answers);
  }

  componentDidMount(){
    this.getAnswer(this.props.answers);
  }

  render(){
    let question = this.props.question;
    let answer = this.state.answers;
    return (
      this.state.answers.length == 0 ? 
      this.props.isSameUser && 
      <div className="form-group col-sm-6">
        <textarea className="form-control" placeholder="Answer Question" onChange={this.answerInput} value={this.state.answer}/>
        <button type="submit" className="text-white btn btn-warning d-flex ml-auto" onClick={this.submitAnswer.bind(this, question.id)}>
          <span>Send</span>
          <i className="material-icons">send</i>
        </button>
      </div> 
      :
      <div>
        <div className="pl-5" key={answer.id}>answer: {answer.Content}</div>    
      </div>
    );
  }
}
export default Answer;