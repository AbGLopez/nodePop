'use strict';

const router = require('express').Router();
let User = require('../models/User');

router.get('/', async function (req, res, next) {
    let title = 'users';
    try {
        //
        // load mogodb data asynchronously
        /////////////////////////////////////////////
        //let products = await db.Product.find({}); // mongoose find method
        //let products = await db.Product.list();   // list has optional params
        let users = await User.list({}, 0, null, null, '');
        res.render('users', {title, users});
    } catch (err) {
        next(err);
    }
});

export = router;
