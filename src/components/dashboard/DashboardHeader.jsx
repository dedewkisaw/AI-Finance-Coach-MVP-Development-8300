import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import { useAuth } from '../../contexts/AuthContext'
import { useFinance } from '../../contexts/FinanceContext'
import ProfileModal from './ProfileModal'
import BillingModal from './BillingModal'
import HelpModal from './HelpModal'

const { FiDollarSign, FiUser, FiLogOut, FiBell, FiSettings, FiChevronDown, FiCreditCard, FiHelpCircle } = FiIcons

const DashboardHeader = () => {
  const { user, logout } = useAuth()
  const { isPremium } = useFinance()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showBillingModal, setShowBillingModal] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)

  const notifications = [
    {
      id: 1,
      type: 'warning',
      message: 'You\'ve exceeded your dining budget by $43',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'success',
      message: 'Monthly savings goal achieved!',
      time: '1 day ago'
    },
    {
      id: 3,
      type: 'info',
      message: 'New AI insight available',
      time: '2 days ago'
    }
  ]

  const closeAllMenus = () => {
    setShowNotifications(false)
    setShowSettings(false)
    setShowUserMenu(false)
  }

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications)
    setShowSettings(false)
    setShowUserMenu(false)
  }

  const handleSettingsClick = () => {
    setShowSettings(!showSettings)
    setShowNotifications(false)
    setShowUserMenu(false)
  }

  const handleUserMenuClick = () => {
    setShowUserMenu(!showUserMenu)
    setShowNotifications(false)
    setShowSettings(false)
  }

  const handleProfileClick = () => {
    setShowProfileModal(true)
    closeAllMenus()
  }

  const handleBillingClick = () => {
    setShowBillingModal(true)
    closeAllMenus()
  }

  const handleHelpClick = () => {
    setShowHelpModal(true)
    closeAllMenus()
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiDollarSign} className="w-8 h-8 text-primary-500" />
              <span className="text-xl font-bold text-gray-900">FinanceAI</span>
              {isPremium && (
                <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                  Premium
                </span>
              )}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={handleNotificationClick}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative"
                >
                  <SafeIcon icon={FiBell} className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-danger-500 rounded-full"></span>
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                    >
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                            <p className="text-sm text-gray-900">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        ))}
                      </div>
                      <div className="p-4">
                        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                          View all notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Settings */}
              <div className="relative">
                <button
                  onClick={handleSettingsClick}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <SafeIcon icon={FiSettings} className="w-5 h-5" />
                </button>

                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                    >
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">Settings</h3>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={handleProfileClick}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2"
                        >
                          <SafeIcon icon={FiUser} className="w-4 h-4" />
                          <span>Account Settings</span>
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                          Notification Preferences
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                          Privacy Settings
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                          Connected Banks
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                          Export Data
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={handleUserMenuClick}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiUser} className="w-4 h-4 text-primary-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {user?.email?.split('@')[0] || 'User'}
                  </span>
                  <SafeIcon icon={FiChevronDown} className="w-4 h-4 text-gray-400" />
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                    >
                      <div className="p-4 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.email?.split('@')[0] || 'User'}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                        {isPremium && (
                          <span className="inline-block mt-1 bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-medium">
                            Premium
                          </span>
                        )}
                      </div>
                      <div className="p-2">
                        <button
                          onClick={handleProfileClick}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2"
                        >
                          <SafeIcon icon={FiUser} className="w-4 h-4" />
                          <span>Profile</span>
                        </button>
                        <button
                          onClick={handleBillingClick}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2"
                        >
                          <SafeIcon icon={FiCreditCard} className="w-4 h-4" />
                          <span>Billing</span>
                        </button>
                        <button
                          onClick={handleHelpClick}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2"
                        >
                          <SafeIcon icon={FiHelpCircle} className="w-4 h-4" />
                          <span>Help & Support</span>
                        </button>
                        <div className="border-t border-gray-200 mt-2 pt-2">
                          <button
                            onClick={logout}
                            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center space-x-2"
                          >
                            <SafeIcon icon={FiLogOut} className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      <ProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
      <BillingModal isOpen={showBillingModal} onClose={() => setShowBillingModal(false)} />
      <HelpModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />
    </>
  )
}

export default DashboardHeader