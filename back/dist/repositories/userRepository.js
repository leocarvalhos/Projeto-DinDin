"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
var data_source_1 = require("../data-source");
var User_1 = require("../entities/User");
exports.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
