import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          >
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                返昔南柯
              </span>
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Full-Stack Developer | UI/UX Enthusiast | Problem Solver
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Passionate about creating beautiful, functional web applications that make a difference. 
              I love turning complex problems into simple, elegant solutions.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#projects"
              className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium rounded-full hover:from-primary-700 hover:to-primary-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View My Work
            </a>
            
            <a
              href="#contact"
              className="px-8 py-3 border-2 border-primary-600 text-primary-600 font-medium rounded-full hover:bg-primary-600 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </a>

            <a
              href="/resume.pdf"
              download
              className="px-8 py-3 flex items-center gap-2 border-2 border-gray-300 text-gray-700 font-medium rounded-full hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
            >
              <Download size={18} />
              Download CV
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16 flex justify-center"
          >
            <motion.a
              href="#about"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-gray-400 hover:text-primary-600 transition-colors duration-300"
            >
              <ArrowDown size={24} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
