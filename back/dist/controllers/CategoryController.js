"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const categoryRepository_1 = require("../repositories/categoryRepository");
class CategoryController {
    async categories(req, res) {
        try {
            const categories = await categoryRepository_1.categoryRepository.find();
            return res.status(200).json(categories);
        }
        catch (e) {
            return res.status(500).json(e);
        }
    }
}
exports.CategoryController = CategoryController;
