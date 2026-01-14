import React from "react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#111",
        color: "#ccc",
        textAlign: "center",
        padding: "40px 20px",
        marginTop: "60px",
      }}
    >
      <p style={{ marginBottom: "15px" }}>
        © 2025 Kybrak Motors. Все права защищены.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px"}}>
        <Link to="/privacy" style={footerLink}>Политика конфиденциальности</Link>
        <Link to="/terms" style={footerLink}>Условия использования</Link>
      </div>
    </footer>
  )
}

const footerLink = {
  color: "#f5c518",
  textDecoration: "none",
  fontSize: "0.9rem",
}
