"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainSeeder = void 0;
const typeorm_extension_1 = require("typeorm-extension");
const CategorySeeder_1 = require("./CategorySeeder");
class MainSeeder {
    async run(dataSource, factoryManager) {
        await (0, typeorm_extension_1.runSeeder)(dataSource, CategorySeeder_1.CategorySeeder);
    }
}
exports.MainSeeder = MainSeeder;
