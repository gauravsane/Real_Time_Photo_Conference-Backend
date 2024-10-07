const userModel = require("../model/user.model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { getWss } = require("../global"); // Adjust the path if necessary
const WebSocket = require("ws"); // Import the WebSocket class
// Define the destination folder dynamically
const uploadFolder = path.join(__dirname, "../uploads");
const socket = require('../websocket');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    const imgName = file.originalname;
    const imgArr = imgName.split(".");
    imgArr.pop();
    const extImg = path.extname(imgName);
    const imageName = imgArr.join(".") + "-" + Date.now() + extImg;
    cb(null, imageName);
  },
});

const upload = multer({ storage: storage });

// Post for add
exports.adddata = async (req, res) => {
  try {
    const uploadFile = upload.array("images", 10);

    uploadFile(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          message: "File upload failed",
          error: err.message,
        });
      }

      const { name } = req.body;

      if (!name) {
        return res.status(400).json({
          message: "Name is required",
        });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          message: "No files uploaded",
        });
      }

      const imageArr = req.files.map((file) => file.filename);
      const user_data = new userModel({
        name: name,
        avatar: imageArr[0],
        images: imageArr,
      });

      const user = await user_data.save();
      if (user) {
        const io = socket.getIo(); // Get the Socket.IO instance
        // Send a WebSocket message to all connected clients
        const newUserData = { name, avatar: user_data.avatar };
         // Emit event through Socket.IO to all connected clients
         io.emit("new_user_added", newUserData);

        return res.status(201).json({
          message: "User data saved",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const userData = await userModel
      .find({ status: 1 })
      .sort({ updatedAt: -1 })
      .limit(1);

    res.status(200).json({
      data: userData,
      message: "Successfully fetched data",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
