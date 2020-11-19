'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.User)
      Cart.belongsTo(models.Product)
    }
  };
  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'UserId required'
        },
        notEmpty: {
          args: true,
          msg: 'UserId required'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'ProductId required'
        },
        notEmpty: {
          args: true,
          msg: 'ProductId required'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'quantity required'
        },
        notEmpty: {
          args: true,
          msg: 'quantity required'
        },
        min: {
          args: [1],
          msg: 'quantity must be more than 0'
        }
      }
    },
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};