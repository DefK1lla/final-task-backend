"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = __importDefault(require("../libs/passport"));
var authController_1 = __importDefault(require("../controllers/authController"));
var checkAuth_1 = __importDefault(require("../middlewares/checkAuth"));
var router = (0, express_1.Router)();
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', passport_1.default.authenticate('google', {
    session: true,
}), authController_1.default.googleCallback);
router.post('/register', authController_1.default.localRegister);
router.post('/login', passport_1.default.authenticate('local'), authController_1.default.localLogin);
router.get('/logout', authController_1.default.logout);
router.get('/me', checkAuth_1.default, authController_1.default.getMe);
exports.default = router;
//# sourceMappingURL=authRouter.js.map