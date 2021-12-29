const express = require("express");
const connectdb = require("./dbConnection");
const Chats = require("./schema/chatSchema");
const Channel = require("./schema/channelSchema");


const show = (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    connectdb.then(db => {           
        Chats.find({ channel: req.query.channel, command: false }, function(err, result) {          
            if (err)
                res.send(err);   
            res.json(result);       
        });
    });
}
const chans = (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    const { name } = req.body

    connectdb.then(db => {           
        Channel.find({}, function(err, result) {          
            if (err)
                res.send(err);   
            res.json(result);       
        });
    });
}
const chansCreate = (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    body = req.body;
    var channelVerify = null;
    connectdb.then(db => {
        Channel.findOne({ name: body.name }).lean().then(result => {

            if (!result) {
                console.log("Request create channel: " + body.name + "| Create by: " + body.createBy);
                let channelObject = new Channel({ name: body.name, createBy: body.createBy });
                channelObject.save();

                res.status(200).send('Channel add: ' + body.name);
            } else {
                console.log("Error create channel, " + body.name + " already  exist")
                res.status(403).send('Channel Exist');
            }   
        }); 
    });
}

const chansPut = (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    connectdb.then(db => {           
        Channel.find({}, function(err, result) {          
            if (err)
                res.send(err);   
            res.json(result);       
        });
    });
}
const chansDelete = (req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    connectdb.then(db => {           
        Channel.find({}, function(err, result) {          
            if (err)
                res.send(err);   
            res.json(result);       
        });
    });
}
module.exports = { show, chans, chansCreate, chansPut, chansDelete };