const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const presidentModel = require("../model/presidentModel");
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

const verified = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (authToken) {
    const token = authToken.split(" ")[1];

    jwt.verify(token, "ETHISmmmooKLSJHffHSKAI", (err, payload) => {
      if (err) {
        res.status(400).json({ message: `Token is not correct` });
      } else {
        req.user = payload;
        next();
      }
    });
  }
};

router.delete("/candidate/:id/:voteID", async (req, res) => {
  try {
    const createCandidate = await presidentModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { voteCount: { _id: req.params.voteID } }
      },
      { new: true }
    );

    res.status(201).json({
      message: "candidate created successfully",
      data: createCandidate
    });
  } catch (err) {
    res.status(400).json({ message: `Error reading data: ${err.message}` });
  }
});

router.post("/candidate/:id", async (req, res) => {
  try {
    const voteCount = {
      who: req.body.who,
      toggle: true
    };
    const createCandidate = await presidentModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { voteCount }
      },
      { new: true }
    );

    res.status(201).json({
      message: "candidate created successfully",
      data: createCandidate
    });
  } catch (err) {
    res.status(400).json({ message: `Error reading data: ${err.message}` });
  }
});

router.post("/candidate/create", verified, upload, async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const { name, voteCount } = req.body;
      const image = await cloudinary.uploader.upload(req.file.path);
      const createCandidate = await presidentModel.create({
        name,
        voteCount,
        avatar: image.secure_url
      });
      res.status(201).json({
        message: "candidate created successfully",
        data: createCandidate
      });
    } else {
      res.status(400).json({ message: `You don't have access for this` });
    }
  } catch (err) {
    res.status(400).json({ message: `Error reading data: ${err.message}` });
  }
});

router.get("/candidate", async (req, res) => {
  try {
    const getCandidate = await presidentModel.find();
    res.status(200).json({
      message: "All candidates found successfully",
      data: getCandidate
    });
  } catch (err) {
    res.status(400).json({ message: `Error reading data: ${err.message}` });
  }
});

router.get("/candidate/:id", async (req, res) => {
  try {
    const getCandidate = await presidentModel.findById(req.params.id);
    res.status(200).json({
      message: "Individual candidate found successfully",
      data: getCandidate
    });
  } catch (err) {
    res.status(400).json({ message: `Error reading data: ${err.message}` });
  }
});

module.exports = router;
