import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../css/login.css"
import history from '../history';

export default function register() {

    const loginBtn = () => {
        history.push("./login")
        window.location.reload()
    }

    return (
        <div className="register">
            <Button onClick={loginBtn}>
                Login
            </Button>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                
                <Button block size="lg" type="submit">
                    Register
                </Button>
            </Form>
        </div>
      );
}