import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      setMsg(data.message || data.error);
    } catch (err) {
      setMsg("Something went wrong...");
    }
  };

  return (
    <div style={{ width: "300px", margin: "0 auto" }}>
      <h2>Create Account</h2>

      <Input label="Username" type="text" value={username} onChange={setUsername} />
      <Input label="Email" type="email" value={email} onChange={setEmail} />
      <Input label="Password" type="password" value={password} onChange={setPassword} />

      <Button text="Register" onClick={handleRegister} />

      <p style={{ marginTop: "10px" }}>{msg}</p>

      {/* Link to Login */}
      <p style={{ marginTop: "10px" }}>
        Already have an account?{" "}
        <Link to="/">Login here</Link>
      </p>
    </div>
  );
}
