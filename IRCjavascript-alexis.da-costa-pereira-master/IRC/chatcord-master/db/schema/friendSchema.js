const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const friendSchema = new Schema({
    userId: {
        type: String
    },
    friends: {
        type: Array
    }
}, {
    timestamps: true
});

let Friend = mongoose.model("friend", friendSchema);
module.exports = Friend;