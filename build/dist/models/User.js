"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("../libs/mongoose"));
var userSchema = new mongoose_1.default.Schema({
    username: {
        required: true,
        type: String,
        unique: true,
        index: true,
    },
    password: {
        required: false,
        type: String,
    },
    googleId: {
        required: false,
        type: String,
        unique: true,
        index: true,
    },
});
exports.default = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map