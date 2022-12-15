"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var MainSeeder_1 = require("./seeds/MainSeeder");
var port = process.env.DB_PORT;
var options = ({
    type: "postgres",
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ["".concat(__dirname, "/**/entities/*.{ts,js}")],
    migrations: ["".concat(__dirname, "/**/migrations/*.{ts,js}")],
    seeds: [MainSeeder_1.MainSeeder],
});
exports.AppDataSource = new typeorm_1.DataSource(options);
