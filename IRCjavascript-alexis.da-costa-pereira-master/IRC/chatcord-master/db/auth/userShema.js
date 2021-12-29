const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    pseudo: {
        type: String
    },
    avatarUrl: {
        type: String
    },
    password: {
        type: String
    },
    tag: {
        type: Number
    },
    connected: {
        type: Boolean
    }
}, {
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    }]
}, {
    timestamps: true
});

let User = mongoose.model("user", userSchema);
module.exports = User;