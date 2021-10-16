# Pwitter

Our CS 484 final project.

## Table of Contents

- **[Build and Run](#build-and-run)**<br>
    - [1. Run the Server](#1-run-the-server)
    - [2. Run the Client](#2-run-the-client)
    - [3. Use the application](#3-use-the-application)
- **[Testing](#testing)**<br>
    - [Unit Testing](#unit-testing)
    - [End-to-End Testing](#end-to-end-testing)
- **[Team Members](#team-members)**<br>
- **[Development Tools](#development-tools)**<br>

## Build and Run

### 1. Run the Server

From the `~/server` directory, run:

```
$ npm install
$ npm start
```

### 2. Run the Client

Client depends on server, be sure to set that up first!

From the `~/client` directory, run:

```
$ npm install
$ npm start
```

### 3. Use the application

Once the client & server are running, you can navigate to [http://localhost:3000/](http://localhost:3000/) to use the
application.

## Testing

### Unit-Testing

We will test component functionality through unit tests. For example, we test that registration validation properly
accepts and filters different parameters. To do so, we test common use cases, common errors, and edge-cases.

### End-to-End testing

For our end-to-end tests, we verify common user workflows such as registration and sign-up.

We verify that users are able to register and sign-up without issue, and we also verify that invalid workflows do not
succeed. For example:

1. You shouldn't be able to register the same user twice
2. You shouldn't be able to log into an existing account with invalid credentials
3. You shouldn't be able to log into an account that doesn't exist

### Running the tests

To run the tests, navigate to `~/server` and execute

```
$ npm test
```

## Team Members

### Farooq Syed

- [srizwa3@uic.edu](srizwa3@uic.edu)
- [https://github.com/Faro0q](https://github.com/Faro0q)

### Will Cygan

- [wcygan2@uic.edu](wcygan2@uic.edu)
- [https://github.com/wcygan](https://github.com/wcygan)

### Stas Kobylarz

- [skobyl2@uic.edu](skobyl2@uic.edu)
- [https://github.com/Stasioo](https://github.com/Stasioo)

## Development Tools

1. [WebStorm](https://www.jetbrains.com/webstorm/) to develop the project
2. [Visual Studio Code](https://code.visualstudio.com/) to develop the project
3. [Postman](https://www.postman.com/) to test the project
4. [Chrome](https://www.google.com/chrome/) to test the project
5. [GitHub](https://github.com/) to host the project