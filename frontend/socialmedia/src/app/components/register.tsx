'use client';

import { useRouter } from 'next/navigation';
import { useState } from "react";
import api from '@/lib/api';

export default function Register() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const router = useRouter();

  const handleRegister = async () => {

    try {

      const response = await api.post('http://localhost:8000/api/register/', {
        username,
        email,
        password,
        password2
      });

      setUsername("");
      setEmail("");
      setPassword("");
      setPassword2("");

      alert("Registration successful");

    } catch (error) {
      console.log("Error", error);
      if (error.code === "ERR_BAD_REQUEST") {
        alert(JSON.stringify(error.response.data));
      }
    }
  };

  return (
    <div className="pt-6 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign up</h1>
      <input
        type="text"
        placeholder="Choose username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <input
        type="password"
        placeholder="Password again"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 rounded">
        Sign up
      </button>
    </div>
  );

  }