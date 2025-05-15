'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) router.push('/');
    else setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>เข้าสู่ระบบ</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">เข้าสู่ระบบ</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
