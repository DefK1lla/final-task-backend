"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_session_1 = __importDefault(require("express-session"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var config_1 = require("./utils/config");
var passport_1 = __importDefault(require("./libs/passport"));
var routes_1 = __importDefault(require("./routes"));
var errorHandler_1 = __importDefault(require("./utils/errorHandler"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: config_1.CLIENT_URL, credentials: true }));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: "".concat(config_1.SECRET),
    resave: true,
    saveUninitialized: true,
    store: connect_mongo_1.default.create({ mongoUrl: config_1.MONGODB_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
}));
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(routes_1.default);
app.use(errorHandler_1.default);
app.listen(config_1.PORT, function () {
    console.log("Listening on port ".concat(config_1.PORT, "!"));
});
//# sourceMappingURL=index.js.map