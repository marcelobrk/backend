const express = require('express');
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on("connection", socket => {
    socket.on('connectedRoom', box => {
        socket.join(box);
    })

});



mongoose.connect("mongodb+srv://marcelo:marcelo@cluster0-yfh4q.mongodb.net/marcelo?retryWrites=true",
    {
        useNewUrlParser: true
    }
);

app.use((req, res, next) => {
    req.io = io;
    return next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Permite Enviar Arquivos nas requisições
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require("./routes")); // Usar arquivo de Rotas Separados "./" pasta atual

server.listen(process.env.PORT || 7777);