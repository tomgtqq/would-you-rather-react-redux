import React from 'react'
import { Link } from 'react-router-dom'

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
} from "reactstrap";

const NoMatch404 = () =>
            <>
            <Card className="card-user">
                <CardBody>
                    <h1 className="title">404</h1>
                    <h3 className="description"> Sorry! The Page Not Found</h3>
                </CardBody>
                <CardFooter>
                    <div className="button-container">
                        <Link to={`/`}>
                            <Button className="btn-round" color="primary" >
                                Return to Home Page
                            </Button>
                        </Link>
                    </div>
                </CardFooter>
              </Card>
            </>

export default NoMatch404