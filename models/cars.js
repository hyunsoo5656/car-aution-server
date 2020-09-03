const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Car = sequelize.define('Car', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    modelName: {
      type: DataTypes.STRING(50),
      unique: false,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: false
    },
    manufacturer: {
      type: DataTypes.STRING(30),
      unique: false,
      allowNull: false
    },
    vin: {
      type: DataTypes.STRING(17),
      unique: false,
      allowNull: false
    }
  }, {
    sequelize: sequelize,
    timestamps: true,
    modelName: 'Car',
    tableName: 'cars',
    paranoid: true,
    charset: 'utf8',
    collation: 'utf8_general_ci'
  })

  Car.associate = (db) => {
    db.Car.belongsTo(db.User,
      { foreignKey: 'ownerId', targetKey: 'id', as: "owner" }
    );
    db.Car.hasOne(db.Auction,
      { foreignKey: 'carId', sourceKey: 'id', as: 'inAuction' }
    );
  }

  return Car;
}