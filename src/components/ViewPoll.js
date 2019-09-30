import React, { Component } from "react"
import { connect } from "react-redux"

// reactstrap components
import {

    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Container,
    Col,
    Progress
  } from "reactstrap";

class ViewPoll extends Component {

    render() {
        const { question, authedUser, author } = this.props

        if (question === null) {
            return <p>This question doesn't exist</p>
        }

        const { optionOne, optionTwo } = question
        const totalVotes = optionOne.votes.length + optionTwo.votes.length;

        return (
            <>
            <div className="content">
              <Container>
                <Col className="ml-auto mr-auto" lg="4" md="6">
                  <Card className="card-lock card-black text-center">
                    <CardHeader>
                      <img alt="..." src={author.avatarURL} />
                    </CardHeader>
                    <CardBody>
                        <CardTitle tag="h4">{author.name} asks</CardTitle>
                        <h2>Results</h2>
                        <div>
                            <h4 className="info-title">{optionOne.text}</h4>
                            <div className="progress-container progress-primary">
                                <span className="progress-badge ">
                                    {optionOne.votes.length} out of {totalVotes} votes
                                </span>
                                <Progress max="100" value={totalVotes?Math.round((optionOne.votes.length / totalVotes)*1000)/10 :0}>
                                    <h4 className="progress-value ">
                                        {totalVotes?Math.round((optionOne.votes.length / totalVotes)*1000)/10:0}%  
                                        {optionOne.votes.indexOf(authedUser) !== -1
                                                ? <i className="tim-icons icon-heart-2" style={{color:"#e14eca"}}/>
                                                :""}
                                    </h4>
                                </Progress>
                            </div>
                        </div>
                        <div>
                            <h4 className="info-title">{optionTwo.text}</h4>
                            <div className="progress-container progress-primary">
                                <span className="progress-badge ">
                                    {optionTwo.votes.length} out of {totalVotes} votes
                                </span>
                                <Progress max="100" value={totalVotes?Math.round((optionTwo.votes.length/totalVotes)*1000)/10:0}>
                                    <h4 className="progress-value ">
                                        {totalVotes?Math.round((optionTwo.votes.length/totalVotes)*1000)/10:0}%  
                                        {optionTwo.votes.indexOf(authedUser) !== -1
                                                ? <i className="tim-icons icon-heart-2" style={{color:"#e14eca"}}/>
                                                :""}
                                    </h4>
                                </Progress>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter>
                    </CardFooter>
                  </Card>
                </Col>
              </Container>
            </div>
          </>
       )
    }   
}

function mapStateToProps({ authedUser, questions, users }, ownProps) {
    const { id } = ownProps.match.params 
    const question = questions[id]
    const author = question && question.author ? users[question.author] : null  
    
    return {
        authedUser,
        question,
        author
    }
}

export default connect(mapStateToProps)(ViewPoll)