import React from 'react';
import {
    Row, Col, Form, FormGroup, Label, Input, FormText, InputGroup
} from 'reactstrap';

export const SignUpForm = (props) => {
    return(
        <Form>
            <FormGroup>
                <Row>
                    <Col>
                        <Label for="firstName">First Name</Label>
                    </Col>
                    <Col>
                        <Label for="lastName">Last Name</Label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input type="text" name="firstName" id="firstName" placeholder="First Name" />
                    </Col>
                    <Col>
                        <Input type="text" name="lastName" id="lastName" placeholder="Last Name" />
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Label for="nickname">Nickname</Label>
                <Input type="text" name="nickname" id="nickname" placeholder="Enter nickname"/>
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="name@example.com" />
            </FormGroup>
            <FormGroup>
                <Label for="Username">Username</Label>
                <Input type="text" name="Username" id="Username" placeholder="Enter username"/>
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="Enter password" />
            </FormGroup>
            <FormGroup>
                <Label for="confirmPass">Confirm Password</Label>
                <Input type="password" name="password" id="confirmPass" placeholder="Enter password" />
            </FormGroup>
        </Form>
    );
};

export default SignUpForm;