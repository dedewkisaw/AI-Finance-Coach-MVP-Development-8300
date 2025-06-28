import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiStar } = FiIcons;

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Manager',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    content: 'FinanceAI helped me identify $400/month in hidden spending. I\'m now debt-free 3 years ahead of schedule!',
    rating: 5,
    metric: 'Saved $14,400'
  },
  {
    name: 'Michael Chen',
    role: 'Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    content: 'The AI predictions are incredibly accurate. It predicted my exact balance 90 days out within $50.',
    rating: 5,
    metric: 'Debt-free in 2.1 years'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Teacher',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    content: 'Finally understanding my money! The AI coach explains everything in simple terms I can actually follow.',
    rating: 5,
    metric: '85% health score'
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by 15,000+ Users
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how FinanceAI is helping people take control of their financial future
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <SafeIcon key={i} icon={FiStar} className="w-5 h-5 text-warning-500 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Metric */}
              <div className="bg-success-50 text-success-800 px-4 py-2 rounded-lg text-sm font-medium mb-6 text-center">
                {testimonial.metric}
              </div>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-primary-500">$2.4M</div>
            <div className="text-gray-600">Total Debt Eliminated</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-500">15,000+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-500">94%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-500">4.9/5</div>
            <div className="text-gray-600">User Rating</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;