'use strict';

const path = require('path'),
    _ = require('lodash'),

    all = {
        env: process.env.NODE_ENV || 'development',
        server: process.env.SERVER_TYPE,
        root: path.normalize(__dirname + '../../'),
        port: process.env.PORT || 9080,
        ip: process.env.IP || '0.0.0.0',
        momentOffset: '+0530',
        momentOffsetUTC: '+0000',
        mongo: {
            options: {
                db: {
                    safe: true
                }
            }
        }
    },
    environement = process.env.NODE_ENV || 'development';

module.exports = _.merge(
    all,
    require('./' + environement + '.js') || {});
