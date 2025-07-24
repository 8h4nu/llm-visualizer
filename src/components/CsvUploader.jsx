import React from "react";
import Papa from "papaparse";

export default function CsvUploader({ onDataParsed }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        onDataParsed(results.data);
      },
    });
  };

  return (
    <div className="p-4">
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
}
