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

    // //Padronizando a entrada de dados para UpperCase
    const upperCaseMuscleName = muscle_name.toUpperCase();
    const upperCaseExerciseName = exercise_name.toUpperCase();
    const upperCaseDifficulty = difficulty.toUpperCase();
    const upperCaseComments = comments.toUpperCase();

    //Verificando se o novo exercício já está criado
    const existingExercise = await Exercise.findOne({
      muscle_name: upperCaseMuscleName,
      exercise_name: upperCaseExerciseName,
      difficulty: upperCaseDifficulty,
      comments: upperCaseComments,
    });

    //Se caso o exercício já existir, emite erro.
    if (existingExercise) {
      return res.status(400).json({
        error: "Erro ao criar exercício",
        message: "Exercício já existente no Banco de Dados",
      });
    }

    const newExercise = new Exercise({
      muscle_name: upperCaseMuscleName,
      exercise_name: upperCaseExerciseName,
      series,
      difficulty: upperCaseDifficulty,
      comments: upperCaseComments,
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
