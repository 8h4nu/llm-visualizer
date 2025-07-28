import { useEffect } from "react";

export default function ColumnSelector({ label, keys, selectedKey, setSelectedKey, defaultIndex = 0 }) {
  // Set default selection on first render if no key selected yet
  useEffect(() => {
    if (!selectedKey && keys.length > defaultIndex) {
      setSelectedKey(keys[defaultIndex]);
    }
  }, [keys, selectedKey, setSelectedKey, defaultIndex]);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ marginRight: "0.5rem" }}>{label}:</label>
      <select value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)}>
        {keys.map((key) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>
    </div>
  );
}
