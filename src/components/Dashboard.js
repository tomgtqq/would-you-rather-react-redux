import React,{ Component } from "react"
import { connect } from "react-redux";
import  Question  from "./Question";
import {
    Button,
    ButtonGroup,
  } from "reactstrap";

  class Dashboard extends Component {
    state = {}
    render() {
        let questionIds = this.state.answered ? this.props.answeredQuestionIds
                        : this.props.unAnsweredQuestionIds;
        return (
          <>
            <ButtonGroup>
                <Button  color="primary" onClick={e=> this.setState({answered:false})}>
                    Unanswered
                </Button>
                <Button  color="primary" onClick={e=> this.setState({answered:true})}>
                    Answered
                </Button>
            </ButtonGroup>    
            <ul className="dashboard-list">
                {questionIds.map(id => (
                    <Question key={id} id={id} answered={this.state.answered} />
                ))}
            </ul>   
          </>
        )
    }
}

function mapStateToProps({ questions , authedUser}) {
    return {
        answeredQuestionIds: Object.keys(questions)
        .filter(id =>
                questions[id].optionOne.votes.indexOf(authedUser) !==-1||
                questions[id].optionTwo.votes.indexOf(authedUser) !==-1
            )
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp ),
        
        unAnsweredQuestionIds: Object.keys(questions)
        .filter(id =>
                questions[id].optionOne.votes.indexOf(authedUser) ===-1&&
                questions[id].optionTwo.votes.indexOf(authedUser) ===-1)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp )
    }
}

export default connect(mapStateToProps)(Dashboard)