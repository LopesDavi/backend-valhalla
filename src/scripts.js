const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const exercises = require("./routes/exercise.route");
const { connectingMongodb } = require("./config/db");

//Criando instância do Express
const app = express();

//Chamando função de conexão com o MongoDB
connectingMongodb();

//Config. de ambiente
dotenv.config();

//Middleware para fazer o parse do corpo da requisição (JSON)
app.use(express.json());

//Aceitar origem cruzada de qualquer lugar
app.use(cors({ origin: true }));

//Rota principal da API (http://localhost:3000/api-valhalla)
app.use("/api-valhalla", exercises);

//Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}/api-valhalla/ `);
});
