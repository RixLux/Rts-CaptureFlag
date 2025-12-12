export default function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "10px",
        marginTop: "10px",
        borderRadius: "6px",
        cursor: "pointer",
        background: "#4D7CFE",
        color: "white",
        border: "none",
      }}
    >
      {text}
    </button>
  );
}
