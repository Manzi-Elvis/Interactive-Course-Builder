"use client"

import { XIcon, DownloadIcon } from "./simple-icons"
import { useState } from "react"

interface ExportModalProps {
  isOpen: boolean
  courseTitle: string
  onClose: () => void
}

export function ExportModal({ isOpen, courseTitle, onClose }: ExportModalProps) {
  const [copied, setCopied] = useState(false)
  const [exportFormat, setExportFormat] = useState<"html" | "json" | "pdf">("html")

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const timestamp = new Date().toLocaleString()
    const content = {
      course: courseTitle,
      exported: timestamp,
      format: exportFormat,
    }

    const dataStr = JSON.stringify(content, null, 2)
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(dataStr))
    element.setAttribute(
      "download",
      `${courseTitle.toLowerCase().replace(/\s+/g, "-")}.${exportFormat === "html" ? "html" : "json"}`,
    )
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-md shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold">Export Course</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
            <XIcon size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Format selection */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Export Format</label>
            <div className="space-y-2">
              {[
                { value: "html", label: "HTML (Static)", description: "Standalone HTML page" },
                { value: "json", label: "JSON", description: "Structured data format" },
                { value: "pdf", label: "PDF", description: "Printable document" },
              ].map((format) => (
                <button
                  key={format.value}
                  onClick={() => setExportFormat(format.value as typeof exportFormat)}
                  className={`w-full p-3 rounded-lg border transition-all text-left ${
                    exportFormat === format.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <p className="font-medium text-foreground">{format.label}</p>
                  <p className="text-xs text-muted-foreground">{format.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-xs font-semibold text-muted-foreground mb-2">PREVIEW</p>
            <p className="text-sm font-mono text-foreground">
              {courseTitle.toLowerCase().replace(/\s+/g, "-")}.{exportFormat === "html" ? "html" : "json"}
            </p>
          </div>

          {/* Info */}
          <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-foreground">
              Your course will be packaged with all lessons, quizzes, and resources into a single{" "}
              {exportFormat.toUpperCase()} file.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-border">
          <button onClick={onClose} className="btn-ghost flex-1">
            Cancel
          </button>
          <button onClick={handleDownload} className="btn-primary flex-1 flex items-center justify-center gap-2">
            <DownloadIcon size={18} />
            Download
          </button>
        </div>
      </div>
    </div>
  )
}
