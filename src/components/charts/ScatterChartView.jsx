import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ScatterChartView({ data, xKey, yKey }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart>
        <CartesianGrid />
        <XAxis dataKey={xKey} name={xKey} />
        <YAxis dataKey={yKey} name={yKey} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Data Points" data={data} fill="#82ca9d" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
