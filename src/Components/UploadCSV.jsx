import { useState } from "react";

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [datasets, setDatasets] = useState([]); // added for history

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (
        selectedFile.type === "text/csv" ||
        selectedFile.name.endsWith(".csv")
      ) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
      } else {
        alert("Please upload a CSV file");
        e.target.value = "";
      }
    }
  };

  // const simulateUpload = () => {
  //   setUploadStatus('uploading');
  //   setUploadProgress(0);

  //   const interval = setInterval(() => {
  //     setUploadProgress(prev => {
  //       if (prev >= 100) {
  //         clearInterval(interval);
  //         setUploadStatus('completed');
  //         return 100;
  //       }
  //       return prev + 5;
  //     });
  //   }, 100);
  // };

  // Handled Upload section and made a backend API Call /upload-csv
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file first");
      return;
    }

    try {
      setUploadStatus("uploading");

      const formData = new FormData();
      formData.append("file", file); // 🔥 IMPORTANT (same name as backend multer)

      const response = await fetch("http://localhost:3000/api/upload-csv", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log("Backend Response:", data);

      if (response.ok) {
        setUploadStatus("completed");
        setUploadProgress(100);

        await fetchDashboardData(); // refresh dashboard

        // Reset after success
        setTimeout(() => {
          setFile(null);
          setFileName("");
          setUploadStatus("idle");
          setUploadProgress(0);
        }, 2000);
      } else {
        setUploadStatus("error");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      setUploadStatus("error");
    }
  };

  // const handleUpload = () => {
  //   if (!file) {
  //     alert('Please select a CSV file first');
  //     return;
  //   }

  //   simulateUpload();

  //   // In a real app, this would be an API call to upload the file
  //   setTimeout(() => {
  //     console.log('File uploaded:', file.name);
  //     // Reset after successful upload simulation
  //     setTimeout(() => {
  //       setFile(null);
  //       setFileName('');
  //       setUploadStatus('idle');
  //       setUploadProgress(0);
  //     }, 2000);
  //   }, 2500);
  // };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-cyan-500", "bg-cyan-900/10");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-cyan-500", "bg-cyan-900/10");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-cyan-500", "bg-cyan-900/10");

    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.type === "text/csv" || droppedFile.name.endsWith(".csv"))
    ) {
      setFile(droppedFile);
      setFileName(droppedFile.name);
    } else {
      alert("Please drop a CSV file");
    }
  };

  // // get dataset for history
  const fetchDatasets = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/dataset");
      const result = await res.json();

      if (result.success && Array.isArray(result.data)) {
        setDatasets(result.data);
        console.log(result.data);
      } else {
        setDatasets([]); // safety
      }
    } catch (error) {
      console.error("Dataset fetch error:", error);
      setDatasets([]); // safety
    }
  };

