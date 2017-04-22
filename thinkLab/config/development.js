'use strict';
module.exports = {
    timeZone: 'Asia/Kolkata',
    mongo: {
        uri: 'mongodb://thinkZoneAdmin:TZadmin17#@ds161890.mlab.com:61890/thinkzonedb'
    },
    logs: {
        info: {
            name: 'info-log',
            filename: '/var/log/thinkZone/info-log.log',
            level: 'info'
        },
    }
};