# Pwitter

Our CS 484 final project.

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

## Testing

We will verify that components of server-side logic behave as expected. For example, when registering a user, the
provided request parameters must pass a certain criteria.

In order to test this exhaustively, we've setup various scenarios in which this validation should succeed and fail. This
should cover almost every combination of valid / invalid parameters to verify that the behavior is as expected.

Additionally, we will write tests to verify that critical workflows such as registration and login are functioning as
expected.

