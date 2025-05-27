"use client"

import { redirect } from "next/navigation"

export default function DashboardPage() {
  // Redirect to the dashboard/home page
  redirect('/dashboard/home')
}
