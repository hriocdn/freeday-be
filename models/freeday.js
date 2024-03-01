'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Freeday extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Consume, {
        foreignKey: 'id_consume',
        targetKey: 'id'
      });
      models.Consume.hasMany(this, {
        foreignKey: 'id_consume',
        sourceKey: 'id'
      });

      this.belongsTo(models.Event, {
        foreignKey: 'id_event',
        targetKey: 'id'
      });
      models.Event.hasMany(this, {
        foreignKey: 'id_event',
        sourceKey: 'id'
      });
    }
  }
  Freeday.init({
    id_event: DataTypes.INTEGER,
    id_consume: DataTypes.INTEGER,
    rate1: DataTypes.INTEGER,
    rate2: DataTypes.INTEGER,
    rate3: DataTypes.INTEGER,
    rate4: DataTypes.INTEGER,
    rate5: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Freeday',
  });
  return Freeday;
};