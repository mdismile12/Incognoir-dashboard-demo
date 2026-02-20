const cors = require("cors");
const express = require('express');
const datasetRoutes = require('./routes/dataset.routes')

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api", datasetRoutes);

module.exports = app;