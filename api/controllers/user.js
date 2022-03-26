const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

//******PUT METHOD******
const updateUser = async (req, res) => {
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
};

//******DELETE METHOD******
const deleteUser = async (req, res) => {
  const targetId = req.params.id;
  await User.destroy({
    where: {
      id: targetId,
    },
  });
  res.status(204).send();
};

//******GET METHOD******
const getAllUsers = async (req, res) => {
  const allUsers = await User.findAll();
  res.status(200).send(allUsers);
};

const getUserById = async (req, res) => {
  const targetId = req.params.id;
  const targetUser = await User.findOne({
    where: {
      id: targetId,
    },
  });
  res.status(200).send(targetUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
