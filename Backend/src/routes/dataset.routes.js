const express = require("express");
const router = express.Router();
const datasetController = require("../controllers/dataset.controllers");

const upload = require("../utils/fileValidation");

router.post("/upload-csv", upload.single("file"), datasetController.uploadCSV);

router.get("/datasets", datasetController.getDatasets);

router.get("/summary", datasetController.getDatasetSummary);


module.exports = router;