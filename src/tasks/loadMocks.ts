'use strict';

import * as Product from '../models/Product';
import * as User from '../models/User';
import { conn } from '../lib/connectMongoose';
import { readFile } from '../lib/nodeApi';
import { findConfigFileSync } from '../lib/utils';
const sha256 = require('sha256');

conn.once('open', () => {
    main().then(() => {
        console.log('GOOD ByE');
        conn.disconnect();
    });
});

async function main() {
    try {

        //
        // Delete mogodb data
        /////////////////////////////////////////////
        conn.db.dropDatabase();

        //
        // Load mocks in mogodb
        /////////////////////////////////////////////
        let mockFiles = ['productMocks.json', 'usersMocks.json'];

        for (let fileMock of mockFiles) {
            let mockParse = JSON.parse(await readFile(findConfigFileSync(fileMock), 'utf8')),
                label = fileMock === 'usersMocks.json' ? 'Users' : 'Products';

            console.log(`Read ${mockParse.length} ${label}.`);

            for (let mockData of mockParse) {
                let newMockObj = fileMock === 'usersMocks.json' ? new User(mockData) : new Product(mockData);

                if (fileMock === 'usersMocks.json') {
                    newMockObj.password = sha256.x2(newMockObj.password);
                }

                let mockObj = await newMockObj.save();
                let save_label = fileMock === 'usersMocks.json' ? mockObj.user_name : mockObj.name;
                console.log(`Saved "${save_label}"`);
            }
            console.log('All ${label} loaded!');
        }

    } catch (err) {
        console.error('Error', err);
    }
}
