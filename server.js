require('dotenv').config(); 

const express = require('express');
const { EtherPortClient } = require("etherport-client");
const bodyParser = require('body-parser');
const cors = require('cors');
const { Board, Pin } = require('johnny-five');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const board = new Board({
    port: new EtherPortClient({
        host: process.env.IP,
        port: 3030,
    }),
    repl: false
});

let led;

board.on('ready', () => {
    board.pinMode(4, Pin.OUTPUT)
    led = new Pin(4);
    led.low();
    console.log('Placa pronta');
});

app.get('/ligar-led', (req, res) => {
    if(led) {
        led.high();
        res.send('LED ligado');
    } else {
        res.status(500).send('Erro');
    }
})

app.get('/desligar-led', (req, res) => {
    if (led) {
      led.low(); // Desligue o LED
      res.send('LED desligado.');
    } else {
      res.status(500).send('O NodeMCU ESP8266 não está pronto.');
    }
});

app.get('/', (req, res) => {
    res.send('API works');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
