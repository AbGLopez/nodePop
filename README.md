
# NodePop

## Requirements


## HOSTS

Works without domain:
PLEASE input in your host file:

 - 34.226.63.234   midominio.com
 - 34.226.63.234   node_midominio.com

Node files served by nginx:
- url : node_midominio.com
- X-Owner AbGLopez;

## API
The API can be used with the path:
[API V1](/apiv1/products)

### GET http://node_midominio.com/apiv1/products

**Input Query**:

limit: {int} limit to records
name: {string} filter names beginning with the string
price: {bool} whether to include the count of total records without filters
price: {range} filter by price range, examples 10-90, -90, 10-
sale_price: {bool} filter by venta or not
sort: {string} field name to sort by
tag: {string} tag name to filter

The API uses **BASIC_AUTH** :

Username: Juan
Password: juanito

Input query example: http://node_midominio.com/apiv1/products?name=coche&limit=1&price=0-3000&sale_price=true&tag=motor

**Result:**

{
  "success": true,
  "rows": [
    {
      "_id": "593d6b346b8b1b164b7b2626",
      "name": "Coche segundamano",
      "sale_price": true,
      "price": 2000,
      "photo": "/images/car.jpg",
      "__v": 0,
      "tags": [
        "lifestyle",
        "motor"
      ],
      "location": {
        "type": "Point",
        "coordinates": [
          -73.856077,
          40.848447
        ]
      }
    },



**Make sure you have node version >= 4.0**


# install the repo dependencies with npm
npm install

# start the server
npm run dev
```

If you want to use mongoose models, start mongodb, check localConfig.js and:
```bash
# load sample products in database (defaults to 'test')
npm run loadMocks
```


## Develop

### Watch mode

You can start the server in development mode (linter included) with:

```bash
npm run dev
```

Open the browser at:
 * http://localhost:3000

Start MongoDB, run 'npm run loadMocks', and check:
 * http://localhost:3000/products
 * http://localhost:3000/apiv1/products

As you save in your editor, the compiler will rebuild and restart the server.

### Other commands

Run the linter manually:

```bash
npm run lint
```

Clean temp folders:

```bash
npm run clean
```

Run the tests:

```bash
npm test
```

Generate docs, the output will be in /doc folder:

```bash
npm run doc
```

## Production / Integration

To run the project in a server you'll want to run the built code instead src version.

```bash
# deploy the repo to server and run
npm install
npm start
```

## Recommendations

 * When requiring from _node_modules_ you must use require:

```bash
// require from /node_modules
let express = require('express');
```

 * With other module types you can use import (node api, created modules):

```bash
import * as fs from 'fs';
import { findConfigFile } from '../lib/utils';
```


 * To change project name update package.json

```bash
"name": "project_name", <-----
...
"dev": "tsc && DEBUG=project_name2:* ... <-----
```


 * All your reusable functions must return promises for better use with async/await.

```bash
let readFile = function(file, encoding) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, encoding, function(err, data) {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
};
```

## Roadmap (TODO)

 * API authentication with [JWT](https://jwt.io/)
 * Add SSL
 * Add cluster
 * User system (register, login, etc)
 * Add sequelize
 * Add test coverage report
 * Yeoman
 * Basic panel


# License
 [MIT](/LICENSE)
