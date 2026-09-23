import React from "react"
import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
// import TelegramIcon from "../components/TelegramIcon"
import ChatWidget from '../components/ChatWidget';  // путь поправь под свою структуру



export default function Layout() {
  return (
    <div className="app-layout" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      {/* Контент страницы */}
      <main style={{ flex: "1 0 auto" }}>
        <Outlet />
      </main>

      <Footer />

      {/* Иконка Telegram */}
      {/* <TelegramIcon /> */}
      <ChatWidget />

    </div>
  )
}
