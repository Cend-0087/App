import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto mt-20 bg-gray-800 text-white p-8 rounded-xl">
      <h2 className="text-3xl font-bold mb-6">Личный кабинет</h2>
      <p><strong>Имя:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Роль:</strong> {user.role}</p>
    </div>
  );
}
