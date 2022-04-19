module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      tel: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      line_id: {
        type: DataTypes.STRING,
      },
      profile_img: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.RealEstate, { foreignKey: "user_id" });
  };

  return User;
};
