import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../css/login.css"
import history from '../history';


export default function login() {

    const registerBtn = () => {
        history.push("./register")
        window.location.reload()
    }

    return (
        <div className="login">
            <Button onClick={registerBtn}>
                Register
            </Button>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                
                <Button block size="lg" type="login">
                    Login
                </Button>
                
            </Form>
        </div>
      );
}