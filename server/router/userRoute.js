const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const userModel = require("../model/userModel");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage: storage }).single("avatar");

cloudinary.config({
  cloud_name: "dry8nywub",
  api_key: "629241972579982",
  api_secret: "Pc2-culzxkssn7oX8SIZoMLR6vc"
});

router.get("/voters", async (req, res) => {
  try {
    const getUsers = await userModel.find();
    res
      .status(200)
      .json({ message: "voters found successfully", data: getUsers });
  } catch (err) {
    res.status(400).json({ message: `Error found, caused by ${err.message}` });
  }
});

router.post("/voter/register", upload, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const image = await cloudinary.uploader.upload(req.file.path);
    const createUsers = await userModel.create({
      name,
      email,
      password: hash,
      avatar: image.secure_url
    });
    res
      .status(201)
      .json({ message: "voter created successfully", data: createUsers });
  } catch (err) {
    res.status(400).json({ message: `Error found, caused by ${err.message}` });
  }
});

router.post("/voter/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkEmail = await userModel.findOne({ email });
    if (checkEmail) {
      const checkPassword = await bcrypt.compare(password, checkEmail.password);

      if (checkPassword) {
        const token = jwt.sign(
          {
            _id: checkEmail._id,
            name: checkEmail.name,
            isAdmin: checkEmail.isAdmin,
            email: checkEmail.email
          },
          "ETHISmmmooKLSJHffHSKAI",
          { expiresIn: "3d" }
        );
        const { password, ...info } = checkEmail._doc;
        res
          .status(201)
          .json({
            message: "voter signed-in successfully",
            data: { ...info, token }
          });
      } else {
        res.status(400).json({ message: `password is not correct` });
      }
    } else {
      res.status(400).json({ message: `user does not Exist` });
    }
  } catch (err) {
    res.status(400).json({ message: `Error found, caused by ${err.message}` });
  }
});

router.get("/voter/:id", async (req, res) => {
  try {
    const deleteUser = await userModel.findById(req.params.id);
    res.status(200).json({
      message: "Individual voter Deleted successfully",
      data: deleteUser
    });
  } catch (err) {
    res.status(400).json({ message: `Error found, caused by ${err.message}` });
  }
});

router.patch("/voter/:id", upload, async (req, res) => {
  try {
    const { name } = req.body;
    const image = await cloudinary.uploader.upload(req.file.path);
    const updateUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        avatar: image.secure_url
      },
      { new: true }
    );
    res.status(200).json({
      message: "Individual voter, updated successfully",
      data: updateUser
    });
  } catch (err) {
    res.status(400).json({ message: `Error found, caused by ${err.message}` });
  }
});

router.delete("/voter/:id", async (req, res) => {
  try {
    const getUser = await userModel.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "voters has been deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: `Error found, caused by ${err.message}` });
  }
});

module.exports = router;
