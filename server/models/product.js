'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'name is required'
        },
        notEmpty: {
          args: true,
          msg: 'name is required'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'image is required'
        },
        notEmpty: {
          args: true,
          msg: 'image is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'price is required'
        },
        notEmpty: {
          args: true,
          msg: 'price is required'
        },
        min: {
          args: [0],
          msg: 'price must be higher than 0'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'stock is required'
        },
        notEmpty: {
          args: true,
          msg: 'stock is required'
        },
        min: {
          args: [-1],
          msg: "stock must be higher than 0s"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};