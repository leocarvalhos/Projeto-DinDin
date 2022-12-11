"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_1 = require("../entities/User");
var userRepository_1 = require("../repositories/userRepository");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.cadaster = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, email, password, validation, passwordCrypted, data, user, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, userRepository_1.userRepository.findOneBy({ email: email })];
                    case 2:
                        validation = _b.sent();
                        if (validation)
                            return [2 /*return*/, res.status(400).json({ message: "E-mail já cadastrado!" })];
                        return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
                    case 3:
                        passwordCrypted = _b.sent();
                        data = {
                            name: name,
                            email: email,
                            password: passwordCrypted,
                        };
                        return [4 /*yield*/, userRepository_1.userRepository.create(data)];
                    case 4:
                        user = _b.sent();
                        return [4 /*yield*/, userRepository_1.userRepository.save(user)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, res.status(201).json({ user: user })];
                    case 6:
                        e_1 = _b.sent();
                        return [2 /*return*/, res.status(500).json({ message: "Erro interno no servidor" })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, email, password, user, conferencePassword, token, _, userLogin, e_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = req.body, email = _b.email, password = _b.password;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, userRepository_1.userRepository.findOneBy({ email: email })];
                    case 2:
                        user = _c.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(404).json({ message: "Usuário e/ou senha inválido(s)." })];
                        }
                        return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                    case 3:
                        conferencePassword = _c.sent();
                        if (!conferencePassword) {
                            return [2 /*return*/, res.status(404).json({ message: "Usuário e/ou senha inválido(s)." })];
                        }
                        token = jsonwebtoken_1.default.sign({ id: user.id }, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '', {
                            expiresIn: '8h'
                        });
                        _ = user.password, userLogin = __rest(user, ["password"]);
                        return [2 /*return*/, res.status(201).json({
                                user: __assign(__assign({}, userLogin), { token: token })
                            })];
                    case 4:
                        e_2 = _c.sent();
                        return [2 /*return*/, res.status(500).json(e_2)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.user = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, res.status(200).json({ user: req.user })];
                }
                catch (error) {
                }
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.updateUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, email, password, _b, id, currentEmail, user, passwordCrypted, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                        _b = req.user, id = _b.id, currentEmail = _b.email;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 6, , 7]);
                        if (!(email !== currentEmail)) return [3 /*break*/, 3];
                        console.log('entrei');
                        return [4 /*yield*/, userRepository_1.userRepository.findOneBy({ email: email })];
                    case 2:
                        user = _c.sent();
                        if (user) {
                            return [2 /*return*/, res.status(400).json({ message: "O e-mail informado já está sendo utilizado por outro usuário." })];
                        }
                        _c.label = 3;
                    case 3: return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
                    case 4:
                        passwordCrypted = _c.sent();
                        return [4 /*yield*/, userRepository_1.userRepository.createQueryBuilder()
                                .update(User_1.User)
                                .set({ name: name, email: email, password: passwordCrypted })
                                .where("id = :id", { id: id }).execute()];
                    case 5:
                        _c.sent();
                        return [2 /*return*/, res.status(204).json()];
                    case 6:
                        error_1 = _c.sent();
                        return [2 /*return*/, res.status(500).json(error_1)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
