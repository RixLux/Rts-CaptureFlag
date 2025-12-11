import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.token) {
        setMsg("Login success!");
        localStorage.setItem("token", data.token);
      } else {
        setMsg(data.message || data.error);
      }
    } catch (err) {
      setMsg("Something went wrong...");
    }
  };

  return (
    <div style={{ width: "300px", margin: "0 auto" }}>
      <h2>Login</h2>

      <Input label="Email" type="email" value={email} onChange={setEmail} />
      <Input label="Password" type="password" value={password} onChange={setPassword} />

      <Button text="Login" onClick={handleLogin} />

      <p style={{ marginTop: "10px" }}>{msg}</p>

      {/* Link to Register */}
      <p style={{ marginTop: "10px" }}>
        Don't have an account?{" "}
        <Link to="/register">Create one</Link>
      </p>
    </div>
  );
}
