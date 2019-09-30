import React, { Component } from 'react'
import { connect } from "react-redux"
import { handleInitialData } from "../actions/shared"
import { BrowserRouter as Router, Route, Switch,NavLink} from 'react-router-dom'
import { Container , Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import LoadingBar from 'react-redux-loading'
import Login from "./Login"
import Dashboard from "./Dashboard"
import NoMatch404 from "./NoMatch404";
import Vote from './Vote'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import Logout from './Logout'
import ViewPoll from './ViewPoll'


class App extends Component {
    componentDidMount () {
        this.props.dispatch(handleInitialData())
    }
    render() {
        return(
            <Router>
                <div style={{ position: 'relative', top: 0, height: '100vh'}}>
                    <LoadingBar/>
                    <Sidebar.Pushable as={Segment}>
                        <Sidebar
                        as={Menu}
                        animation='overlay'
                        icon='labeled'
                        inverted
                        vertical
                        visible
                        width='thin'
                        color='black'
                        >
                            <Logout/>
                            <Menu.Item
                                name='Dashboard'
                                as={NavLink}
                                exact to="/"
                            >
                                <Icon name='home' />
                                    Dashboard
                            </Menu.Item>

                            <Menu.Item
                                name='NewQuestion'
                                as={NavLink}
                                exact to="/add"
                            >
                                <Icon name='edit outline' />
                                    New Question
                            </Menu.Item>

                            <Menu.Item
                                name='leaderboard'
                                as={NavLink}
                                exact to="/leaderboard"
                            >
                                <Icon name='chess' />
                                    Leader Board
                            </Menu.Item>
                        </Sidebar>
                        <Sidebar.Pusher>
                            <Segment basic>
                                <Container>
                                    {this.props.loading === true
                                    ? <Login/>
                                    : (
                                        <div>
                                            <Switch>
                                                <Route path="/" exact component={Dashboard}/>
                                                <Route path="/add" component={NewQuestion}/>
                                                <Route path='/leaderboard' component={LeaderBoard}/>
                                                <Route path="/questions/:id" component={ViewPoll}/>
                                                <Route path="/vote/:id" component={Vote}/>
                                                <Route component={NoMatch404} />
                                            </Switch>
                                        </div>
                                    )}
                                </Container>
                            </Segment>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </div >
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
