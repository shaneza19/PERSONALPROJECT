module.exports = (sequelize, DataTypes) => {
  const RealEstate = sequelize.define(
    "RealEstate",
    {
      type: {
        type: DataTypes.STRING,
        validate: {
          isIn: [["ขาย", "เช่า"]],
        }
      },
      product_title: {
        type: DataTypes.STRING(100),
      },
      product_description: {
        type: DataTypes.STRING(500),
      },
      province: {
        type: DataTypes.STRING(100),
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "ขายอยู่",
        validate: {
          isIn: [["ขายอยู่", "ไม่ว่าง"]],
        },
      },
      address: {
        type: DataTypes.STRING(255),
      },
      price: {
        type: DataTypes.FLOAT,
      },
      category: {
        type: DataTypes.STRING,
        validate: {
          isIn: [
            [
              "บ้าน",
              "ที่ดิน",
              "คอนโด",
              "ตึกแถว",
              "ทาวน์เฮ้าส์",
              "อพาร์ทเม้นท์",
              "อาคารพานิชย์",
              "อื่นๆ",
            ],
          ],
        },
      },
      image_1: {
        type: DataTypes.STRING,
      },
      image_2: {
        type: DataTypes.STRING,
      },
      image_3: {
        type: DataTypes.STRING,
      },
      image_4: {
        type: DataTypes.STRING,
      },
      image_5: {
        type: DataTypes.STRING,
      },
      img1_cloudinary_id: {
        type: DataTypes.STRING,
      },
      img2_cloudinary_id: {
        type: DataTypes.STRING,
      },
      img3_cloudinary_id: {
        type: DataTypes.STRING,
      },
      img4_cloudinary_id: {
        type: DataTypes.STRING,
      },
      img5_cloudinary_id: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "real estates",
      timestamps: true,
    }
  );

  RealEstate.associate = (models) => {
    RealEstate.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return RealEstate;
};
