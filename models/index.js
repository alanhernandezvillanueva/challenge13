// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo (Category, {
  foreignKey: 'category_name'
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'product_id'
});

// Products belongToMany Tags (through ProductTag)
Product.belongsTo(ProductTag,{
  foreignKey:'product_id'
});

// Tags belongToMany Products (through ProductTag)
ProductTag.belongsTo(Product, {
  foreignKey:'product_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
