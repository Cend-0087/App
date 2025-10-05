import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Ошибка регистрации")
      alert("Регистрация успешна!")
      navigate("/login")
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div style={pageStyle}>
      <h1>Регистрация</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} style={formStyle}>
        <input type="text" placeholder="Имя" value={name} onChange={e => setName(e.target.value)} required style={inputStyle} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
        <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
        <button type="submit" style={btnStyle}>Зарегистрироваться</button>
      </form>
    </div>
  )
}

const pageStyle = { maxWidth: "400px", margin: "50px auto", lineHeight: 1.6, color: "#222" }
const formStyle = { display: "flex", flexDirection: "column", gap: "12px" }
const inputStyle = { padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }
const btnStyle = { padding: "10px", borderRadius: "8px", border: "none", backgroundColor: "#f5c518", color: "#111", fontWeight: "bold", cursor: "pointer" }
