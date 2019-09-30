import React, { Component } from "react"
import { connect } from "react-redux"
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col
  } from "reactstrap";

class LeaderBoard extends Component {
    render() {
        const { leaders, users } = this.props
        let sorted = Object.keys(leaders).sort(
            (a, b) => (leaders[b].answered + leaders[b].asked) - (leaders[a].answered + leaders[a].asked)
        )
        return (
                <div className="content">
                    <Row>
                        <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Ranking list</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th className="text-center">Name</th>
                                            <th className="text-center">Answered questions</th>
                                            <th className="text-center">Created question</th>
                                            <th className="text-center">Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sorted.map((id, index) => {
                                            const { answered, asked } = leaders[id]
                                            const total = answered + asked
                                            return(
                                                    <tr key={index}>
                                                        <td className="text-center">
                                                            <div className="photo">
                                                                <img
                                                                alt="..."
                                                                src={users[id].avatarURL}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="text-center">{users[id].name}</td>
                                                        <td className="text-center">{answered}</td>
                                                        <td className="text-center">{asked}</td>
                                                        <td className="text-center">{total}</td>
                                                    </tr>
                                                )
                                            })}
                                    </tbody>
                                    </Table>
                            </CardBody>
                        </Card>
                        </Col>
                    </Row>
                </div>
            )
        }
}

function mapStateToProps({ questions, users }) {
    let leaders = Object.keys(questions).reduce((acc, currValue) => {
        let question = questions[currValue]
        if(acc[question.author]===undefined){
            acc[question.author] = { 
                answered: 0, 
                asked: 1
            }
        } else {
            acc[question.author].asked++
        }

        question.optionOne.votes.forEach(i => {
            if(acc[i]=== undefined){
                acc[i] = { 
                    answered: 1, 
                    asked: 0
                }
            } else {
                acc[i].answered++
            }
        })
        
        question.optionTwo.votes.forEach(i => {
            if(acc[i] === undefined){
                acc[i] = { answered: 1, asked: 0};
            } else {
                acc[i].answered++
            }
        })
        return acc
    },{})
    return {
        leaders,
        users
    }
}

export default connect(mapStateToProps)(LeaderBoard)