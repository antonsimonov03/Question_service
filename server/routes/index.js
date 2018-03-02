let { Router } = require("express");

let questionRoutes = require("./question");
let answerRoutes = require("./answer");

let router = Router();

router.use("/questions", questionRoutes);
router.use("/answers", answerRoutes);

module.exports = router;
