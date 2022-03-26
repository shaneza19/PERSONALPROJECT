const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { User } = require('../models');
const util = require('util');

exports.updateProfileImg = (req, res, next) => {
  cloudinary.uploader.upload(req.file.path, async (err, result) => {
    if (err) return next(err);

    await User.update(
      { profile_img: result.secure_url },
      { where: { id: req.user.id } }
    );

    if (req.user.profile_img) {
      const splited = req.user.profile_img.split('/');
      cloudinary.uploader.destroy(splited[splited.length - 1].split('.')[0]);
    }

    fs.unlinkSync(req.file.path);
    res.json({
      message: 'upload profile image completed',
      profile_img: result.secure_url
    });
  });
};