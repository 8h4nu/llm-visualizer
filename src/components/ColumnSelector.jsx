export default function ColumnSelector({ label, keys, selectedKey, setSelectedKey }) {
  return (
    <div>
      <label>{label}:</label>
      <select value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)}>
        <option value="">Select column</option>
        {keys.map((key) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>
    </div>
  );
}
