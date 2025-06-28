import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const RoleContext = createContext();

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

// Role definitions with permissions
export const ROLES = {
  SUPER_ADMIN: {
    id: 'super_admin',
    name: 'Super Admin',
    level: 100,
    permissions: [
      'manage_all_users',
      'manage_roles',
      'view_analytics',
      'manage_system_settings',
      'access_admin_panel',
      'manage_billing',
      'view_all_data',
      'export_data'
    ]
  },
  ADMIN: {
    id: 'admin',
    name: 'Admin',
    level: 80,
    permissions: [
      'manage_users',
      'view_analytics',
      'manage_settings',
      'access_admin_panel',
      'view_user_data',
      'export_data'
    ]
  },
  PREMIUM_USER: {
    id: 'premium_user',
    name: 'Premium User',
    level: 60,
    permissions: [
      'access_premium_features',
      'unlimited_ai_coaching',
      'advanced_analytics',
      'cashflow_predictions',
      'debt_optimization',
      'priority_support',
      'export_personal_data'
    ]
  },
  FREE_USER: {
    id: 'free_user',
    name: 'Free User',
    level: 20,
    permissions: [
      'basic_features',
      'limited_ai_coaching',
      'basic_analytics',
      'financial_health_score'
    ]
  },
  GUEST: {
    id: 'guest',
    name: 'Guest',
    level: 0,
    permissions: [
      'view_landing_page',
      'access_demo'
    ]
  }
};

export const RoleProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [userRole, setUserRole] = useState(ROLES.GUEST);
  const [loading, setLoading] = useState(true);
  const [rolePermissions, setRolePermissions] = useState([]);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserRole();
    } else {
      setUserRole(ROLES.GUEST);
      setRolePermissions(ROLES.GUEST.permissions);
      setLoading(false);
    }
  }, [user, isAuthenticated]);

  const fetchUserRole = async () => {
    try {
      setLoading(true);
      
      // Check stored role first
      const storedRole = localStorage.getItem('userRole');
      if (storedRole) {
        const role = ROLES[storedRole] || ROLES.FREE_USER;
        setUserRole(role);
        setRolePermissions(role.permissions);
      } else {
        // Default to free user for new users
        setUserRole(ROLES.FREE_USER);
        setRolePermissions(ROLES.FREE_USER.permissions);
        localStorage.setItem('userRole', 'FREE_USER');
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole(ROLES.FREE_USER);
      setRolePermissions(ROLES.FREE_USER.permissions);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (newRoleId) => {
    try {
      const newRole = ROLES[newRoleId];
      if (!newRole) {
        throw new Error('Invalid role');
      }

      // In production, this would make an API call
      // await roleAPI.updateUserRole(user.uid, newRoleId);
      
      setUserRole(newRole);
      setRolePermissions(newRole.permissions);
      localStorage.setItem('userRole', newRoleId);
      
      return { success: true };
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  };

  const hasPermission = (permission) => {
    return rolePermissions.includes(permission);
  };

  const hasAnyPermission = (permissions) => {
    return permissions.some(permission => rolePermissions.includes(permission));
  };

  const hasAllPermissions = (permissions) => {
    return permissions.every(permission => rolePermissions.includes(permission));
  };

  const canAccessFeature = (feature) => {
    const featurePermissions = {
      'premium_features': ['access_premium_features'],
      'admin_panel': ['access_admin_panel'],
      'user_management': ['manage_users', 'manage_all_users'],
      'analytics': ['view_analytics'],
      'ai_coaching': ['unlimited_ai_coaching', 'limited_ai_coaching'],
      'cashflow_predictions': ['cashflow_predictions'],
      'debt_optimization': ['debt_optimization'],
      'export_data': ['export_data', 'export_personal_data']
    };

    const requiredPermissions = featurePermissions[feature] || [];
    return hasAnyPermission(requiredPermissions);
  };

  const getRoleLevel = () => {
    return userRole.level;
  };

  const isRoleHigherThan = (targetRoleId) => {
    const targetRole = ROLES[targetRoleId];
    return userRole.level > (targetRole?.level || 0);
  };

  const getAllowedRoles = () => {
    // Users can only assign roles lower than their own
    return Object.values(ROLES).filter(role => role.level < userRole.level);
  };

  const value = {
    userRole,
    rolePermissions,
    loading,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    canAccessFeature,
    updateUserRole,
    getRoleLevel,
    isRoleHigherThan,
    getAllowedRoles,
    ROLES
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};