import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label,
} from "recharts";

export default function BarChartView({ data, xKey, yKey }) {
  if (!data || data.length === 0) return <p>No data to display</p>;

  const keys = Object.keys(data[0] || {});
  const x = xKey || keys[0];
  const y = yKey || keys[1];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        
        <XAxis dataKey={x}>
          <Label value={x} offset={-5} position="insideBottom" />
        </XAxis>
        
        <YAxis>
          <Label
            value={y}
            angle={-90}
            position="insideLeft"
            style={{ textAnchor: "middle" }}
          />
        </YAxis>

        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        
        <Bar dataKey={y} fill="#8237bb" />
      </BarChart>
    </ResponsiveContainer>
  );
}
