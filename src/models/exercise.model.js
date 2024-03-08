const mongoose = require("mongoose");

//Definição de 'Schema' nos padrões do MongoDB
const Exercise = mongoose.model("Exercise", {
  muscle_name: String,
  exercise_name: String,
  series: Number,
  difficulty: String,
  comments: String,
  image_url: String,
});

module.exports = {
  Exercise,
};
