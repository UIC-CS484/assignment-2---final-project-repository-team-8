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

describe("Testing backend Tweet logic", () => {
	test("Creating a tweet", async () => {

		const [name, email, password] = ["Will", "test@will.com", "Will123!"];
		const register = await supertest(app)
			.post(routes.REGISTER)
			.send({
				email: email,
				password: password,
				name: name
			});

		const login = await supertest(app)
			.post(routes.LOGIN)
			.send({
				email: email,
				password: password
			});


		const tweet = "Creating a tweet and submitting the tweet";
		const createTweet = await supertest(app)
			.post(routes.TWEET)
			.send({
				tweet: tweet
			});

		expect(createTweet.body.message).toEqual(messages.TWEET_SUBMITTED);
		expect(createTweet.statusCode).toEqual(StatusCodes.OK);
	});
	/*
	test("Creating a tweet, submitting, and retrieve ALL the tweets", async () => {

	});
*/
});
