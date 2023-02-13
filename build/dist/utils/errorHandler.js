"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (err, req, res, next) {
    console.error('Error:', err.stack);
    res.status(500);
    res.json({ message: 'Server Error' });
});
//# sourceMappingURL=errorHandler.js.map