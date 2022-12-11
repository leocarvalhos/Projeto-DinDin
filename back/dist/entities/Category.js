"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
var typeorm_1 = require("typeorm");
var Transaction_1 = require("./Transaction");
var Category = /** @class */ (function () {
    function Category() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Category.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text' }),
        __metadata("design:type", String)
    ], Category.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Transaction_1.Transaction; }, function (transaction) { return transaction.categoryID; }),
        __metadata("design:type", Array)
    ], Category.prototype, "categoryID", void 0);
    Category = __decorate([
        (0, typeorm_1.Entity)('categorys')
    ], Category);
    return Category;
}());
exports.Category = Category;