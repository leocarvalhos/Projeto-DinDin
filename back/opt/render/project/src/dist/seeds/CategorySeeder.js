"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySeeder = void 0;
const Category_1 = require("../entities/Category");
class CategorySeeder {
    async run(dataSource, factoryManager) {
        const categoryRepository = dataSource.getRepository(Category_1.Category);
        const descriptionData = [{
                description: 'Alimentação'
            },
            {
                description: 'Assinaturas e Serviços'
            }, {
                description: 'Casa'
            }, {
                description: 'Mercado'
            }, {
                description: 'Cuidados Pessoais'
            }, {
                description: 'Educação'
            }, {
                description: 'Família'
            }, {
                description: 'Lazer'
            }, {
                description: 'Pets'
            }, {
                description: 'Presentes'
            }, {
                description: 'Roupas'
            }, {
                description: 'Saúde'
            }, {
                description: 'Transporte'
            }, {
                description: 'Salário'
            }, {
                description: 'Vendas'
            }, {
                description: 'Outras receitas'
            }, {
                description: 'Outras despesas'
            }];
        const newCategory = categoryRepository.create(descriptionData);
        await categoryRepository.save(newCategory);
    }
}
exports.CategorySeeder = CategorySeeder;
