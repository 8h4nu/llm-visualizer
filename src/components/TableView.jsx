import React, { useState, useEffect } from "react";
import "./TableView.scss";

export default function TableView({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState(1);
  const rowsPerPage = 20;

  const columns = data && data.length > 0 ? Object.keys(data[0]) : [];
  const totalPages = Math.ceil(data.length / rowsPerPage);

  useEffect(() => {
    setPageInput(currentPage);
  }, [currentPage]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (value) => {
    const page = parseInt(value);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    } else {
      setPageInput(currentPage); // Reset to current if invalid
    }
  };

  const downloadCSV = () => {
    const csvRows = [];

    // Headers
    csvRows.push(columns.join(","));

    // Rows
    data.forEach((row) => {
      const values = columns.map((col) => `"${(row[col] || "").toString().replace(/"/g, '""')}"`);
      csvRows.push(values.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "table-data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="table-container">
      <div className="table-scroll">
        <table className="ysentinal-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <div className="pagination-controls">
          <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page{" "}
            <input
              type="number"
              min={1}
              max={totalPages}
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              onBlur={() => handlePageChange(pageInput)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handlePageChange(pageInput);
              }}
              style={{ width: "50px", textAlign: "center", margin: "0 4px" }}
            />{" "}
            of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        <button className="download-btn" onClick={downloadCSV}>
          📥 Download CSV
        </button>
      </div>
    </div>
  );
}
