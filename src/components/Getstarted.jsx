// src/components/GetStarted.jsx
import React from 'react';
import { motion } from 'framer-motion';

const GetStarted = ({ onGetStarted }) => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-x-hidden">
      {/* Global style reset */}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      {/* Smooth animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full" style={{
            backgroundImage: `
              radial-gradient(at 80% 20%, hsla(189, 100%, 56%, 0.2) 0px, transparent 50%),
              radial-gradient(at 0% 50%, hsla(355, 100%, 93%, 0.2) 0px, transparent 50%),
              radial-gradient(at 80% 50%, hsla(340, 100%, 76%, 0.2) 0px, transparent 50%),
              radial-gradient(at 0% 100%, hsla(22, 100%, 77%, 0.2) 0px, transparent 50%),
              radial-gradient(at 80% 100%, hsla(242, 100%, 70%, 0.2) 0px, transparent 50%),
              radial-gradient(at 0% 0%, hsla(343, 100%, 76%, 0.2) 0px, transparent 50%)
            `,
            backgroundSize: 'cover'
          }}></div>
        </div>

        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 20 - 10, 0],
              transition: {
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main content with smooth animations */}
      <motion.div 
        className="relative z-10 container mx-auto px-6 py-20"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Title */}
          <motion.div variants={item} className="mb-16">
            <motion.div 
              className="w-24 h-24 bg-gradient-to-r from-violet-600 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-4xl">👥</span>
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-7xl font-bold text-white mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <span className="block">User</span>
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Management
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-slate-300 mb-8"
              whileHover={{ scale: 1.01 }}
            >
              Effortlessly manage your users with{' '}
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-medium">
                style
              </span>
            </motion.p>
            
            <motion.p 
              className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
              whileHover={{ scale: 1.01 }}
            >
              A beautiful, modern interface to add, edit, delete, and search through your user database. 
              Built with React and designed for{' '}
              <span className="text-cyan-400 font-semibold">productivity</span>.
            </motion.p>
          </motion.div>

          {/* Features */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            variants={container}
          >
            {/* Add Users */}
            <motion.div 
              className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-purple-400/30 transition-all duration-300"
              variants={item}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(124, 58, 237, 0.2)" }}
            >
              <div className="text-4xl mb-4">➕</div>
              <h3 className="text-xl font-bold text-white mb-3">Add Users</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Quickly add new users with comprehensive form validation and real-time feedback
              </p>
            </motion.div>
            
            {/* Smart Search */}
            <motion.div 
              className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-purple-400/30 transition-all duration-300"
              variants={item}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(124, 58, 237, 0.2)" }}
            >
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-white mb-3">Smart Search</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Find users instantly by name or email with lightning-fast search capabilities
              </p>
            </motion.div>
            
            {/* Edit & Delete */}
            <motion.div 
              className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-purple-400/30 transition-all duration-300"
              variants={item}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(124, 58, 237, 0.2)" }}
            >
              <div className="text-4xl mb-4">✏️</div>
              <h3 className="text-xl font-bold text-white mb-3">Edit & Delete</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Modify user information with ease using intuitive editing and deletion tools
              </p>
            </motion.div>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={item}>
            <motion.button
              onClick={onGetStarted}
              className="relative px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center">
                Get Started
                <span className="ml-2">→</span>
              </span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-400 opacity-0 hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default GetStarted;