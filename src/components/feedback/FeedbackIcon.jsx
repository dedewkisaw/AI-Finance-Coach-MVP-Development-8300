import React from 'react';
import * as FiIcons from 'react-icons/fi';

const { FiChevronUp } = FiIcons;

const FeedbackIcon = ({ type = "feedbackArrow" }) => {
  switch (type) {
    case "feedbackArrow":
      return <FiChevronUp className="w-4 h-4" />;
    default:
      return <FiChevronUp className="w-4 h-4" />;
  }
};

export default FeedbackIcon;