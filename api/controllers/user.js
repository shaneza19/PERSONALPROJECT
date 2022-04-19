const { User } = require("../models");

exports.getUserById = async (req, res, next) => {
  try {
    const targetId = req.params.id;
    const targetUser = await User.findOne({
      where: {
        id: targetId,
      },
    });
    res.status(200).send(targetUser);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const targetId = req.params.id;
    const {
      username,
      password,
      first_name,
      last_name,
      tel,
      email,
      line_id,
      profile_img,
    } = req.body;
    await User.update(
      {
        username: username,
        password: password,
        first_name: first_name,
        last_name: last_name,
        tel: tel,
        email: email,
        line_id: line_id,
        profile_img: profile_img,
      },
      {
        where: {
          id: targetId,
        },
      }
    );
    res.status(200).send({ message: `User ID: ${targetId} has been updated` });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res, next) => {
  const { id, username, first_name, last_name, profile_img, email, tel, line_id } = req.user;
  res
    .status(200)
    .json({
      user: { id, username, first_name, last_name, profile_img, email, tel, line_id }
    });
};
