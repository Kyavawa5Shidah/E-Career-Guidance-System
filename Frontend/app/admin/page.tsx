"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { BarChart2, Bell, ChevronDown, Home, LogOut, PieChart, Settings, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Add this interface at the top of the file
interface SidebarLinkProps {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-primary">ECGS Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <SidebarLink
            icon={<Home size={20} />}
            label="Dashboard"
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          />
          <SidebarLink
            icon={<Users size={20} />}
            label="Users"
            active={activeTab === "users"}
            onClick={() => setActiveTab("users")}
          />
          <SidebarLink
            icon={<BarChart2 size={20} />}
            label="Analytics"
            active={activeTab === "analytics"}
            onClick={() => setActiveTab("analytics")}
          />
          <SidebarLink
            icon={<Settings size={20} />}
            label="Settings"
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          />
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link href="/logout">
              <LogOut size={20} className="mr-2" />
              Logout
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-gray-500">Monitor system performance and user engagement</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <Button variant="outline" size="icon">
                  <Bell size={20} />
                </Button>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                    <User size={16} className="text-primary" />
                  </div>
                  <span className="font-medium mr-1">Admin</span>
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <div className="flex items-center mt-1 text-sm">
                  <span className="text-green-500 mr-1">+12%</span>
                  <span className="text-gray-500">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Active Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">856</div>
                <div className="flex items-center mt-1 text-sm">
                  <span className="text-green-500 mr-1">+8%</span>
                  <span className="text-gray-500">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Job Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">432</div>
                <div className="flex items-center mt-1 text-sm">
                  <span className="text-green-500 mr-1">+15%</span>
                  <span className="text-gray-500">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">System Uptime</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.8%</div>
                <div className="flex items-center mt-1 text-sm">
                  <span className="text-green-500 mr-1">+0.2%</span>
                  <span className="text-gray-500">from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="users">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="users">User Analytics</TabsTrigger>
              <TabsTrigger value="careers">Career Trends</TabsTrigger>
              <TabsTrigger value="system">System Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Registration</CardTitle>
                    <CardDescription>New user registrations over time</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <div className="w-full h-full flex items-center justify-center">
                      <BarChart2 className="h-40 w-40 text-gray-300" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>User Demographics</CardTitle>
                    <CardDescription>Breakdown of user age groups</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <div className="w-full h-full flex items-center justify-center">
                      <PieChart className="h-40 w-40 text-gray-300" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent User Activity</CardTitle>
                  <CardDescription>Latest actions taken by users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">John Doe</h3>
                          <p className="text-sm text-gray-500">Completed Technical Skills Assessment</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">2 hours ago</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Sarah Johnson</h3>
                          <p className="text-sm text-gray-500">Applied for Frontend Developer position</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">5 hours ago</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Michael Smith</h3>
                          <p className="text-sm text-gray-500">Started Web Development course</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">1 day ago</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Emily Davis</h3>
                          <p className="text-sm text-gray-500">Updated career preferences</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">1 day ago</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="careers" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Career Paths</CardTitle>
                    <CardDescription>Most recommended career paths</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Software Developer</span>
                          <span className="text-sm text-gray-500">32%</span>
                        </div>
                        <Progress value={32} />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Data Analyst</span>
                          <span className="text-sm text-gray-500">24%</span>
                        </div>
                        <Progress value={24} />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">UX Designer</span>
                          <span className="text-sm text-gray-500">18%</span>
                        </div>
                        <Progress value={18} />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Digital Marketer</span>
                          <span className="text-sm text-gray-500">15%</span>
                        </div>
                        <Progress value={15} />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Project Manager</span>
                          <span className="text-sm text-gray-500">11%</span>
                        </div>
                        <Progress value={11} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Job Market Trends</CardTitle>
                    <CardDescription>Emerging job opportunities</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <div className="w-full h-full flex items-center justify-center">
                      <BarChart2 className="h-40 w-40 text-gray-300" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Skill Gap Analysis</CardTitle>
                  <CardDescription>Most common skill gaps identified</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">React.js</span>
                        <span className="text-sm text-gray-500">42%</span>
                      </div>
                      <Progress value={42} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Data Analysis</span>
                        <span className="text-sm text-gray-500">38%</span>
                      </div>
                      <Progress value={38} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">UI/UX Design</span>
                        <span className="text-sm text-gray-500">35%</span>
                      </div>
                      <Progress value={35} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Cloud Computing</span>
                        <span className="text-sm text-gray-500">30%</span>
                      </div>
                      <Progress value={30} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Project Management</span>
                        <span className="text-sm text-gray-500">25%</span>
                      </div>
                      <Progress value={25} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Performance</CardTitle>
                    <CardDescription>Response time and server load</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <div className="w-full h-full flex items-center justify-center">
                      <BarChart2 className="h-40 w-40 text-gray-300" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>AI Model Accuracy</CardTitle>
                    <CardDescription>Career recommendation precision</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Overall Accuracy</span>
                          <span className="text-sm text-gray-500">87%</span>
                        </div>
                        <Progress value={87} className="bg-green-100" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Technical Careers</span>
                          <span className="text-sm text-gray-500">92%</span>
                        </div>
                        <Progress value={92} className="bg-green-100" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Creative Careers</span>
                          <span className="text-sm text-gray-500">84%</span>
                        </div>
                        <Progress value={84} className="bg-green-100" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Business Careers</span>
                          <span className="text-sm text-gray-500">85%</span>
                        </div>
                        <Progress value={85} className="bg-green-100" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>System Logs</CardTitle>
                  <CardDescription>Recent system activities and errors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-green-600">System Update Completed</h3>
                        <p className="text-sm text-gray-500">AI model updated to version 2.4.1</p>
                      </div>
                      <div className="text-sm text-gray-500">2 hours ago</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-amber-600">Database Maintenance</h3>
                        <p className="text-sm text-gray-500">Scheduled maintenance completed</p>
                      </div>
                      <div className="text-sm text-gray-500">1 day ago</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-red-600">Error Alert</h3>
                        <p className="text-sm text-gray-500">Job API integration timeout (resolved)</p>
                      </div>
                      <div className="text-sm text-gray-500">2 days ago</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-green-600">New Feature Deployed</h3>
                        <p className="text-sm text-gray-500">Enhanced skill assessment module</p>
                      </div>
                      <div className="text-sm text-gray-500">3 days ago</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

// Update the SidebarLink component at the bottom of the file
function SidebarLink({ icon, label, active, onClick }: SidebarLinkProps) {
  return (
    <button
      className={`flex items-center w-full px-3 py-2 rounded-md text-left ${
        active ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </button>
  )
}

