const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

module.exports = function () {
    let server = express(), create, start;

    create = (config, db) => {
        let routes = require('./routes');
        server.set('env', config);
        server.set('port', config.PORT);

        //Middlewares
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({ extended: false }));

        let database = db.database;

        if(config.MONGO_HOSTNAME && config.MONGO_DB)
            database = 'mongodb://'+config.MONGO_HOSTNAME+'/'+ config.MONGO_DB +'';

        //connect the database
        mongoose.connect( database , {  useNewUrlParser: true, useCreateIndex: true });

        // Set up routes
        routes.init(server);
    };

    
    start = () => {
        let port = server.get('port');
        
        server.listen(port, function () {
            console.log('Express server listening on - http://localhost:' + port);
        });
    };

    return {
        create: create,
        start: start
    };
};