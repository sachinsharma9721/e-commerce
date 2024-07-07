module.exports = (Sequelize, DataTypes) => {
  const Employee = Sequelize.define(
    "employee",
    {
      empId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      empFirstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      empLastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      empEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      empPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      empRole: {
        type: DataTypes.STRING,
        allowNull: false,
      },
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
  return Employee;
};
