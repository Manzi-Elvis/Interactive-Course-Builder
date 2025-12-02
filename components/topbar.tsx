"use client"

import { MoonIcon, SunIcon, SearchIcon, BellIcon, UserIcon } from "./simple-icons"
import { useState, useEffect } from "react"

export function Topbar() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  const toggleDarkMode = () => {
    if (!mounted) return
    const newIsDark = !isDark
    setIsDark(newIsDark)
    if (newIsDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  if (!mounted) return null

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-background border-b border-border flex items-center justify-between px-6 z-30">
      {/* Search bar */}
      <div className="hidden sm:flex items-center gap-2 flex-1 max-w-md">
        <SearchIcon size={18} />
        <input
          type="text"
          placeholder="Search courses..."
          className="input-field flex-1 bg-muted border-0 focus:ring-1"
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? <SunIcon size={20} /> : <MoonIcon size={20} />}
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <BellIcon size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>

        {/* User menu */}
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-foreground">Alex Johnson</p>
            <p className="text-xs text-muted-foreground">Instructor</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 text-primary-foreground">
            <UserIcon size={20} />
          </div>
        </div>
      </div>
    </header>
  )
}
