let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");

let apiRoutes = require("./routes");

let db = require("./initializeDb");

const PORT = process.env.NODE_ENV === "test" ? 3002 : 3001;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", apiRoutes);

module.exports = db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
  });
});
