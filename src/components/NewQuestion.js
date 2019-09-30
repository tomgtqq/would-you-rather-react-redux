import React, { Component } from "react"
import { connect } from "react-redux"
import { handleAddQuestion } from "../actions/questions"
import { Redirect } from "react-router-dom"
import { Form, Divider } from "semantic-ui-react"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardImg,
    CardTitle,
    Container,
    Row,
    Col
  } from "reactstrap";

class NewQuestion extends Component {
    state = {
        optionOneText: "",
        optionTwoText: "",
        toDashboard: false
    }
    handleOptionOneChange = e => {
        const optionOneText = e.target.value
        this.setState(() => ({optionOneText}))
    }
    handleOptionTwoChange = e => {
        const optionTwoText = e.target.value
        this.setState(()=>({optionTwoText}))
    }
    handleSubmit = e => {
        e.preventDefault();
        const { optionOneText, optionTwoText } = this.state;
        const { dispatch, id, author } = this.props;
        dispatch(handleAddQuestion(optionOneText, optionTwoText, author));
        //Update UI state and go back Dashboard to save waitting time, if adding opertion is error , need to create a again.
        this.setState(() => ({
            optionOneText: "",
            optionTwoText: "",
            toDashboard: id ? false : true
          }));
      };
    render() {
        const { optionOneText, optionTwoText, toDashboard} = this.state
        if(toDashboard === true) {
            return <Redirect to='/' />
        }
        return(
            <>
                <div className="content">
                    <Container>
                        <Row>
                        <Col className="ml-auto" md="5">
                            <div className="description">
                                <p className="description">
                                    First with awareness, then with distinction. The selection is a distinction, 
                                    the selection is freedom.

                                    Create your own questions. Good questions are often 
                                    interesting.
                                </p>
                            </div>
                        </Col>
                        <Col className="mr-auto" md="7">
                        <Form onSubmit={this.handleSubmit}>
                            <Card className="card-register card-black">
                                <CardHeader>
                                    <CardImg
                                    alt="..."
                                    src={require("../assets/img/card-success.png")}
                                    />
                                    <CardTitle tag="h4" style={{color:"#e14eca"}}>Would you rather</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Form.Input
                                    placeholder="Enter Option One Text Here"
                                    value={optionOneText}
                                    onChange={this.handleOptionOneChange}
                                    className="textarea"
                                    maxLength={180}
                                    />
                                    <Divider horizontal>Or</Divider>
                                    <Form.Input
                                        placeholder="Enter Option Two Text Here"
                                        value={optionTwoText}
                                        onChange={this.handleOptionTwoChange}
                                        className="textarea"
                                        maxLength={180}
                                        />
                                </CardBody>
                                <CardFooter>
                                    <Form.Button fluid size="large" disabled={optionOneText === "" || optionTwoText === "" }  style={{background:"#C752E7",color:"#fff"}}>  Submit </Form.Button>
                                </CardFooter>
                            </Card>
                            </Form>
                        </Col>
                        </Row>
                    </Container>
                </div>
            </>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        author: authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion)