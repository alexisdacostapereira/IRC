const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const channelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createBy: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

let Channel = mongoose.model("channel", channelSchema);
module.exports = Channel;