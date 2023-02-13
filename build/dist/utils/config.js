"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASSWORD_SALT = exports.SECRET = exports.CLIENT_URL = exports.GOOGLE_CLIENT_SECRET = exports.GOOGLE_CLIENT_ID = exports.MONGODB_URI = exports.PORT = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var PORT = process.env.PORT || 5000;
exports.PORT = PORT;
var MONGODB_URI = process.env.MONGODB_URI;
exports.MONGODB_URI = MONGODB_URI;
var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
exports.GOOGLE_CLIENT_ID = GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
exports.GOOGLE_CLIENT_SECRET = GOOGLE_CLIENT_SECRET;
var CLIENT_URL = process.env.CLIENT_URL;
exports.CLIENT_URL = CLIENT_URL;
var SECRET = process.env.SECRETSECRET_KEY;
exports.SECRET = SECRET;
var PASSWORD_SALT = Number(process.env.PASSWORD_SALT);
exports.PASSWORD_SALT = PASSWORD_SALT;
//# sourceMappingURL=config.js.map