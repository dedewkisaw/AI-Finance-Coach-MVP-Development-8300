import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiMessageCircle } = FiIcons;

const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleFeedback = () => {
    // Event tracking for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'feedback_button_clicked', {
        event_category: 'engagement',
        event_label: 'floating_feedback'
      });
    }
    
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Floating Feedback Button */}
      <button
        onClick={handleToggleFeedback}
        style={{ background: '#4daacb' }}
        className="flex gap-1 rounded-t-md rounded-b-none justify-end items-center px-3 text-14 leading-5 font-semibold py-2 text-white z-50 fixed top-[calc(50%-20px)] -right-10 rotate-[270deg] transition-all h-9 hover:shadow-lg hover:-right-8 duration-300"
        aria-label="Open Feedback"
      >
        <div className="w-fit h-fit rotate-90 transition-all duration-300">
          <SafeIcon icon={FiMessageCircle} className="w-4 h-4" />
        </div>
        <p className="text-white text-sm font-medium leading-none">Feedback</p>
      </button>

      {/* Simple Feedback Modal for Demo */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] pointer-events-none">
          <div className="pointer-events-auto fixed top-1/2 right-5 transform -translate-y-1/2 bg-white rounded-lg shadow-xl border border-gray-200 p-6 w-80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Send Feedback</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <textarea
              placeholder="Tell us what you think..."
              className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Thank you for your feedback!');
                  setIsOpen(false);
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackButton;