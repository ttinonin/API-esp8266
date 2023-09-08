const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Digital, Board } = require('johnny-five');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const board = new Board();

let led;

board.on('ready', () => {
    led = new Digital({ pin: 4 });
    led.off();
    console.log('Placa pronta');
});

app.get('/ligar-led', (req, res) => {
    if(led) {
        led.on();
        res.send('LED ligado');
    } else {
        res.status(500).send('Erro');
    }
})

app.post('/desligar-led', (req, res) => {
    if (led) {
      led.off(); // Desligue o LED
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