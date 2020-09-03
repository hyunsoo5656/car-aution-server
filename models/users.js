const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      unique: false,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(20),
      unique: false,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(14),
      unique: false,
      allowNull: true
    },
  }, {
    sequelize: sequelize,
    timestamps: true,
    modelName: 'User',
    tableName: 'users',
    paranoid: true,
    charset: 'utf8',
    collation: 'utf8_general_ci'
  })

  User.associate = (db) => {
    db.User.hasMany(db.Car,
      { foreignKey: 'ownerId', sourceKey: 'id', as: 'carList' }
    );
    db.User.hasMany(db.AuctionBidding,
      { foreignKey: 'UserId', sourceKey: 'id', as: 'userBidding' }
    );
    db.User.belongsToMany(db.Auction,
      { through: db.AuctionBidding }
    );
  }

  return User;
}