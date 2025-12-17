import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminIndexPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;

  // If logged in, redirect to dashboard; otherwise redirect to login
  if (token) {
    redirect('/admin/dashboard');
  }
  redirect('/admin/login');
}
