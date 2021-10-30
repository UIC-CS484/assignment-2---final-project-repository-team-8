const app = require("../server").app;
const { messages, errors, query, routes } = require("../common");
const supertest = require("supertest");
const StatusCodes = require("http-status-codes").StatusCodes;
const db = require("../database.js").db;

beforeAll(() => {
	db.run(query.CREATE_USER_TABLE);
});

afterAll(done => {
	db.run("DROP TABLE user");
	db.close();
	done();
});

describe("Testing Registration and Login", () => {
	test("Register succeeds, Login succeeds", async () => {
		const [name, email, password] = ["Farooq", "test@farooq.com", "Farooq123!"];
		const register = await supertest(app)
			.post(routes.REGISTER)
			.send({
				email: email,
				password: password,
				name: name
			});

		expect(register.statusCode).toEqual(StatusCodes.OK);
		expect(register.body.message).toEqual(messages.REGISTRATION_SUCCEEDED);

		const login = await supertest(app)
			.post(routes.LOGIN)
			.send({
				email: email,
				password: password
			});

		expect(login.body.message).toEqual(messages.LOGIN_SUCCEEDED);
		expect(login.statusCode).toEqual(StatusCodes.OK);
	});

	test("Register succeeds, Login fails with invalid credentials", async () => {
		const [name, email, password] = ["Will", "test@will.com", "Will123!"];
		const register = await supertest(app)
			.post(routes.REGISTER)
			.send({
				email: email,
				password: password,
				name: name
			});

		expect(register.statusCode).toEqual(StatusCodes.OK);
		expect(register.body.message).toEqual(messages.REGISTRATION_SUCCEEDED);

		const login = await supertest(app)
			.post(routes.LOGIN)
			.send({
				email: email,
				password: "InvalidPassword!"
			});

		expect(login.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
		expect(login.body.error).toEqual(messages.INCORRECT_PASSWORD);
	});

	test("Login fails for nonexistent user", async () => {
		const login = await supertest(app)
			.post(routes.LOGIN)
			.send({
				email: "Idontexist@foo.com",
				password: "InvalidPassword!"
			});

		expect(login.statusCode).toEqual(StatusCodes.NOT_FOUND);
		expect(login.body.error).toEqual(messages.USER_NOT_FOUND);
	});

	test("Registering the same user twice should fail", async () => {
		const [name, email, password] = ["Stas", "test@stas.com", "Stas123!"];
		const register = await supertest(app)
			.post(routes.REGISTER)
			.send({
				email: email,
				password: password,
				name: name
			});

		expect(register.statusCode).toEqual(StatusCodes.OK);
		expect(register.body.message).toEqual(messages.REGISTRATION_SUCCEEDED);

		const registerTwice = await supertest(app)
			.post(routes.REGISTER)
			.send({
				email: email,
				password: password,
				name: name
			});

		expect(registerTwice.statusCode).toEqual(StatusCodes.CONFLICT);
		expect(registerTwice.body.error).toEqual(messages.EMAIL_ALREADY_EXISTS);
	});
});
