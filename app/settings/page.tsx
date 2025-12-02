"use client"

import type React from "react"

import { LayoutWrapper } from "@/components/layout-wrapper"
import { Save, Key, Bell, Lock, User, Building } from "lucide-react"
import { useState } from "react"

interface SettingsSectionProps {
  title: string
  description: string
  icon: React.ReactNode
  children: React.ReactNode
}

function SettingsSection({ title, description, icon, children }: SettingsSectionProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-4">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">{icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
      <div className="pt-4">{children}</div>
    </div>
  )
}

export default function Settings() {
  const [settings, setSettings] = useState({
    instructorName: "Alex Johnson",
    email: "alex@example.com",
    organization: "Tech Academy",
    language: "English",
    timezone: "UTC-05:00",
    emailNotifications: true,
    courseUpdates: true,
    newStudents: false,
    twoFactor: false,
    publicProfile: true,
  })

  const handleChange = (key: keyof typeof settings, value: any) => {
    setSettings({ ...settings, [key]: value })
  }

  const handleSave = () => {
    alert("Settings saved successfully!")
  }

  return (
    <LayoutWrapper>
      <div className="space-y-8 max-w-3xl">
        {/* Header */}
        <div>
          <h1 className="section-title">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Profile Settings */}
        <SettingsSection
          title="Profile Information"
          description="Update your personal information and profile details"
          icon={<User size={24} />}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Instructor Name</label>
              <input
                type="text"
                value={settings.instructorName}
                onChange={(e) => handleChange("instructorName", e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Organization</label>
              <input
                type="text"
                value={settings.organization}
                onChange={(e) => handleChange("organization", e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        </SettingsSection>

        {/* Preferences */}
        <SettingsSection
          title="Preferences"
          description="Customize your learning platform experience"
          icon={<Building size={24} />}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Language</label>
              <select
                value={settings.language}
                onChange={(e) => handleChange("language", e.target.value)}
                className="input-field"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => handleChange("timezone", e.target.value)}
                className="input-field"
              >
                <option>UTC-05:00 (Eastern)</option>
                <option>UTC-06:00 (Central)</option>
                <option>UTC-07:00 (Mountain)</option>
                <option>UTC-08:00 (Pacific)</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <label className="text-sm font-medium text-foreground">Public Profile</label>
              <input
                type="checkbox"
                checked={settings.publicProfile}
                onChange={(e) => handleChange("publicProfile", e.target.checked)}
                className="w-5 h-5 rounded"
              />
            </div>
          </div>
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection
          title="Notifications"
          description="Control how and when you receive notifications"
          icon={<Bell size={24} />}
        >
          <div className="space-y-3">
            {[
              { key: "emailNotifications", label: "Email Notifications" },
              { key: "courseUpdates", label: "Course Updates" },
              { key: "newStudents", label: "New Student Enrollment" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <label className="text-sm font-medium text-foreground">{item.label}</label>
                <input
                  type="checkbox"
                  checked={settings[item.key as keyof typeof settings] as boolean}
                  onChange={(e) => handleChange(item.key as keyof typeof settings, e.target.checked)}
                  className="w-5 h-5 rounded"
                />
              </div>
            ))}
          </div>
        </SettingsSection>

        {/* Security */}
        <SettingsSection
          title="Security & Privacy"
          description="Manage your account security and authentication"
          icon={<Lock size={24} />}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground mt-1">Add extra security to your account</p>
              </div>
              <input
                type="checkbox"
                checked={settings.twoFactor}
                onChange={(e) => handleChange("twoFactor", e.target.checked)}
                className="w-5 h-5 rounded"
              />
            </div>
            <button className="w-full p-3 rounded-lg border border-border text-foreground hover:bg-muted transition-colors text-sm font-medium flex items-center justify-center gap-2">
              <Key size={18} />
              Change Password
            </button>
          </div>
        </SettingsSection>

        {/* Save button */}
        <div className="flex gap-3">
          <button onClick={handleSave} className="btn-primary flex items-center gap-2">
            <Save size={20} />
            <span>Save Settings</span>
          </button>
          <button className="btn-ghost">Cancel</button>
        </div>
      </div>
    </LayoutWrapper>
  )
}
