'use strict';

let Product = require('../../models/Product');
const router = require('express').Router(),
      path = require('path'),
      basicAuth = require('../../lib/basicAuth');

router.get('/', basicAuth, get);
/**
 * GET /
 * @param req
 * @param res
 * @param next
 */

export async function get(req, res, next) {
    try {
        const name = req.query.name,
              sale_price = req.query.sale_price,
              price = req.query.price,
              tags = req.query.tags,
              fields = req.query.fields,
              limit = parseInt(req.query.limit),
              skip = parseInt(req.query.skip),
              sort = req.query.sort,
              filter = {};

        if (name) {
            filter['name'] = new RegExp('^' + name, 'i');
        }

        if (sale_price === 'True') {
            filter['sale_price'] = true;
        }

        if (sale_price === 'False') {
            filter['sale_price'] = false;
        }

        if (price) {
            let priceRange = price.toString().split('-');
            var query_price = {};
            priceRange[0] = isNaN(parseInt(priceRange[0])) ? '' : priceRange[0];
            priceRange[1] = isNaN(parseInt(priceRange[1])) ? '' : priceRange[1];

            if ((priceRange[0] !== '') && (priceRange[1] !== '')) {

                filter['price'] = { $gte: priceRange[0], $lte: priceRange[1] };
            }
            if (((price[0] === '-') && (priceRange.length === 2)) && (priceRange[1] !== '')) {
                filter['price'] = {$lte: priceRange[1]};
            }

            if (priceRange[0] === priceRange[1]) {
                filter['price'] = { $gte: priceRange[0] };
            }
        }

        if (tags) {
            let productsTags = tags.toString().split('-');
            filter['tags'] = { $in: productsTags };
        }
        let rows = await Product.list(filter, skip, limit, sort, fields);
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].photo) {
                rows[i].photo = path.join('/images/', rows[i].photo);
            }
        }
        res.json({success: true, rows});
    } catch (err) {
        next(err);
    }
}

export {router};
