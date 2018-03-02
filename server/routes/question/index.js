const { Router } = require("express");
const _ = require("lodash");
const uuidv4 = require("uuid/v4");

let { Question, Answer } = require("../../initializeDb");

let router = Router();

router.get("/", async (req, res) => {
  try {
    let questions = await Question.findAll({
      order: [["createdAt", "DESC"]]
    });

    res.status(200).send({
      status: true,
      questions
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      error
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;

    let question = await Question.find({
      where: {
        id
      },
      include: [Answer]
    });

    res.status(200).send({
      status: true,
      question
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      error
    });
  }
});

router.post("/", async (req, res) => {
  let { author, text } = req.body;

  if (!author || !text) {
    res.status(400).send({
      status: false,
      error: "Bad request"
    });

    return;
  }

  try {
    let id = uuidv4();
    let question = await Question.create({ author, text, id });

    res.status(200).send({
      status: true,
      question
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      error
    });
  }
});

module.exports = router;
