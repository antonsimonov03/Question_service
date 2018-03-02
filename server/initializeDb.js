let fs = require("fs");
let path = require("path");
let _ = require("lodash");
let Sequelize = require("sequelize");

let sequelize = null;

const MYSQL_CONFIG = {
  host: "sql11.freemysqlhosting.net",
  dialect: "mysql",
  logging: false
};

if (process.env.NODE_ENV === "test") {
  sequelize = new Sequelize(
    "sql11223736",
    "sql11223736",
    "snub2AC6fy",
    MYSQL_CONFIG
  );
} else if (process.env.NODE_ENV === "development") {
  sequelize = new Sequelize(
    "sql11223566",
    "sql11223566",
    "dd4ulNq4LA",
    MYSQL_CONFIG
  );
}

let db = {};

fs
  .readdirSync(__dirname + "/models")
  .filter(file => {
    return file.indexOf(".") !== 0 && file !== "index.js";
  })
  .forEach(file => {
    let model = sequelize.import(path.join(__dirname + "/models", file));
    db[model.name] = model;
  });

_.forEach(_.keys(db), modelName => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
