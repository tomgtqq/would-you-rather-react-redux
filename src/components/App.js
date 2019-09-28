import React, { Component, Fragment } from 'react'
import { connect } from "react-redux"
import { handleInitialData } from "../actions/shared"
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import LoadingBar from 'react-redux-loading'
import Login from "./Login"
import Dashboard from "./Dashboard"
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import Nav from './Nav'


class App extends Component {
    componentDidMount () {
        this.props.dispatch(handleInitialData())
    }
    render() {
        return(
            <Router>
                <Fragment>
                    <LoadingBar/>
                    <Container>
                        <Nav />
                        {this.props.loading === true 
                        ? <Login/>
                        : (
                            <div>
                                <Switch>
                                    <Route path="/" exact component={Dashboard}/>
                                    <Route path="/add" component={NewQuestion}/>
                                    <Route path='/leaderboard' component={LeaderBoard}/>
                                    <Route path="/questions/:id" component={QuestionPage}/>
                                </Switch>
                            </div>    
                        )}
                    </Container>
                </Fragment>
            </Router>
        )
    }
}

function mapStateToProps ({ authedUser }) {
    return {
        loading: authedUser === null
    }
}

export default connect(mapStateToProps)(App)