'use strict';
module.exports = function(app) {
    const db = require('./queriesApi')

    app.route('/show')
        .get(db.show)
    app.route('/channel')
        .get(db.chans)
    app.route('/channelCreate')
        .post(db.chansCreate)
    app.route('/channelUpdate')
        .put(db.chansPut)
    app.route('/channelDelete')
        .put(db.chansDelete)

    /*
        app.route('/users')
            .get(db.usersAll)

        app.route('/user')
            .get(db.userFindOne)

        app.route('/userRemove')
            .remove(db.userRemove)

        app.route('/userCreate')
            .post(db.userCreate)

        app.route('/userCreate')
            .put(db.userUpdate)*/
}