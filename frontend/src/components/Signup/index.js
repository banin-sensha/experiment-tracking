import React from 'react';
import { Row, Col, Card, CardBody, Container, Button } from 'reactstrap';
import { SignupLoginTab } from '../SignupLoginTab/SignupLoginTab';
import {Form, Field} from 'react-final-form';
import { renderFormInput } from '../../utils/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { showSuccess, showSuccessAndRedirect } from '../../utils/toast_helper';
import { useHistory } from 'react-router-dom';


const Signup = () => {
    const history = useHistory();

    const onSubmit = (values) => {
        console.log('values: ', values);
        if (!_.isEmpty(values)) {
            showSuccessAndRedirect("Signed Up Successfully", () => {
                history.push("/login");
            });
        }

    }

    return (
        <Container className="login-container pl-35x pr-35x">
          <Row>
            <Col md={{ size: 6, offset: 3 }}>
              <Card className="shadow mt-20x">
                <CardBody className="login-card-body pb-10x pl-20x pr-20x pt-20x">
                  <div className="text-center">
                    <SignupLoginTab activeTab="signup" />
                  </div>
                  <Form onSubmit={onSubmit}>
                    {({handleSubmit, submitting, invalid}) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            name="email"
                            type="text"
                            label="Email"
                            component={renderFormInput}
                        />
                        <Field
                            name="passowrd"
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
                                submitting ? 'Logging in': 'Sign up'
                            }
                        </Button>
                    </form>
                )}
            </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
  
        </Container>
      )
}

export default Signup;