import React, { useContext, useEffect } from 'react';
import { Row, Col, Card, CardBody, Container, Button } from 'reactstrap';
import {Form, Field} from 'react-final-form';
import { renderFormInput } from '../../utils/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import "./Login.scss"
import { GlobalContext } from '../App';


const Login = () => {

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        console.log(token)
        if (token) {
            window.location.href="/experiment-tracking/dashboard"
        }
    }, []);

    const {actions, reduxState} = useContext(GlobalContext);

    const onSubmit = (values) => {
        actions.loginUser(values, () => {
            window.location.href="/experiment-tracking/dashboard"
        });
    }

    return (
        <Container className="login-container pl-35x pr-35x">
          <Row>
            <Col md={{ size: 6, offset: 3 }}>
              <Card className="shadow mt-20x">
                <CardBody className="login-card-body pb-30x pl-20x pr-20x pt-30x">
                  <h3 className='mb-4 text-center'>Login</h3>
                  <Form onSubmit={onSubmit}>
                    {({handleSubmit, submitting, invalid}) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="username"
                            type="text"
                            label="Username"
                            component={renderFormInput}
                        />
                        <Field
                            name="password"
                            type="password"
                            label="Password"
                            component={renderFormInput}
                        />
                        <Button
                            color="primary modal-footer-button"
                            className="fs-16 lh-21 wt-100p mt-15x"
                            disabled={submitting || invalid}
                            block
                        >
                            {
                                submitting &&
                                <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
                            }
                            {
                                submitting ? 'Logging in': 'Login'
                            }
                        </Button>
                    </form>
                )}
            </Form>
            <p className='pt-2' style={{ fontSize: '14px', color: '#555' }}>
              Don’t have an account? <b onClick={() => window.location.href = '/experiment-tracking/signup'} style={{ color: '#007bff', cursor: 'pointer' }}>Sign Up</b>
            </p>
                </CardBody>
              </Card>
            </Col>
          </Row>
  
        </Container>
      )
}

export default Login;