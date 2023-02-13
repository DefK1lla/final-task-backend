"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
var validateRegister = function (username, password) {
    return (username &&
        password &&
        typeof username === 'string' &&
        typeof password === 'string' &&
        username.length > 3 &&
        password.length > 5);
};
exports.validateRegister = validateRegister;
//# sourceMappingURL=validations.js.map