const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class GameState extends Model {}
// Sequelize will create this table if it doesn't exist on startup
GameState.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    playerPositionX: {
      type: DataTypes.INTEGER,
      allowNull: true,
      required: true,
    },
    playerPositionY: {
      type: DataTypes.INTEGER,
      allowNull: true,
      required: true,
    },
    playerCorrectAnswers: {
      type: DataTypes.INTEGER,
      allowNull: true,
      required: true,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "gameStates",
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = GameState;
