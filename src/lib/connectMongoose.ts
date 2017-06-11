'use strict';

let mongoose = require('mongoose'),
    conn = mongoose.connection;

mongoose.Promise = global.Promise;

conn.on('error', function(err) {
    console.error('mongodb connection error:', err);
    process.exit(1);
});

conn.once('open', function() {
    console.info('Connected to Mongodb.');
});

console.log(`Connecting to database ander ...`);

mongoose.connect('mongodb://node:node@localhost/ander');

export { conn };
