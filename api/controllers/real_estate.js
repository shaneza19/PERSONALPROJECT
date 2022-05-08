const util = require("util");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { RealEstate } = require("../models");

const uploadPromise = util.promisify(cloudinary.uploader.upload);

//******GET METHOD******

//get new post(8)
exports.getNewRealEstates = async (req, res, next) => {
  try {
    const newRealEstates = await RealEstate.findAll({
      order: [
        ['id', 'DESC']
      ],
      limit: 8,
    })
    res.status(200).send(newRealEstates);
  } catch (err) {
    next(err);
  }
};

//load more  (8)
exports.loadMoreRealEstates = async (req, res, next) => {
 // get page from query params or default to first page
 const page = parseInt(req.query.page) || 1;
 const limit = 8;
 const offset = page * limit;

  try {
    const moreRealEstates = await RealEstate.findAll({
      order: [
        ['id', 'DESC']
      ],
      limit: limit,
      offset: offset,
    })
    res.status(200).send(moreRealEstates);
  } catch (err) {
    next(err);
  }
};

exports.getAllRealEstates = async (req, res, next) => {
  try {
    const allRealEstates = await RealEstate.findAll();
    res.status(200).send(allRealEstates);
  } catch (err) {
    next(err);
  }
};

exports.getRealEstateById = async (req, res, next) => {
  try {
    const targetId = req.params.id;
    const targetRealEstate = await RealEstate.findOne({
      where: {
        id: targetId,
      },
    });
    res.status(200).send(targetRealEstate);
  } catch (err) {
    next(err);
  }
};

//******POST METHOD******
exports.createRealEstate = async (req, res, next) => {
  try {
    let result = {};

    if (req.file) {
      result = await uploadPromise(req.file.path);
      fs.unlinkSync(req.file.path);
    }

    const newRealEstate = await RealEstate.create({
      type: req.body.type,
      product_title: req.body.product_title,
      product_description: req.body.product_description,
      province: req.body.province,
      status: req.body.status,
      address: req.body.address,
      price: req.body.price,
      category: req.body.category,
      image_1: result.secure_url,
      img1_cloudinary_id: result.public_id,
      user_id: req.user.id,
    });

    res.status(201).send(newRealEstate);
  } catch (err) {
    next(err);
  }
};

//******PUT METHOD******
exports.updateRealEstate = async (req, res, next) => {
  try {
    const targetId = req.params.id;
    const {
      type,
      product_title,
      product_description,
      province,
      status,
      address,
      price,
      category,
    } = req.body;
    await RealEstate.update(
      {
        type: type,
        product_title: product_title,
        product_description: product_description,
        province: province,
        status: status,
        address: address,
        price: price,
        category: category,
        user_id: req.user.id,
      },
      {
        where: {
          id: targetId,
        },
      }
    );
    res
      .status(200)
      .send({ message: `RealEstate ID: ${targetId} has been updated` });
  } catch (err) {
    next(err);
  }
};

//******DELETE METHOD******
exports.deleteRealEstate = async (req, res, next) => {
  try {
    const targetId = req.params.id;
    await RealEstate.destroy({
      where: {
        id: targetId,
      },
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
