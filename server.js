require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const services = require('./services')(express);
const controllers = require('./controllers');

const routes = require('./routes')( services, controllers );

const app = express();

app.use(bodyParser.json());
app.use('/', routes)

const port = process.env.PORT || 3000;
const urlMongo = process.env.URL_MONGO || '';
const loadData = require('./load-data');

mongoose.connect(urlMongo,{ useNewUrlParser: true, useUnifiedTopology: true } , (err) => {
    if(err){
        console.log(err);
    }else{
        console.log('Base de datos conectada');    
        app.listen(port, async () => {
            console.log(`Escuchando el el puerto ${port}`);
            
        });
    }
});





