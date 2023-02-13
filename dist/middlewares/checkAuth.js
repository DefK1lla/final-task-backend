"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkAuth(req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
exports.default = checkAuth;
//# sourceMappingURL=checkAuth.js.map