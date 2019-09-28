import React,{ Component } from "react"
import { Menu, Segment } from "semantic-ui-react"
import { connect } from "react-redux";
import  Question  from "./Question";

class Dashboard extends Component {
    state = { answered : false }
    render() {
        const { answered } = this.state
        let questionIds = this.state.answered ? this.props.answeredQuestionIds : this.props.unAnsweredQuestionIds;
        return (
          <Segment>
              <div>
                  <Menu widths={2}>
                      <Menu.Item
                        name="Unanswered"
                        active={!answered}
                        onClick={e=> this.setState({answered:false})}
                      />
                      <Menu.Item
                        name="Answered"
                        active={answered}
                        onClick={e=> this.setState({answered:true})}
                      />                         
                   </Menu>
                </div>   
                <ul className="dashboard-list">
                    {questionIds.map(id => (
                         <Question key={id} id={id} answered={this.state.answered} />
                    ))}
                </ul>   
          </Segment>
        )
    }
}

function mapStateToProps({ questions , authedUser}) {
    return {
        answeredQuestionIds: Object.keys(questions)
        .filter(id =>
            questions[id].optionOne.votes.indexOf(authedUser) !==-1||questions[id].optionTwo.votes.indexOf(authedUser) !==-1
        )
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp ),

        unAnsweredQuestionIds: Object.keys(questions)
        .filter(id =>
            questions[id].optionOne.votes.indexOf(authedUser) ===-1&&questions[id].optionTwo.votes.indexOf(authedUser) ===-1
        )
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp )
    }
}

export default connect(mapStateToProps)(Dashboard)