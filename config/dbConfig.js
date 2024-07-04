const { Sequelize, DataTypes } = require("sequelize");
const { DB_NAME, DB_PASSWORD, DB_HOST, DB_USERNAME } = require("../config");

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models
db.user = require("../model/user.model")(sequelize, DataTypes);
db.organization = require("../model/organization.model")(sequelize, DataTypes);

//relation
db.organization.hasMany(db.user, { foreignKey: "orgId" });
db.user.belongsTo(db.organization, { foreignKey: "orgId" });

db.sequelize.sync({ force: false });

module.exports = db;
