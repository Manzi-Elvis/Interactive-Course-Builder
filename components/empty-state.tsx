"use client"

import type React from "react"

import { Plus } from "lucide-react"

interface EmptyStateProps {
  title: string
  description: string
  icon: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="p-4 rounded-full bg-muted mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-foreground mb-2 text-center">{title}</h3>
      <p className="text-muted-foreground text-center max-w-sm mb-6">{description}</p>
      {action && (
        <button onClick={action.onClick} className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          {action.label}
        </button>
      )}
    </div>
  )
}
