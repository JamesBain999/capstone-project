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
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
    },
    playerName: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
    playerPosition: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
    playerCorrectAnswers: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
