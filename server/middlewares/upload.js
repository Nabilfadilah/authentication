const multer = require("multer");

const storage = multer.memoryStorage(); // simpan di memori (buffer)
const upload = multer({ storage });

module.exports = upload;
