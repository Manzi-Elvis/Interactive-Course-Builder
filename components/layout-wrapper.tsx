"use client"

import type React from "react"

import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <Topbar />
      <main className="flex-1 md:ml-64 mt-16 p-4 md:p-8">{children}</main>
    </div>
  )
}
