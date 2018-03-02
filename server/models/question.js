module.exports = function(sequelize, DataTypes) {
  const Question = sequelize.define("Question", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
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

  Question.associate = models => {
    Question.hasMany(models.Answer, {
      foreignKey: "question_id"
    });
  };

  return Question;
};
