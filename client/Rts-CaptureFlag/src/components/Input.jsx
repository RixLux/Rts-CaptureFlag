export default function Input({ label, type, value, onChange }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginTop: "4px",
          borderRadius: "6px",
        }}
      />
    </div>
  );
}
