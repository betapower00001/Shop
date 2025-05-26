// src/app/admin/users/page.tsx
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { User } from '@prisma/client'

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    redirect('/403')
  }

  const users: User[] = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">ผู้ใช้งาน</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">User ID</th>
            <th className="py-2 px-4 border-b">ชื่อ</th>
            <th className="py-2 px-4 border-b">อีเมล</th>
            <th className="py-2 px-4 border-b">วันที่สมัคร</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.name ?? '-'}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">
                {new Date(user.createdAt).toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
