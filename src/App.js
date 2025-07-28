import React, { useState, useEffect, useRef } from "react";
import CsvUploader from "./components/CsvUploader";
import VisualizationRenderer from "./components/VisualizationRenderer";
import TableView from "./components/TableView";

function App() {
  const [csvData, setCsvData] = useState([]);
  const [xKey, setXKey] = useState("");
  const [yKey, setYKey] = useState("");
  const [selectedCharts, setSelectedCharts] = useState([]);

  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  const chartRefs = useRef({});
  const [lastAddedChart, setLastAddedChart] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleDataParsed = (data) => {
    setCsvData(data);

    const keys = data.length > 0 ? Object.keys(data[0]) : [];
    setXKey(keys[0] || "");
    setYKey(keys[1] || "");

    setSelectedCharts([]);
  };


  const keys = csvData.length > 0 ? Object.keys(csvData[0]) : [];

  const chartTypes = ["line", "bar", "pie", "area", "scatter", "radar", "composed"];

  const handleChartSelect = (chart) => {
    if (!selectedCharts.includes(chart)) {
      setSelectedCharts((prev) => [...prev, chart]);
      setLastAddedChart(chart);
    }
  };

  // Scroll to newly added chart
  useEffect(() => {
    if (lastAddedChart && chartRefs.current[lastAddedChart]) {
      chartRefs.current[lastAddedChart].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setLastAddedChart(null);
    }
  }, [lastAddedChart]);

  return (
    <div className="p-4 pb-36 space-y-6 min-h-screen bg-background text-foreground transition-colors">
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
          <TableView data={csvData} />

          <div className="mt-4 space-y-2">
            <h2 className="font-semibold">Select Chart to Visualize</h2>
            <div className="flex flex-wrap gap-2">
              {chartTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleChartSelect(type)}
                  className={`px-3 py-1 rounded text-sm transition ${
                    selectedCharts.includes(type)
                      ? "bg-purple-400 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {selectedCharts.length > 0 && (
            <div className="mt-6 space-y-6">
              <div className="flex gap-4 items-center flex-wrap">
                <label>X-Axis:</label>
                <select
                  value={xKey}
                  onChange={(e) => setXKey(e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  <option value="">Select X</option>
                  {keys.map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>

                <label>Y-Axis:</label>
                <select
                  value={yKey}
                  onChange={(e) => setYKey(e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  <option value="">Select Y</option>
                  {keys.map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>

              {selectedCharts.map((type) => (
                  <div
                    key={type}
                    ref={(el) => (chartRefs.current[type] = el)}
                    className="border p-4 rounded shadow-sm bg-white"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-md font-semibold">{type.toUpperCase()} Chart</h3>
                      <div className="flex gap-2">
                        <button
                          title="Download chart as image"
                          onClick={async () => {
                            const chartNode = chartRefs.current[type];
                            if (chartNode) {
                              const html2canvas = (await import("html2canvas")).default;
                              html2canvas(chartNode).then((canvas) => {
                                const link = document.createElement("a");
                                link.download = `${type}_chart.png`;
                                link.href = canvas.toDataURL("image/png");
                                link.click();
                              });
                            }
                          }}
                          className="text-green-600 hover:text-green-800 text-sm"
                        >
                          📥
                        </button>

                        <button
                          onClick={() =>
                            setSelectedCharts((prev) => prev.filter((chart) => chart !== type))
                          }
                          className="text-red-500 hover:text-red-700 text-sm"
                          title="Remove chart"
                        >
                          ❌
                        </button>
                      </div>
                    </div>

                    <VisualizationRenderer
                      data={csvData}
                      chartType={type}
                      xKey={xKey}
                      yKey={yKey}
                    />
                  </div>
                ))}

            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
