const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  uploadReport,
  getReports,
  deleteReport,
  downloadReport,
} = require("../controllers/reportController");




// Upload Medical Report
router.post(
  "/upload",
  protect,
  upload.single("report"),
  uploadReport
);

// Get All Reports
router.get(
  "/history",
  protect,
  getReports
);
router.get(
  "/download/:id",
  protect,
  downloadReport
);
router.delete(
  "/:id",
  protect,
  deleteReport
);

module.exports = router;