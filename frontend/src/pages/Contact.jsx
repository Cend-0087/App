import React from "react"

export default function Contact() {
  return (
    <div style={pageStyle}>
      <h1>Контакты</h1>
      <p>Свяжитесь с нами по любым вопросам — мы всегда рады помочь!</p>

      <div style={{ marginTop: "20px" }}>
        <p><strong>Телефон:</strong> +7 (495) 123-45-67</p>
        <p><strong>Email:</strong> support@auroramotors.com</p>
        <p><strong>Адрес:</strong> Москва, ул. Инноваций, 15, офис 204</p>
      </div>

      <h2 style={{ marginTop: "40px" }}>Форма обратной связи</h2>
      <form style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input type="text" placeholder="Ваше имя" required style={inputStyle} />
        <input type="email" placeholder="Email" required style={inputStyle} />
        <textarea placeholder="Сообщение" rows="4" style={inputStyle}></textarea>
        <button type="submit" style={btnStyle}>Отправить</button>
      </form>
    </div>
  )
}

const pageStyle = {
  maxWidth: "800px",
  margin: "40px auto",
  lineHeight: "1.7",
  color: "#222",
}

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
}

const btnStyle = {
  padding: "10px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#f5c518",
  color: "#111",
  fontWeight: "bold",
  cursor: "pointer",
}
