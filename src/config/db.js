const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
//Função responsável por conectar ao MongoDB
async function connectingMongodb() {
  try {
    await mongoose.connect(`${process.env.MONGODB_CONNECTION_URL}`);
  } catch (error) {
    console.error("Erro ao conectar com o MongoDB", error);
    throw new Error("Erro ao conectar com o MongoDB");
  }
}

module.exports = {
  connectingMongodb,
};
