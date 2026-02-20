const datasetService = require("../services/dataset.service");

exports.uploadCSV = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = datasetService.createDatasetMetadata(req.file);

    // If dataset already exists
    if (result.status === "already_exists") {
      return res.status(200).json({
        success: true,
        dataset_id: result.dataset_id,
        status: result.status,
        message: "Dataset already exists. Returning existing dataset_id.",
      });
    }

    // New dataset created
    return res.status(201).json({
      success: true,
      dataset_id: result.dataset_id,
      status: result.status,
      message: "Dataset uploaded successfully.",
    });

  } catch (error) {
    console.error("Upload Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getDatasets = (req, res) => {
  try {
    const datasets = datasetService.getAllDatasets();

    return res.status(200).json({
      success: true,
      total: datasets.length,
      data: datasets,
    });

  } catch (error) {
    console.error("Fetch Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* 
   NEW: Dataset Summary for Dashboard
*/

exports.getDatasetSummary = async (req, res) => {
  try {
    const datasets = datasetService.getAllDatasets();

    if (!datasets || datasets.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No dataset found. Please upload a CSV first.",
      });
    }

    // Latest uploaded dataset
    const latestDataset = datasets[datasets.length - 1];

    const summary = await datasetService.getDatasetSummary(latestDataset.file_path);

    return res.status(200).json({
      success: true,
      data: summary,
    });

  } catch (error) {
    console.error("Summary Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
