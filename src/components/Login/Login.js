import React from 'react';
import { Row, Col, Card, CardBody, Container } from 'reactstrap';
import { SignupLoginTab } from '../SignupLoginTab/SignupLoginTab';


const Login = () => {

    return (
        <Container className="login-container pl-35x pr-35x">
          <Row>
            <Col md={{ size: 6, offset: 3 }}>
              <Card className="shadow mt-20x">
                <CardBody className="login-card-body pb-10x pl-20x pr-20x pt-20x">
                  <div className="text-center">
                    <SignupLoginTab activeTab="login" />
                  </div>
                  {/* {
                    match.params.action == 'register-success' && <div className="text-center mt-5x mb-8x">
                      <div className="fs-12 lh-16 text-success">You have registered successfully!</div>
                      <div className="fs-14 lh-19 text-primary">Please, login now!</div>
                    </div>
                  } */}
                  
                  {/* <div className="login-signup-card-links">
                    <p className="text-center font-regular fs-12">
                      <a href={FORGOT_PASSWORD_URL}>Forgot Password?</a>
                    </p>
  
                  </div> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
  
        </Container>
      )
}

export default Login;