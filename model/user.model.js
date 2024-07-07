module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define(
    "user",
    {
      userId: {
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
      isActive: { type: DataTypes.BOOLEAN, defaultValue: 0 },
      orgId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return User;
};
