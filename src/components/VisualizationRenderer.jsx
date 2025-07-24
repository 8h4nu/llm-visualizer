import TableView from "./TableView";
import LineChartView from "./charts/LineChartView";
import BarChartView from "./charts/BarChartView";
import PieChartView from "./charts/PieChartView";
import AreaChartView from "./charts/AreaChartView";
import ScatterChartView from "./charts/ScatterChartView";
import RadarChartView from "./charts/RadarChartView";
import ComposedChartView from "./charts/ComposedChartView";


export default function VisualizationRenderer({ data, chartType, xKey, yKey }) {
  if (!data || data.length === 0) return <div>No data available</div>;

  switch (chartType) {
  case "line":
    return <LineChartView data={data} xKey={xKey} yKey={yKey} />;
  case "bar":
    return <BarChartView data={data} xKey={xKey} yKey={yKey} />;
  case "pie":
    return <PieChartView data={data} nameKey={xKey} valueKey={yKey} />;
  case "area":
    return <AreaChartView data={data} xKey={xKey} yKey={yKey} />;
  case "scatter":
    return <ScatterChartView data={data} xKey={xKey} yKey={yKey} />;
  case "radar":
    return <RadarChartView data={data} xKey={xKey} yKey={yKey} />;
  case "composed":
    return <ComposedChartView data={data} xKey={xKey} yKey={yKey} />;
  default:
    return <TableView data={data} />;
}

}
