'use strict';

const sha256 = require('sha256'),
      basicAuth = require('basic-auth');
let User = require('../models/User');

function queryUsers(myfunction) {
    User.find().exec((err, list) => {
        if (err) {
            return err(err);
        }
        myfunction(null, list);
    });
};

module.exports = (req, res, next) => {

    const user = basicAuth(req);

    // login Zone
    /////////////////////////////////////////////

    queryUsers((err, usersDB) => {
        if (err) {
            return err(err);
        }
        if (!user) {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            res.send(401);
            return;
        }
        //
        // Check user password in DB
        /////////////////////////////////////////////
        let checkInDataBase = false;
        for (let i = 0; i < usersDB.length; i++) {
            if ((user.name === usersDB[i].user_name) && (sha256.x2(user.pass) === usersDB[i].password)) {
                checkInDataBase = true;
                break;
            }
        }

        if (checkInDataBase === false) {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            res.send(401);
            return;
        }
        next();
    });
};
