import React, { Component } from "react"
import { connect } from "react-redux"
import { Grid, Segment, Header, Image } from "semantic-ui-react";

const colors = ["yellow", "grey", "brown"]

class LeaderBoard extends Component {
    render() {
        const { leaders, users } = this.props
        let sorted = Object.keys(leaders).sort(
            (a, b) => (leaders[b].answered + leaders[b].asked) - (leaders[a].answered + leaders[a].asked)
        )

        return (
            <Grid textAlign="center" style={{height: "100%"}} verticalAlign="middle">
                <Grid.Column style={{ maxWidth: 550 }}>
                    {sorted.map((id, index) => {
                        const { answered, asked } = leaders[id]
                        const total = answered + asked
                        return(
                            <Segment key={id} color={index < 3 ? colors[index]: "transparent"}>
                                <Grid>
                                    <Grid.Row key={id} columns={3}>
                                        <Grid.Column>
                                            <Image height={100} src={users[id].avatarURL}/>
                                        </Grid.Column>  
                                        <Grid.Column>
                                            <Header as="h3">{users[id].name}</Header>
                                            <div>
                                                <span>Answered questions: {answered}</span>
                                            </div>
                                            <div>
                                                <span>Created question: {asked}</span>
                                            </div>    
                                        </Grid.Column>  
                                        <Grid.Column>
                                            <Header as="h4" color="teal" textAlign="right">
                                                Score: {total}
                                            </Header>    
                                        </Grid.Column>  
                                    </Grid.Row>    
                                </Grid>
                            </Segment>    
                        )
                    })}
                </Grid.Column>    
            </Grid>    
        )
    }
}

function mapStateToProps({ questions, users }) {
    let leaders = Object.keys(questions).reduce((acc, currValue) => {
        let question = questions[currValue]
        if(acc[question.author]===undefined){
            acc[question.author] = { answered: 0, asked: 1}
        } else {
            acc[question.author].asked++
        }
        question.optionOne.votes.forEach(i => {
            if(acc[i]=== undefined){
                acc[i] = { answered: 1, asked: 0}
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