'use strict';

/**
 * User model
 * @module User
 */

let mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: {
        type: Number,
        index: true,
        unique: true
    },
    user_name: {
        type: String,
        index: true,
        unique: true
    },
    email: {
        type: String,
        index: true,
        unique: true
    },
    password: String,
    location: {
        type: { type: String },
        coordinates: [Number]
    }
});

var User = mongoose.model('User', userSchema);

export = User;
