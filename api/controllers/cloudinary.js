const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { User } = require("../models");
const { RealEstate } = require("../models");
const util = require("util");

exports.updateProfileImg = (req, res, next) => {
  cloudinary.uploader.upload(req.file.path, async (err, result) => {
    if (err) return next(err);

    await User.update(
      { profile_img: result.secure_url },
      { where: { id: req.user.id } }
    );

    if (req.user.profile_img) {
      const splited = req.user.profile_img.split("/");
      cloudinary.uploader.destroy(splited[splited.length - 1].split(".")[0]);
    }

    fs.unlinkSync(req.file.path);
    res.json({
      message: "upload profile image completed",
      profile_img: result.secure_url,
    });
  });
};

exports.updateRealEstateImg1 = async (req, res, next) => {
  try {
    const targetID = Number(req.params.id);
    const targetItem = await RealEstate.findOne({
      where: {
        id: targetID,
      },
    });

    if (targetItem) {
      let imageData;
    // console.log(req.file); // to see what is returned to you
      if (req.file) {
        await cloudinary.uploader.destroy(targetItem.img1_cloudinary_id);
        imageData = await cloudinary.uploader.upload(req.file.path);
      }

      await targetItem.update({
        image_1: imageData?.secure_url || targetItem.image_1,
        img1_cloudinary_id: imageData?.public_id || targetItem.img1_cloudinary_id,
      });

      fs.unlinkSync(req.file.path);

      res.status(200).send({ message: "upload real_estate image 1 completed" });
    } else {
      res.status(404).send({ message: "Item not found." });
    }
  } catch (err) {
    console.log(err);
  }
};

