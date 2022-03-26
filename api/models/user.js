module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING(255),
      },
      password: {
        type: DataTypes.STRING(255),
      },
      first_name: {
        type: DataTypes.STRING(255),
      },
      last_name: {
        type: DataTypes.STRING(255),
      },
      tel: {
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING(255),
      },
      line_id: {
        type: DataTypes.STRING(255),
      },
      profile_pic_url: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );

  model.associate = (models) => {
    model.hasMany(models.RealEstate, { foreignKey: "user_id" });
  };

  return model;
};
