"use client"

import { LayoutWrapper } from "@/components/layout-wrapper"
import { CourseCard } from "@/components/course-card"
import { StatsCard } from "@/components/stats-card"
import { Plus, BookOpen, Users, TrendingUp, Zap } from "lucide-react"
import { useState } from "react"

// Sample data
const SAMPLE_COURSES = [
  {
    id: "1",
    title: "React Fundamentals",
    description: "Learn the basics of React including hooks, components, and state management.",
    lessons: 12,
    students: 234,
    duration: "4 hours",
    progress: 75,
    image: "/react-course.jpg",
  },
  {
    id: "2",
    title: "Web Design Mastery",
    description: "Master modern web design principles and create stunning user interfaces.",
    lessons: 18,
    students: 512,
    duration: "8 hours",
    progress: 45,
    image: "/design-course.jpg",
  },
  {
    id: "3",
    title: "TypeScript Advanced",
    description: "Advanced TypeScript concepts for professional developers.",
    lessons: 15,
    students: 189,
    duration: "6 hours",
    progress: 90,
    image: "/typescript-course.jpg",
  },
  {
    id: "4",
    title: "Node.js API Development",
    description: "Build scalable APIs with Node.js and Express framework.",
    lessons: 20,
    students: 401,
    duration: "10 hours",
    progress: 30,
    image: "/nodejs-course.jpg",
  },
  {
    id: "5",
    title: "UI/UX Design Principles",
    description: "Learn to design beautiful and functional user interfaces.",
    lessons: 14,
    students: 623,
    duration: "7 hours",
    progress: 60,
    image: "/ux-design-course.jpg",
  },
  {
    id: "6",
    title: "Database Design",
    description: "Master database design patterns and best practices.",
    lessons: 11,
    students: 156,
    duration: "5 hours",
    progress: 100,
    image: "/database-course.jpg",
  },
]

export default function Dashboard() {
  const [courses, setCourses] = useState(SAMPLE_COURSES)

  return (
    <LayoutWrapper>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="section-title">Dashboard</h1>
            <p className="text-muted-foreground">Manage and create your online courses</p>
          </div>
          <button className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
            <Plus size={20} />
            <span>New Course</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Courses"
            value={courses.length}
            subtitle="Active courses"
            icon={<BookOpen size={24} />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Total Students"
            value="2.3K"
            subtitle="Enrolled learners"
            icon={<Users size={24} />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Avg. Completion"
            value="64%"
            subtitle="Course average"
            icon={<TrendingUp size={24} />}
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Total Hours"
            value="48h"
            subtitle="Taught so far"
            icon={<Zap size={24} />}
            trend={{ value: 2, isPositive: false }}
          />
        </div>

        {/* Courses Grid */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Your Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
