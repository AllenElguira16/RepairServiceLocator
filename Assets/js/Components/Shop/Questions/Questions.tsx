import * as React from "react";
import * as io from "socket.io-client"
import Question from "./Question";
import Axios from "axios";
import Answer from "../Answer";

class Questions extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      questions: [],
      question: '',
      shop: {},
      isSameUser: '',
      isLoggedIn: false,
      answers: []
    }
  }
  fillQuestions() {
    Axios.get(`/api/questions/${this.state.shop.Id}`).then(res => {
      this.setState({
        questions: res.data
      });
    });
  }
  handleInput(e: any) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitQuestion(e: any) {
    e.preventDefault();
    let form = { question: this.state.question };
    Axios.post(`/api/questions/${this.state.shop.Id}`, form).then(res => {
      if (res.data.success) {
        this.setState({
          question: ''
        });
      }
    });
  }
  componentWillReceiveProps(newProp: any){
    this.setState({
      isSameUser: newProp.isSameUser,
      shop: newProp.shop,
      isLoggedIn: newProp.isLoggedIn
    })
    this.fillQuestions();
  }

  getAnswers(){
    Axios.get("/api/questions/answers").then(res => {
      this.setState({
        answers: res.data
      })
    });
  }

  componentDidMount(){
      this.getAnswers();
  }

  componentWillUpdate() {
    const socket = io("https://www.repairservicelocator.test:8000");
    socket.on('newQuestions', () => {
      this.fillQuestions();
    });
    socket.on('newAnswer', () => {
      this.getAnswers();
    });
  }

  render(){
    return (
      <div className="card mt-4">
        <div className="card-header">Questions</div>
        <div className="card-body">
          {!this.state.isSameUser && this.state.isLoggedIn &&
          <form onSubmit={this.submitQuestion.bind(this)}>
            <div className="form-group">
              <textarea autoComplete="off" name="question" value={this.state.question} className="form-control" placeholder="Ask a question" onChange={this.handleInput.bind(this)} />
              {/* <div className=""> */}
              <button type="submit" className=" text-white ml-auto d-flex btn btn-warning">
                <span className="pr-2">Submit</span>
                <i className="material-icons">send</i>
              </button>
              {/* </div> */}
              {/* <a className="btn btn-link">Add a Question</a> */}
            </div>
          </form>
          }
          {!this.state.isLoggedIn &&
              <div>Sign in to ask questions</div>
          }
          {this.state.questions.length === 0 ?
          <div>
              <span>No Questions</span>
          </div>
          :
          <div className="container">
            {this.state.questions.map((question: any) =>
            <div className="p-2" key={question.id}>
              <Question question={question} />
              {/* {this.state.isSameUser &&  */}
              <Answer answers={this.state.answers} isSameUser={this.state.isSameUser} id={this.state.shop.id} question={question} shop={this.state.shop}/>
              {/* } */}
            </div>
            )}
          </div>
          }
        </div>
      </div>
    );
  }
}
export default Questions;