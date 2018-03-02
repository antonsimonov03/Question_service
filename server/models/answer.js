module.exports = function(sequelize, DataTypes) {
  const Answer = sequelize.define("Answer", {
    question_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Answer.associate = models => {
    Answer.belongsTo(models.Question, {
      foreignKey: "question_id"
    });
  };

  return Answer;
};
