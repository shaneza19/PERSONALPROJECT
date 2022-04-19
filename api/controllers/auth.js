const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.register = async (req, res, next) => {
  try {
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

    const existUser = await User.findOne({ where: { username: username } });

    if (existUser) {
      res.status(400).send({ message: "Username already taken." });
    }

    const salt = bcryptjs.genSaltSync(12);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    await User.create({
      username: username,
      password: hashedPassword,
      first_name: first_name,
      last_name: last_name,
      tel: tel,
      email: email,
      line_id: line_id,
      profile_img: profile_img,
    });

    res.status(201).send({ message: "user created" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    let user;
    user = await User.findOne({ where: { username: username } });

    if (!user) {
      res.status(400).send({ message: "invalid username" });
    }

    const isCorrectPassword = bcryptjs.compareSync(password, user.password);

    if (!isCorrectPassword) {
      return res.status(400).json({ message: "invalid password" });
    }

    const payload = {
      id: user.id,
      name: user.first_name
    };

    //token expires in 30 days
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 60 * 60 * 24 * 30
    });

    const {
        id,
        first_name,
        last_name,
        tel,
        email,
        line_id
      } = user;

    res.status(200).json({
      token,
      user: {
        id,
        username,
        first_name,
        last_name,
        tel,
        email,
        line_id
      },
    });
  } catch (err) {
    next(err);
  }
};
