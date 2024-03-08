const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const controller = require("../controllers/exercise.controller");

router.post(
  "/create-exercise",
  body("muscle_name")
    .notEmpty()
    .withMessage("O campo 'muscle_name' não pode ser vazio."),
  body("exercise_name")
    .notEmpty()
    .withMessage("O campo 'exercise_name' não pode ser vazio."),
  body("series")
    .notEmpty()
    .withMessage("O campo 'series' não pode ser vazio.")
    .custom((value) => {
      if (isNaN(value)) {
        throw new Error("O campo 'series' só aceita números.");
      }
      return true;
    }),
  body("difficulty")
    .notEmpty()
    .withMessage("O campo 'difficulty' não pode ser vazio!"),
  body("comments")
    .isLength({ max: 1000 })
    .withMessage("O campo 'comments' aceita até 1000 caracteres!"),
  body("image_url")
    .notEmpty()
    .withMessage("O campo 'image_url' não pode ser vazio!"),
  (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }
    next();
  },
  controller.createExercise
);

router.get("/exercises", controller.readExercise);

router.put(
  "/update-exercise",
  body("muscle_name")
    .notEmpty()
    .withMessage("O campo 'muscle_name' não pode ser vazio."),
  body("exercise_name")
    .notEmpty()
    .withMessage("O campo 'exercise_name' não pode ser vazio."),
  body("series")
    .notEmpty()
    .withMessage("O campo 'series' não pode ser vazio.")
    .custom((value) => {
      if (isNaN(value)) {
        throw new Error("O campo 'series' só aceita números.");
      }
      return true;
    }),
  body("difficulty")
    .notEmpty()
    .withMessage("O campo 'difficulty' não pode ser vazio!"),
  body("comments")
    .isLength({ max: 1000 })
    .withMessage("O campo 'comments' aceita até 1000 caracteres!"),
  body("image_url")
    .notEmpty()
    .withMessage("O campo 'image_url' não pode ser vazio!"),
  (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }
    next();
  },
  controller.updateExercise
);

router.delete("/delete-exercise/:id", controller.deleteExercise);

module.exports = router;
