const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { nanoid } = require("nanoid")
const { db } = require("../db")

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret"

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ message: "Email и пароль обязательны" })

    await db.read()
    const exists = db.data.users.find(u => u.email === email)
    if (exists)
      return res.status(400).json({ message: "Email уже занят" })

    const hash = bcrypt.hashSync(password, 8)
    const user = { id: nanoid(), name: name || "User", email, password_hash: hash, role: "user" }

    db.data.users.push(user)
    await db.write()

    res.status(201).json({ 
      message: "Пользователь создан", 
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    })
  } catch (e) {
    console.error("Ошибка регистрации:", e)
    res.status(500).json({ message: "Ошибка сервера" })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ message: "Email и пароль обязательны" })

    await db.read()
    const user = db.data.users.find(u => u.email === email)
    if (!user)
      return res.status(401).json({ message: "Неверные данные" })

    const ok = bcrypt.compareSync(password, user.password_hash)
    if (!ok)
      return res.status(401).json({ message: "Неверный пароль" })

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" })
    res.json({ 
      message: "Вход успешен", 
      token, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    })
  } catch (e) {
    console.error("Ошибка входа:", e)
    res.status(500).json({ message: "Ошибка сервера" })
  }
})

router.get("/me", async (req, res) => {
  try {
    const header = req.headers.authorization
    if (!header)
      return res.status(401).json({ message: "Нет токена" })

    const token = header.split(" ")[1]
    const data = jwt.verify(token, JWT_SECRET)

    await db.read()
    const user = db.data.users.find(u => u.id === data.id)
    if (!user)
      return res.status(404).json({ message: "Пользователь не найден" })

    res.json({ id: user.id, name: user.name, email: user.email, role: user.role })
  } catch (e) {
    console.error("Ошибка токена:", e)
    res.status(401).json({ message: "Неверный токен" })
  }
})

module.exports = router
