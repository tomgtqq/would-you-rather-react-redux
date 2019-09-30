import React, { Component } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from 'react-router-dom'

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
  } from "reactstrap";

class Question extends Component {
    render() {
        const { question, author, answered } = this.props
        const { avatarURL } = author
        const { id, optionOne , optionTwo } = question

        return(
            <Card className="card-testimonial">
                <CardHeader className="card-header-avatar">
                    <img
                      alt="..."
                      className="img img-raised"
                      src={avatarURL}
                    />
                </CardHeader>
                <CardBody>
                  <p className="card-description">
                     Would you rather 
                     {optionOne.text.substring(0,28)}... <strong>or</strong> {optionTwo.text.substring(0,28)}...
                  </p>
                  <div className="icon icon-primary">
                    <i className="fa fa-quote-right" />
                  </div>
                </CardBody>
                <CardFooter>
                    { answered ?
                            <Link to={`/questions/${id}`}>
                                <Button className="btn-round btn-just-icon" color="primary">
                                    View Poll
                                </Button>
                            </Link>
                            :
                            <Link to={`/vote/${id}`}>
                                <Button className="btn-round btn-just-icon" color="primary">
                                    Vote
                                </Button>
                            </Link>
            }
                </CardFooter>
              </Card>
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, { id, answered }) {
    const question = questions[id]
    const author =question&& question.author ? users[question.author]:null
    return {
        authedUser,
        author,
        question,
        answered
    }
}

export default withRouter(connect(mapStateToProps)(Question))