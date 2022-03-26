const db = require("../models");
const { sequelize } = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

//******POST METHOD******
//use Bcrypt for hash
const createUser = async (req, res) => {
  const { username, password, first_name, last_name, tel, email, line_id, profile_pic_url, } = req.body;
  const targetUser = await db.User.findOne({ where: { username: username } });
  if (targetUser) {
    res.status(400).send({ message: "Username already taken." });
  } else {
    const salt = bcryptjs.genSaltSync(12);
    const hashedPassword = bcryptjs.hashSync(password, salt);


    await db.User.create({
      username: username,
      password: hashedPassword,
      first_name: first_name,
      last_name: last_name,
      tel: tel,
      email: email,
      line_id: line_id,
      profile_pic_url: profile_pic_url,
    });
  }
  res.status(201).send({ message: "user created" });
};

//token expires in 3600 seconds
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const targetUser = await db.User.findOne({ where: { username: username } });
  if (!targetUser) {
    res.status(400).send({ message: "Username or password is wrong" });
  } else {
    const isCorrectPassword = bcryptjs.compareSync(
      password,
      targetUser.password
    );
    if (isCorrectPassword) {
      const payload = {
        name: targetUser.first_name,
        id: targetUser.id,
      };
      const token = jwt.sign(payload, "coDEcaMP", { expiresIn: 3600 });
      res.status(200).send({
        token: token,
        message: "login successful",
        user_id: targetUser.id,
        username: targetUser.username,
        password: targetUser.password,
        first_name: targetUser.first_name,
        last_name: targetUser.last_name,
        tel: targetUser.tel,
        email: targetUser.email,
        line_id: targetUser.line_id,
        profile_pic_url: targetUser.profile_pic_url,
      });
    } else {
      res.status(400).send({ message: "Username or password is wrong" });
    }
  }
};

//******PUT METHOD******
const updateUser = async (req, res) => {
  const targetId = req.params.id;
  const { username, password, first_name, last_name, tel, email, line_id, profile_pic_url, } = req.body;
  await db.User.update(
    {
      username: username,
      password: password,
      first_name: first_name,
      last_name: last_name,
      tel: tel,
      email: email,
      line_id: line_id,
      profile_pic_url: profile_pic_url,
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
  await db.User.destroy({
    where: {
      id: targetId,
    },
  });
  res.status(204).send();
};

//******GET METHOD******
const getAllUsers = async (req, res) => {
  const allUsers = await db.User.findAll();
  res.status(200).send(allUsers);
};

const getUserById = async (req, res) => {
  const targetId = req.params.id;
  const targetUser = await db.User.findOne({
    where: {
      id: targetId,
    },
  });
  res.status(200).send(targetUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
};
