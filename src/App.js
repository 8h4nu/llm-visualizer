import React, { useState, useEffect } from "react";
import CsvUploader from "./components/CsvUploader";
import ChartSelector from "./components/ChartSelector";
import ColumnSelector from "./components/ColumnSelector";
import VisualizationRenderer from "./components/VisualizationRenderer";

function App() {
  const [csvData, setCsvData] = useState([]);
  const [xKey, setXKey] = useState("");
  const [yKey, setYKey] = useState("");
  const [chartType, setChartType] = useState("table");

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const handleDataParsed = (data) => {
    setCsvData(data);
    setXKey("");
    setYKey("");
  };

  const keys = csvData.length > 0 ? Object.keys(csvData[0]) : [];

  return (
    <div className="p-4 space-y-4 min-h-screen bg-background text-foreground transition-colors">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">CSV Data Visualizer</h1>
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded bg-purple-600 text-white hover:bg-purple-800 transition"
        >
          Toggle {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>

      <CsvUploader onDataParsed={handleDataParsed} />

      {csvData.length > 0 && (
        <>
          <ChartSelector chartType={chartType} setChartType={setChartType} />
          <ColumnSelector label="X-Axis Key" keys={keys} selectedKey={xKey} setSelectedKey={setXKey} />
          <ColumnSelector label="Y-Axis Key" keys={keys} selectedKey={yKey} setSelectedKey={setYKey} />
          <VisualizationRenderer data={csvData} xKey={xKey} yKey={yKey} chartType={chartType} />
        </>
      )}
    </div>
  );
}

export default App;
