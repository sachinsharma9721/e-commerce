module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define("user", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "ORG_ADMIN" },
    is_Active: { type: DataTypes.BOOLEAN, defaultValue: 0 },
    orgId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
  return User;
};
