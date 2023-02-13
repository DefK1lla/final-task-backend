"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = require("../utils/config");
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect("".concat(config_1.MONGODB_URI), function () {
    return console.log('connected to mongodb');
});
exports.default = mongoose_1.default;
//# sourceMappingURL=mongoose.js.map