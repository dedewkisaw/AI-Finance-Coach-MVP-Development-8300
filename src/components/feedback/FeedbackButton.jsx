import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import toast from 'react-hot-toast';

const { FiMessageCircle, FiSend, FiX } = FiIcons;

const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  
  const handleSubmitFeedback = () => {
    if (!feedbackText.trim()) {
      toast.error('Please enter some feedback before submitting');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to submit feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setFeedbackText('');
      setIsOpen(false);
      toast.success('Thank you for your feedback!');
      
      // Event tracking
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'feedback_submitted', {
          event_category: 'engagement',
          event_label: 'user_feedback'
        });
      }
    }, 1000);
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

      {/* Feedback Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] pointer-events-none">
          <div 
            className="pointer-events-auto fixed top-1/2 right-5 transform -translate-y-1/2 bg-white rounded-lg shadow-xl border border-gray-200 p-6 w-80"
            style={{ maxWidth: 'calc(100vw - 40px)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Send Feedback</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
                aria-label="Close feedback form"
              >
                <SafeIcon icon={FiX} className="w-5 h-5" />
              </button>
            </div>
            <textarea
              placeholder="Tell us what you think..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              aria-label="Feedback text"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                aria-label="Cancel feedback"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitFeedback}
                disabled={isSubmitting || !feedbackText.trim()}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                aria-label="Submit feedback"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <SafeIcon icon={FiSend} className="w-4 h-4" />
                    <span>Send</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackButton;