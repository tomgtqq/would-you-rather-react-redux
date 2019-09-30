import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter, Redirect } from 'react-router-dom'
import { handleAddQuestionAnswer } from "../actions/questions"

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Input,
    Form,
    FormGroup,
    Label,
    Container,
    Col
  } from "reactstrap";


class Vote extends Component {
    state = {
        value: "optionOne",
        toViewPoll: false
    }

    componentDidMount() {
        document.body.classList.toggle("lock-page");
    }
    componentWillUnmount() {
    document.body.classList.toggle("lock-page");
    }

    onRadioBtnClick = ( rselected ) => {
                this.setState({ value: rselected })
                console.log(rselected)
                console.log(this.state.value)
              }
    

    handleSubmit  = async (e) => {
      e.preventDefault();
      const { dispatch, question} = this.props
      console.log(this.state)

      dispatch(handleAddQuestionAnswer(question.id, this.state.value))

      this.setState(() => ({
          toViewPoll: question.id ? true : false  
        }))
    };

    render() {
        const { question, author } = this.props

        if (question === null) {
          return <p>This question doesn't exist</p>
         }
        const { id } = question

        if(this.state.toViewPoll === true) {
            return <Redirect to={`/questions/${id}`} />
        }
        
        return (
            <>
              <div className="content">
                <Container>
                  <Col className="ml-auto mr-auto" lg="4" md="6">
                    <Form onSubmit={this.handleSubmit}>
                      <Card className="card-lock card-black text-center">
                        <CardHeader>
                          <img alt="..." src={author.avatarURL} />
                        </CardHeader>
                        <CardBody>
                          <CardTitle tag="h4">{author.name} asks</CardTitle>
                              <label>Would you rather</label>
                              <FormGroup check className="form-check-radio">
                                  <Label check>
                                      <Input
                                      defaultChecked
                                      defaultValue="optionOne"
                                      id="optionOne"
                                      name="radioGroup"
                                      type="radio"
                                      onClick={()=>this.onRadioBtnClick('optionOne')}
                                      />
                                      <span className="form-check-sign" />
                                      {question.optionOne.text}
                                  </Label>
                              </FormGroup>
                              <FormGroup check className="form-check-radio">
                                  <Label check>
                                      <Input
                                      defaultValue="optionTwo"
                                      id="optionTwo"
                                      name="radioGroup"
                                      type="radio"
                                      onClick={()=>this.onRadioBtnClick('optionTwo')}
                                      />
                                      <span className="form-check-sign" />
                                      {question.optionTwo.text}
                                  </Label>
                              </FormGroup>
                        </CardBody>
                        <CardFooter>
                          <FormGroup check>
                              <Button className="btn-round" color="primary" size="lg" type="submit">
                                Submit
                              </Button>
                          </FormGroup>
                        </CardFooter>
                      </Card>
                    </Form>
                  </Col>
                </Container>
              </div>
            </>
          );
    }

}

function mapStateToProps({ questions, users }, ownProps) {
    const { id } = ownProps.match.params 
    const question = questions[id]
    const author = question && question.author ? users[question.author]:null
    return {
        question,
        author
    }
}

export default withRouter(connect(mapStateToProps)(Vote))