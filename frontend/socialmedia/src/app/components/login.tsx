'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  if (localStorage.getItem('access')) {
    router.push('/posts');
  }

  const goToRegister = async () => {

    router.push('/register');

  }

  const handleLogin = async () => {

    try {

      const response = await api.post('http://localhost:8000/api/token/', {
        username,
        password,
      });

      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;

      localStorage.setItem('access', `Bearer ${accessToken}`);
      localStorage.setItem('refresh', `Bearer ${refreshToken}`);

      router.push('/posts');

    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        alert(`Error ${error.status}`);
      }
    }
  };

  return (
    <div className="pt-6 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
        Login
      </button>
    </div>
  );
}
