const express = require('express');
const cors = require('cors');
const routerConsume = require('./routes/consume.js')
const routerEvent = require('./routes/event.js')
const routerFreeday = require('./routes/freeday.js')
const routerUser = require('./routes/auth.js');

const corsOptions ={
    // origin:'*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    origin: 'http://localhost:3000'
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static('public'));

app.use('/api', [routerConsume, routerEvent, routerFreeday, routerUser]);

module.exports = app;