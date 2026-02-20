const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const csv = require("csv-parser");
const { v4: uuidv4 } = require("uuid");

const registryPath = path.join(__dirname, "../../data/datasets_registry.json");

// read registry
function readRegistry() {
  if (!fs.existsSync(registryPath)) {
    fs.writeFileSync(registryPath, JSON.stringify([]));
  }
  const data = fs.readFileSync(registryPath);
  return JSON.parse(data);
}

// save registry
function saveRegistry(data) {
  fs.writeFileSync(registryPath, JSON.stringify(data, null, 2));
}

// Generate file hash (SHA256)
function generateFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash("sha256");
  hashSum.update(fileBuffer);
  return hashSum.digest("hex");
}

function createDatasetMetadata(file) {
  const datasets = readRegistry();

  const fileHash = generateFileHash(file.path);

  // Check for duplicate
  const existingDataset = datasets.find((ds) => ds.file_hash === fileHash);

  if (existingDataset) {
    fs.unlinkSync(file.path);

    return {
      dataset_id: existingDataset.dataset_id,
      status: "already_exists",
    };
  }

  // const newDataset = {
  //   dataset_id: "ds_" + uuidv4().slice(0, 8),
  //   filename: file.filename,
  //   upload_time: new Date().toISOString(),
  //   file_path: file.path,
  //   file_hash: fileHash,
  //   status: "queued",
  //   intelligence_path: null,
  // };
  const newDataset = {
    dataset_id: "ds_" + uuidv4().slice(0, 8),
    filename: file.filename,
    upload_time: new Date().toISOString(),
    file_path: file.path,
    file_hash: fileHash,
    status: "uploaded",
  };

  datasets.push(newDataset);
  saveRegistry(datasets);

  return newDataset;
}

function getAllDatasets() {
  return readRegistry();
}

/* 
   NEW: Dashboard Summary Logic
*/

// Aggregrator part
function getDatasetSummary(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        if (results.length === 0) {
          return resolve({
            totalSessions: 0,
            totalBots: 0,
            avgSessionDuration: 0,
            avgRequests: 0,
            botPercentage: 0,
            avgErrorRate: 0,
            avgRepetitionRate: 0,
            avgUniquePaths: 0,
            avgTimeBetweenRequests: 0,
            systemStatus: "active",
            immunityScore: 100,
          });
        }

        // aggregrator logic only with one CSV file

        const totalSessions = results.length;
        const totalBots = results.filter((r) => Number(r.label) === 1).length;

        const avg = (key) =>
          results.reduce((sum, r) => sum + Number(r[key] || 0), 0) /
          totalSessions;

        const avgSessionDuration = avg("session_duration");
        const avgRequests = avg("num_requests");
        const avgErrorRate = avg("error_rate");
        const avgRepetitionRate = avg("repetition_rate");
        const avgUniquePaths = avg("num_unique_paths");
        const avgTimeBetweenRequests = avg("avg_time_between_reqs");

        const botPercentage = (totalBots / totalSessions) * 100;

        // --- SystemStatus logic ---
        let systemStatus = "active";
        if (botPercentage > 70 || avgErrorRate > 0.5) systemStatus = "critical";
        else if (botPercentage > 40 || avgErrorRate > 0.2)
          systemStatus = "warning";

        // --- ImmunityScore logic ---
        let immunityScore = 100 - botPercentage - avgErrorRate * 100;
        immunityScore = Math.max(0, Math.min(100, immunityScore));

        resolve({
          totalSessions,
          totalBots,
          botPercentage: botPercentage.toFixed(2),
          avgSessionDuration: avgSessionDuration.toFixed(2),
          avgRequests: avgRequests.toFixed(2),
          avgErrorRate: avgErrorRate.toFixed(2),
          avgRepetitionRate: avgRepetitionRate.toFixed(2),
          avgUniquePaths: avgUniquePaths.toFixed(2),
          avgTimeBetweenRequests: avgTimeBetweenRequests.toFixed(2),
          systemStatus,
          immunityScore: immunityScore.toFixed(0),
        });
      })
      .on("error", reject);
  });
}

module.exports = {
  createDatasetMetadata,
  getAllDatasets,
  getDatasetSummary, // ✅ added export
};
