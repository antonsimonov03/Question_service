const should = require("should");
const _ = require("lodash");
const axios = require("axios");
const uuidv4 = require("uuid/v4");

const { ANSWER_URL } = require("./utils");

let launchServer = require("../server");
let db = null;

describe("Answers", () => {
  before(done => {
    launchServer.then(() => {
      db = require("../server/initializeDb");
      done();
    });
  });

  after(async () => {
    await db.Answer.destroy({ where: {} });
    await db.Question.destroy({ where: {} });
  });

  beforeEach(async () => {
    await db.Answer.destroy({ where: {} });
    await db.Question.destroy({ where: {} });
  });

  getTestAnswer = question_id => {
    return {
      author: "test",
      text: "test-answer-text",
      question_id
    };
  };

  it("Should post new answer", async () => {
    let id = uuidv4();
    let question = await db.Question.create({
      author: "test",
      text: "test",
      id
    });

    let answer = getTestAnswer(question.id);

    await axios.post(ANSWER_URL, answer);

    let foundAnswer = await db.Answer.find({ where: answer });

    should.ok(foundAnswer);
  });

  it("Should return 400 if post answer with invalid question id", async () => {
    let answer = getTestAnswer("invalid id");
    let isError = {};

    try {
      await axios.post(ANSWER_URL, answer);
    } catch (error) {
      isError = error;
    }

    should.equal(isError.response.status, 400);
  });

  it("Should return 400 when post in case of some fields is missed", async () => {
    let id = uuidv4();
    let question = await db.Question.create({
      author: "test",
      text: "test",
      id
    });

    try {
      await axios.post(ANSWER_URL, {
        text: null,
        author: null,
        question_id: id
      });
    } catch (error) {
      isError = error;
    }

    should.equal(isError.response.status, 400);
  });
});
