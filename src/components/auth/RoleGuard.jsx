import React from 'react';
import { useRole } from '../../contexts/RoleContext';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiLock, FiAlertTriangle, FiArrowRight } = FiIcons;

const RoleGuard = ({ 
  children, 
  permissions = [], 
  roles = [], 
  requireAll = false,
  fallback = null,
  showUpgrade = false,
  onUpgrade = null 
}) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions, userRole } = useRole();

  // Check role-based access
  const hasRoleAccess = roles.length === 0 || roles.includes(userRole.id);

  // Check permission-based access
  let hasPermissionAccess = true;
  if (permissions.length > 0) {
    hasPermissionAccess = requireAll 
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);
  }

  const hasAccess = hasRoleAccess && hasPermissionAccess;

  if (hasAccess) {
    return children;
  }

  if (fallback) {
    return fallback;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <div className="text-center max-w-md mx-auto p-8">
        <div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <SafeIcon icon={FiLock} className="w-8 h-8 text-warning-600" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Access Restricted
        </h3>
        
        <p className="text-gray-600 mb-6">
          {showUpgrade 
            ? "This feature requires a premium subscription to access."
            : "You don't have permission to view this content."
          }
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <SafeIcon icon={FiAlertTriangle} className="w-4 h-4" />
            <span>Current role: <strong>{userRole.name}</strong></span>
          </div>
          {permissions.length > 0 && (
            <div className="mt-2 text-sm text-gray-500">
              Required permissions: {permissions.join(', ')}
            </div>
          )}
        </div>

        {showUpgrade && onUpgrade && (
          <button
            onClick={onUpgrade}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center space-x-2"
          >
            <span>Upgrade Now</span>
            <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default RoleGuard;