const should = require("should");
const _ = require("lodash");
const axios = require("axios");
const uuidv4 = require("uuid/v4");

const { QUESTION_URL } = require("./utils");

let launchServer = require("../server");
let db = null;

describe("Questions", () => {
  before(done => {
    launchServer.then(() => {
      db = require("../server/initializeDb");
      done();
    });
  });

  after(done => {
    clearDb(done);
  });

  beforeEach(done => {
    clearDb(done);
  });

  clearDb = done => {
    db.Question.destroy({ where: {} })
      .then(() => done())
      .catch(done);
  };

  getTestQuestion = () => {
    let id = uuidv4();

    return {
      author: "test",
      text: "test-text",
      id
    };
  };

  it("Should get list of questions", async () => {
    let { data: { questions } } = await axios.get(QUESTION_URL);

    should.equal(_.isArray(questions), true);
  });

  it("Should get specific question", async () => {
    let testQuestion = getTestQuestion();
    await db.Question.create(testQuestion);

    let { data: { question } } = await axios.get(
      `${QUESTION_URL}/${testQuestion.id}`
    );

    let { author, text, id } = question;

    should.deepEqual(testQuestion, {
      author,
      text,
      id
    });
  });

  it("Should post new question", async () => {
    let { author, text } = getTestQuestion();

    let { data: { question } } = await axios.post(`${QUESTION_URL}`, {
      author,
      text
    });

    let dbQuestion = await db.Question.find({ where: { id: question.id } });
    let actual = {
      author: dbQuestion.author,
      text: dbQuestion.text,
      id: dbQuestion.id
    };

    should.deepEqual({ author, text, id: question.id }, actual);
  });

  it("Should return 400 when post in case of some fields is missed", async () => {
    let isError = {};

    try {
      await axios.post(`${QUESTION_URL}`, {
        author: null,
        text: null
      });
    } catch (error) {
      isError = error;
    }

    should.equal(isError.response.status, 400);
  });
});
