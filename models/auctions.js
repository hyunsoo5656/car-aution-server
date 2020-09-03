const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // 경매 테이블(등록테이블)
  const Auction = sequelize.define('Auction', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    startTime: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: false
    },
    endTime: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: false
    },
    minPrice: {
      type: DataTypes.DECIMAL(14, 2),
      unique: false,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize: sequelize,
    timestamps: true,
    modelName: 'Auction',
    tableName: 'auctions',
    paranoid: true,
    charset: 'utf8',
    collation: 'utf8_general_ci'
  })

  Auction.associate = (db) => {
    db.Auction.belongsTo(db.Car,
      { foreignKey: 'carId', targetKey: 'id', as: 'car' }
    )
    db.Auction.belongsToMany(db.User,
      { through: db.AuctionBidding }
    )
  }

  return Auction;
}