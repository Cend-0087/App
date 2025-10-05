import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Ошибка входа")

      // Сохраняем JWT в localStorage
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      alert("Вход выполнен успешно!")
      navigate("/profile")
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div style={pageStyle}>
      <h1>Вход</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" style={btnStyle}>Войти</button>
          <Link to="/register" style={registerBtnStyle}>Регистрация</Link>
        </div>
      </form>
    </div>
  )
}

// Стили
const pageStyle = { maxWidth: "400px", margin: "50px auto", lineHeight: 1.6, color: "#222" }
const formStyle = { display: "flex", flexDirection: "column", gap: "12px" }
const inputStyle = { padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }
const btnStyle = { padding: "10px", borderRadius: "8px", border: "none", backgroundColor: "#f5c518", color: "#111", fontWeight: "bold", cursor: "pointer", flex: 1 }
const registerBtnStyle = { padding: "10px", borderRadius: "8px", border: "1px solid #f5c518", color: "#f5c518", textDecoration: "none", textAlign: "center", flex: 1 }
