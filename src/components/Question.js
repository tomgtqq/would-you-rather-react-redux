import React, { Component } from "react"
import { connect } from "react-redux"
import { Card, Button, Segment, Image } from "semantic-ui-react" 
import { Link, withRouter } from 'react-router-dom'


class Question extends Component {
    render() {
        console.log(this.props)
        const { question,author } = this.props

        if ( question === null) {
            return <p>This Question doesn't existed </p>
        }

        const {
            id, optionOne
        } = question

        const {
            name, avatarURL
        } = author

        return(
            <Card>
                <Card.Content>
                    <Card.Header>
                        <div>
                            <Image src={avatarURL} avatar/>
                            <span>{name} asks</span>
                        </div>
                    </Card.Header>
                    <Segment basic>Would you rather</Segment>    
                    <Segment>{optionOne.text.substring(0,16)}...</Segment>
                    <Link to={`/questions/${id}`}>
                        <Button>View Poll</Button>
                    </Link>         
                </Card.Content>
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