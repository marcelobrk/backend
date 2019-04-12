const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const BoxController = require("./controllers/BoxController");
const FileController = require("./controllers/FileController");

// GET/POST/PUT/DELETE


// req (Envia as requisições, formularios, campos e etc).
// res (A resposta que retorna pro cliente).
routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);
routes.post(
    "/boxes/:id/files",
    multer(multerConfig).single('file'),
    FileController.store
);

module.exports = routes; // exporta informações do arquivo (variavel routes).