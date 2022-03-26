const db = require("../models");
const { sequelize } = require("../models");

//******GET METHOD******
const getAllRealEstates = async (req, res) => {
  const allRealEstates = await db.RealEstate.findAll();
  res.status(200).send(allRealEstates);
};

const getRealEstateById = async (req, res) => {
  const targetId = req.params.id;
  const targetRealEstate = await db.RealEstate.findOne({
    where: {
      id: targetId,
    },
  });
  res.status(200).send(targetRealEstate);
};

//******POST METHOD******
const createRealEstate = async (req, res) => {
  const { type,product_title, product_description, province, status, address, price, category, user_id, image_url1, image_url2, image_url3, image_url4, image_url5 } = req.body;
  const newRealEstate = await db.RealEstate.create({
    type: type,
    product_title: product_title,
    product_description: product_description,
    province: province,
    status: status,
    address: address,
    price: price,
    category: category,
    image_url1: image_url1,
    image_url2: image_url2,
    image_url3: image_url3,
    image_url4: image_url4,
    image_url5: image_url5,
    user_id: user_id,
  });
  res.status(200).send(newRealEstate);
};

//******PUT METHOD******
const updateRealEstate = async (req, res) => {
  const targetId = req.params.id;
  const { type,product_title, product_description, province, status, address, price, category, user_id, image_url1, image_url2, image_url3, image_url4, image_url5  } = req.body;
  await db.RealEstate.update(
    {
      type: type,
      product_title: product_title,
      product_description: product_description,
      province: province,
      status: status,
      address: address,
      price: price,
      category: category,
      image_url1: image_url1,
      image_url2: image_url2,
      image_url3: image_url3,
      image_url4: image_url4,
      image_url5: image_url5,
      user_id: user_id,
    },
    {
      where: {
        id: targetId,
      },
    }
  );
  res.status(200).send({ message: `RealEstate ID: ${targetId} has been updated` });
};

//******DELETE METHOD******
const deleteRealEstate = async (req, res) => {
  const targetId = req.params.id;
  await db.RealEstate.destroy({
    where: {
      id: targetId,
    },
  });
  res.status(204).send();
};

module.exports = {
  getAllRealEstates,
  getRealEstateById,
  createRealEstate,
  updateRealEstate,
  deleteRealEstate,
};
