const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const invitSchema = new Schema({
    userId: {
        type: String
    },
    userProposedId: {
        type: String
    }
}, {
    timestamps: true
});

let Invit = mongoose.model("invit", invitSchema);
module.exports = Invit;