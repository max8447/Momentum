import { iUser } from "./user";

const User = require("../model/user");

export { };

const mongoose = require("mongoose");

export interface iMMCodes {
    created: Date,
    owner: iUser,
    code: String,
    code_lower: String,
    ip: String
    port: Number
}

const MMCodesSchema = new mongoose.Schema(
    {
        created: { type: Date, required: true },
        owner: {type: mongoose.Types.ObjectId, ref: "UserSchema"},
        code: { type: String, required: true },
        code_lower: { type: String, required: true },
        ip: { type: String, required: true },
        port: { type: Number, required: true }
    },
    {
        collection: "mmcodes"
    }
)

const model = mongoose.model('MMCodeSchema', MMCodesSchema);

module.exports = model;