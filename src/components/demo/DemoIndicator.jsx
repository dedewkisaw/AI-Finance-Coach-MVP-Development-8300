import React from 'react';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const {FiPlay, FiInfo} = FiIcons;

const DemoIndicator = ({onStartDemo}) => {
  const isDemo = localStorage.getItem('userEmail')?.includes('demo@');
  
  if (!isDemo) return null;

  return (
    <motion.div
      initial={{opacity: 0, y: -20}}
      animate={{opacity: 1, y: 0}}
      className="bg-gradient-to-r from-success-500 to-success-600 text-white px-6 py-3 rounded-lg shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiInfo} className="w-5 h-5" />
          <span className="font-medium">You're in demo mode</span>
        </div>
        <button
          onClick={onStartDemo}
          className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlay} className="w-4 h-4" />
          <span>Take Tour</span>
        </button>
      </div>
    </motion.div>
  );
};

export default DemoIndicator;