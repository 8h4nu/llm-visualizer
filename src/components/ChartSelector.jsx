export default function ChartSelector({ chartType, setChartType }) {
  const chartOptions = ["Select Type","table", "line", "bar", "pie", "area", "scatter", "radar", "composed"];
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>Select Visualization: </label>
      <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
        {chartOptions.map((option) => (
          <option key={option} value={option}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
