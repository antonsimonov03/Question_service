const { Router } = require("express");

let { Question, Answer } = require("../../initializeDb");

let router = Router();

router.post("/", async (req, res) => {
  try {
    let { author, text, question_id } = req.body;

    if (!question_id || !author || !text) {
      res.status(400).send({
        status: false,
        error: "Bad request"
      });

      return;
    }

    let answer = { question_id, text, author };

    let question = await Question.find({ where: { id: question_id } });

    if (!question) {
      res.status(400).send({
        status: false,
        error: "Invalid question id"
      });

      return;
    }

    await Answer.create(answer);

    res.status(200).send({
      status: true,
      answer
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      error
    });
  }
});

module.exports = router;
