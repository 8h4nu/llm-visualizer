import React, { useState } from "react";
import Papa from "papaparse";

export default function CsvUploader({ onDataParsed }) {
  const [filePath, setFilePath] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(filePath);
      const text = await response.text();
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          onDataParsed(results.data);
        },
      });
    } catch (error) {
      console.error("Error fetching CSV file:", error);
      alert("Failed to load CSV. Make sure the path is correct and served from /public.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 flex gap-2 shadow-md z-50"
    >
      <input
        type="text"
        placeholder="Enter CSV path (e.g., /data/sample.csv)"
        value={filePath}
        onChange={(e) => setFilePath(e.target.value)}
        className="flex-1 border rounded px-3 py-2 text-sm"
      />
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800 text-sm"
      >
        Load CSV
      </button>
    </form>
  );
}
