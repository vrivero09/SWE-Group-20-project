import React from 'react';
import {
    Form, FormGroup, Label, Input, FormText, InputGroup
} from 'reactstrap';

export const LoginForm = (props) => {
    return(
        <Form>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="name@example.com" />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="Enter password" />
            </FormGroup>
        </Form>
    );
};

export default LoginForm;