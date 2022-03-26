module.exports = (sequelize, DataTypes) => {
  const RealEstate = sequelize.define(
    "RealEstate",
    {
      type: {
        //ขาย / เช่า
        type: DataTypes.STRING,
        validate: {
          isIn: [['ขาย', 'เช่า']]
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
        //ขายอยู่ / ไม่ว่าง
        type: DataTypes.STRING,
        validate: {
          isIn: [['ขายอยู่', 'ไม่ว่าง']]
        }
      },
      address: {
        type: DataTypes.STRING(255),
      },
      price: {
        type: DataTypes.FLOAT,
      },
      category: {
        /* 1 = house(บ้าน), 2 = land(ที่ดิน), 3 = condo(คอนโด), 4 = shophouse(ตึกแถว), 5 = townhouse(ทาวน์เฮ้าส์), 
         6 = apartment(อพาร์ทเม้นท์), 7 = commercialbuilding(อาคารพานิชย์), 8 = other(อื่นๆ) */
        type: DataTypes.STRING,
        validate: {
          isIn: [['บ้าน', 'ที่ดิน', 'คอนโด', 'ตึกแถว', 'ทาวน์เฮ้าส์', 'อพาร์ทเม้นท์', 'อาคารพานิชย์', 'อื่นๆ']]
        }
      },
      image_url1: {
        type: DataTypes.STRING,
      },
      image_url2: {
        type: DataTypes.STRING,
      },
      image_url3: {
        type: DataTypes.STRING,
      },
      image_url4: {
        type: DataTypes.STRING,
      },
      image_url5: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "real estates",
      timestamps: false,
    }
  );

  RealEstate.associate = (models) => {
    RealEstate.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return RealEstate;
};
