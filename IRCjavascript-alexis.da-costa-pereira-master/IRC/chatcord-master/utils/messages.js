const moment = require('moment');
moment.locale('fr')

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm')
    };
}

module.exports = formatMessage;