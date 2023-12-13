const express = require('express');
const { adddata, getUsers } = require('../control/user.control');

// Create a router
const router = express.Router();

// Define routes
router.post('/adddata', adddata);
router.get('/get-Users', getUsers);

// Export the router
module.exports = router; // Corrected export statement


// userRouter.js

// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const userModel = require('../model/user.model');

// // Define the destination folder dynamically
// const uploadFolder = path.join(__dirname, '../uploads');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadFolder);
//   },
//   filename: function (req, file, cb) {
//     const imgName = file.originalname;
//     const imgArr = imgName.split(".");
//     imgArr.pop();
//     const extImg = path.extname(imgName);
//     const imageName = imgArr.join(".") + "-" + Date.now() + extImg;
//     cb(null, imageName);
//   },
// });

// const upload = multer({ storage: storage });

// // POST endpoint for image upload
// router.post('/upload', upload.single('image'), (req, res) => {
//   try {
//     const imageUrl = `/uploads/${req.file.filename}`;
//     res.status(200).json({ imageUrl });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// });

// // Other routes...

// module.exports = router;
