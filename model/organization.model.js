module.exports = (Sequelize, DataTypes) => {
  const Organization = Sequelize.define(
    "organization",
    {
      orgId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      orgName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return Organization;
};