// useEffect(() => {
//   fetchDatasets();
// }, []);


  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
          Upload CSV Data
        </h1>
        <p className="mt-2 text-gray-400">
          Upload immunological data in CSV format for analysis and processing
        </p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-8 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Upload File</h3>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                uploadStatus === "uploading"
                  ? "border-cyan-500 bg-cyan-900/10"
                  : "border-gray-700 hover:border-cyan-500 hover:bg-cyan-900/10"
              }`}
            >
              <div className="h-16 w-16 rounded-full bg-cyan-900/30 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>

              <p className="text-gray-300 mb-2">
                {fileName ? fileName : "Drag & drop your CSV file here"}
              </p>
              <p className="text-sm text-gray-500 mb-4">or</p>

              <label className="cursor-pointer">
                <span className="py-2 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 inline-block">
                  Browse Files
                </span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <p className="text-xs text-gray-500 mt-4">
                Supported format: CSV (max 100MB)
              </p>
            </div>

            {/* Upload Progress */}
            {uploadStatus === "uploading" && (
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {uploadStatus === "completed" && (
              <div className="mt-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-green-400">
                    Upload completed successfully!
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Data is now being analyzed...
                </p>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!file || uploadStatus === "uploading"}
              className={`w-full mt-6 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                file && uploadStatus !== "uploading"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              {uploadStatus === "uploading"
                ? "Uploading..."
                : "Process CSV Data"}
            </button>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Instructions</h3>

            <div className="space-y-4">
              <div className="p-4 bg-gray-900/30 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-lg bg-cyan-900/30 flex items-center justify-center mr-3">
                    <span className="text-cyan-400 font-bold">1</span>
                  </div>
                  <h4 className="font-medium text-white">
                    Format Requirements
                  </h4>
                </div>
                <p className="text-gray-400 text-sm">
                  Ensure your CSV file contains the following columns:
                  timestamp, source_ip, destination_ip, event_type, severity
                </p>
              </div>

              <div className="p-4 bg-gray-900/30 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-lg bg-blue-900/30 flex items-center justify-center mr-3">
                    <span className="text-blue-400 font-bold">2</span>
                  </div>
                  <h4 className="font-medium text-white">Data Processing</h4>
                </div>
                <p className="text-gray-400 text-sm">
                  Files are processed through our immunological analysis engine,
                  which detects patterns and anomalies.
                </p>
              </div>

              <div className="p-4 bg-gray-900/30 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-lg bg-purple-900/30 flex items-center justify-center mr-3">
                    <span className="text-purple-400 font-bold">3</span>
                  </div>
                  <h4 className="font-medium text-white">Results</h4>
                </div>
                <p className="text-gray-400 text-sm">
                  Analysis results will appear in your dashboard within minutes,
                  showing threat insights and behavioral patterns.
                </p>
              </div>
            </div>

            {/* Sample Format */}
            <div className="mt-6">
              <h4 className="font-medium text-white mb-3">Sample CSV Format</h4>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-gray-300">
                  timestamp,source_ip,destination_ip,event_type,severity
                  <br />
                  2024-01-15
                  08:30:15,192.168.1.100,10.0.0.1,connection_established,low
                  <br />
                  2024-01-15
                  08:31:22,192.168.1.150,10.0.0.5,data_transfer,medium
                  <br />
                  2024-01-15
                  08:32:45,192.168.1.200,10.0.0.8,suspicious_activity,high
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Recent Uploads</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4 text-left text-gray-400 font-medium">
                  File Name
                </th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">
                  Uploaded
                </th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-gray-400 font-medium">
                  Records
                </th>
              </tr>
            </thead>
            <tbody>
              <tbody>
                {Array.isArray(datasets) && datasets.length > 0 ? (
                  datasets.map((item) => (
                    <tr
                      key={item.dataset_id}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="py-3 px-4 text-white">
                        {item.filename || "N/A"}
                      </td>

                      <td className="py-3 px-4 text-gray-400">
                        {item.upload_time
                          ? new Date(item.upload_time).toLocaleString()
                          : "N/A"}
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded-md">
                          {item.status || "unknown"}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-cyan-400">
                        {item.dataset_id}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-4 px-4 text-center text-gray-500"
                    >
                      No datasets uploaded yet
                    </td>
                  </tr>
                )}
              </tbody>

              {/* <tr className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                <td className="py-3 px-4 text-white">
                  network_traffic_jan15.csv
                </td>
                <td className="py-3 px-4 text-gray-400">2 hours ago</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded-md">
                    Analyzed
                  </span>
                </td>
                <td className="py-3 px-4 text-cyan-400">24,812</td>
              </tr>
              <tr className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                <td className="py-3 px-4 text-white">device_logs_jan14.csv</td>
                <td className="py-3 px-4 text-gray-400">Yesterday</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-md">
                    Processing
                  </span>
                </td>
                <td className="py-3 px-4 text-cyan-400">15,429</td>
              </tr>
              <tr className="hover:bg-gray-800/30 transition-colors">
                <td className="py-3 px-4 text-white">
                  security_events_jan13.csv
                </td>
                <td className="py-3 px-4 text-gray-400">2 days ago</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded-md">
                    Analyzed
                  </span>
                </td>
                <td className="py-3 px-4 text-cyan-400">8,741</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UploadCSV;
