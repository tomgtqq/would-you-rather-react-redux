import React , { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Form, Image} from 'semantic-ui-react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Container,
    Col
  } from "reactstrap";

class Login extends Component {
    state = {};

    handleChange = ((e,{ value }) => {
        const { users } = this.props;
        this.setState({
            value,
            avatarURL: users[value].avatarURL
        })
    })
    handleSubmit = event => {
        const { dispatch } = this.props
        dispatch(setAuthedUser(this.state.value))
    }
    componentDidMount() {
        document.body.classList.toggle("login-page");
      }
    componentWillUnmount() {
        document.body.classList.toggle("login-page");
      }

    render(){
        const { users } = this.props
        return (
        <div className="content">
            <Container>
                <Col className="ml-auto mr-auto" lg="4" md="6">
                    <Form onSubmit={this.handleSubmit}>
                            <Card className="card-login card-white">
                            <CardHeader>
                                <img
                                alt="..."
                                src={this.state.avatarURL?this.state.avatarURL:require("../assets/img/card-primary.png")}
                                />
                                <CardTitle tag="h1">Log in</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Image size="small" src={this.state.avatarURL} avatar />
                                <Form.Dropdown
                                    fluid
                                    selection
                                    placeholder="Select User"
                                    onChange={this.handleChange}
                                    options={Object.keys(users).map(id => {
                                        return {
                                            image: users[id].avatarURL,
                                            text: users[id].name,
                                            value: id
                                        }
                                    })}
                                />
                            </CardBody>
                            <CardFooter>
                                <Form.Button fluid size="large" disabled={!this.state.value} style={{background:"#C752E7",color:"#fff"}}>  Get Started </Form.Button>
                            </CardFooter>
                        </Card>
                        </Form>
                    </Col>
                </Container>
            </div>
        )
    }
}

function mapStateToProps( {users} ){
    return {
        userIds: Object.keys(users),
        users
    }
}

export default connect(mapStateToProps)(Login)
