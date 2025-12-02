"use client"

import type React from "react"

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  trend?: { value: number; isPositive: boolean }
}

export function StatsCard({ title, value, subtitle, icon, trend }: StatsCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-card-foreground">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          {trend && (
            <p
              className={`text-xs font-semibold ${trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
            >
              {trend.isPositive ? "+" : "-"}
              {trend.value}%
            </p>
          )}
        </div>
        {icon && (
          <div className="p-3 rounded-lg bg-primary/10">
            <div className="text-primary">{icon}</div>
          </div>
        )}
      </div>
    </div>
  )
}
