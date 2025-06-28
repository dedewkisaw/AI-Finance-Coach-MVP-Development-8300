import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import { useRole } from '../../contexts/RoleContext'
import UserManagement from './UserManagement'
import RoleManagement from './RoleManagement'
import SystemAnalytics from './SystemAnalytics'
import SystemSettings from './SystemSettings'

const { FiUsers, FiShield, FiBarChart3, FiSettings, FiActivity } = FiIcons

const AdminDashboard = () => {
  const { userRole, hasPermission } = useRole()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({
    totalUsers: 1247,
    premiumUsers: 324,
    freeUsers: 923,
    monthlyRevenue: 3218,
    activeUsers: 892,
    supportTickets: 23
  })

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: FiActivity,
      permission: 'view_analytics'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: FiUsers,
      permission: 'manage_users'
    },
    {
      id: 'roles',
      label: 'Role Management',
      icon: FiShield,
      permission: 'manage_roles'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: FiBarChart3,
      permission: 'view_analytics'
    },
    {
      id: 'settings',
      label: 'System Settings',
      icon: FiSettings,
      permission: 'manage_system_settings'
    }
  ]

  const visibleTabs = tabs.filter(tab => hasPermission(tab.permission))

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview stats={stats} />
      case 'users':
        return <UserManagement />
      case 'roles':
        return <RoleManagement />
      case 'analytics':
        return <SystemAnalytics />
      case 'settings':
        return <SystemSettings />
      default:
        return <AdminOverview stats={stats} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage users, roles, and system settings - {userRole.name} Access
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            {visibleTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <SafeIcon icon={tab.icon} className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  )
}

// Admin Overview Component
const AdminOverview = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      change: '+12%',
      changeType: 'positive',
      icon: FiUsers
    },
    {
      title: 'Premium Users',
      value: stats.premiumUsers.toLocaleString(),
      change: '+8%',
      changeType: 'positive',
      icon: FiShield
    },
    {
      title: 'Monthly Revenue',
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      change: '+15%',
      changeType: 'positive',
      icon: FiBarChart3
    },
    {
      title: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      change: '+5%',
      changeType: 'positive',
      icon: FiActivity
    }
  ]

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className={`flex items-center mt-2 text-sm ${
                  stat.changeType === 'positive' ? 'text-success-600' : 'text-danger-600'
                }`}>
                  <span>{stat.change}</span>
                  <span className="text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={stat.icon} className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'New user registration', user: 'john.doe@email.com', time: '2 minutes ago' },
            { action: 'Premium subscription activated', user: 'sarah.wilson@email.com', time: '15 minutes ago' },
            { action: 'Support ticket created', user: 'mike.johnson@email.com', time: '1 hour ago' },
            { action: 'User role updated to Admin', user: 'admin@financeai.com', time: '2 hours ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
              <div>
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.user}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard