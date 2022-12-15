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
exports.Transaction = void 0;
var typeorm_1 = require("typeorm");
var Category_1 = require("./Category");
var User_1 = require("./User");
var Transaction = /** @class */ (function () {
    function Transaction() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Transaction.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text" }),
        __metadata("design:type", String)
    ], Transaction.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "decimal" }),
        __metadata("design:type", Number)
    ], Transaction.prototype, "value", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "timestamp" }),
        __metadata("design:type", Date)
    ], Transaction.prototype, "date", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Transaction.prototype, "type", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.transactions; }),
        (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
        __metadata("design:type", User_1.User)
    ], Transaction.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Category_1.Category; }, function (category) { return category.transactions; }),
        (0, typeorm_1.JoinColumn)({ name: "category_id" }),
        __metadata("design:type", Category_1.Category)
    ], Transaction.prototype, "category", void 0);
    Transaction = __decorate([
        (0, typeorm_1.Entity)('transactions')
    ], Transaction);
    return Transaction;
}());
exports.Transaction = Transaction;