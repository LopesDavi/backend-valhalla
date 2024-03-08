const { Exercise } = require("../models/exercise.model");

async function createExercise(req, res) {
  try {
    const {
      muscle_name,
      exercise_name,
      series,
      difficulty,
      comments,
      image_url,
    } = req.body;

    const newExercise = new Exercise({
      muscle_name,
      exercise_name,
      series,
      difficulty,
      comments,
      image_url,
    });

    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao criar exercício", details: error.message });
  }
}

async function readExercise(req, res) {
  try {
    const exercises = await Exercise.find();
    res.send(exercises);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao exibir exercícios", details: error.message });
  }
}

async function updateExercise(req, res) {
  try {
    const {
      muscle_name,
      exercise_name,
      series,
      difficulty,
      comments,
      image_url,
    } = req.body;

    const changeExercise = await Exercise.updateOne({
      muscle_name,
      exercise_name,
      series,
      difficulty,
      comments,
      image_url,
    });

    res.send(changeExercise);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar exercício", details: error.message });
  }
}

async function deleteExercise(req, res) {
  try {
    const deleteExercise = await Exercise({
      _id: req.params.id,
    });
    await deleteExercise.deleteOne();
    res.send(deleteExercise);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao deletar exercício",
      details: error.message,
    });
  }
}

module.exports = {
  createExercise,
  readExercise,
  updateExercise,
  deleteExercise,
};
