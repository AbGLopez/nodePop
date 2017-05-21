'use strict';

import { conn } from '../../lib/connectMongoose';
let User = require('../../models/User');
const router = require('express').Router();
const sha256 = require('sha256');

router.post('/', post);
/**
 * POST /
 * @param req
 * @param res
 * @param next
 */

export async function post(req, res, next) {
    try {
        let user = new User(req.body);

        user.password = sha256.x2(user.password);
        user.save((err, userSave) => {
            if (err) {
                // Codigo de llave duplicadad 11000
                return next(err);
            }
            res.json({ success: true, user: req.body.user_name });
        });
    } catch (err) {
        next(err);
    }
}

export {router};
