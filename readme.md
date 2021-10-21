# Pwitter

Our CS 484 final project.

## Table of Contents

- **[Build and Run](#build-and-run)**<br>
- **[Testing](#testing)**<br>
    - [Unit Testing](#unit-testing)
    - [End-to-End Testing](#end-to-end-testing)
    - [Running the tests](#running-the-tests)
- **[Team Members](#team-members)**<br>
- **[Development Tools](#development-tools)**<br>

## Build and Run

### Server

From `/server` directory, run:

```
$ npm install
$ npm start
```

### Client

Client depends on server, be sure to set that up first!

From `/client` directory, run:

```
$ npm install
$ npm start
```

Once the server is running, you can navigate to [http://localhost:3000/](http://localhost:3000/) to use the application.

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

To run the tests, execute the following from the root directory:

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