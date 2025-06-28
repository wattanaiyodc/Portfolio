"use client";

import { motion, Variants } from 'framer-motion';

export default function Home() {
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const fadeInUp: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const fadeInLeft: Variants = {
    hidden: { 
      opacity: 0, 
      x: -50 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const fadeInRight: Variants = {
    hidden: { 
      opacity: 0, 
      x: 50 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const scaleIn: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingAnimation: Variants = {
    hidden: { y: 0 },
    visible: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Main Content */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 grid-rows-3 lg:grid-rows-2 gap-6 px-8 py-8"
        variants={containerVariants}
      >
        
        {/* ฝั่งซ้าย - ข้อมูลส่วนตัว */}
        <motion.div 
          className="flex flex-col justify-center space-y-6 text-left"
          variants={fadeInLeft}
        >
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-5xl lg:text-6xl font-bold text-white leading-tight"
              variants={fadeInUp}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                สวัสดี
              </motion.span>
              <motion.span 
                className="block text-blue-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                ผม Junior Developer
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 leading-relaxed"
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
            >
              Next.js + Tailwind CSS + React
            </motion.p>
            
            <motion.p 
              className="text-gray-400 max-w-lg"
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
            >
              กำลังเรียนรู้และพัฒนาทักษะการเขียนโปรแกรม 
              มุ่งมั่นที่จะสร้างเว็บไซต์ที่สวยงามและใช้งานง่าย
            </motion.p>
          </motion.div>
          
          {/* ปุ่ม CTA */}
          <motion.div 
            className="flex space-x-4"
            variants={fadeInUp}
            transition={{ delay: 0.5 }}
          >
            <motion.button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              ดูผลงาน
            </motion.button>
            
            <motion.button 
              className="border border-gray-400 hover:border-white text-gray-300 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
              whileHover={{ 
                scale: 1.05,
                borderColor: "#ffffff"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              เรียนรู้เพิ่ม
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ฝั่งขวา - รูปภาพ */}
        <motion.div 
          className="flex items-center justify-center"
          variants={fadeInRight}
        >
          <motion.div 
            className="relative"
            variants={floatingAnimation}
          >
            {/* กรอบรูป */}
            <motion.div 
              className="w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-1"
              variants={scaleIn}
              whileHover={{ 
                scale: 1.05,
                rotate: 5,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="w-full h-full bg-gray-700 rounded-full flex items-center justify-center overflow-hidden"
                whileHover={{
                  backgroundColor: "#374151"
                }}
                transition={{ duration: 0.3 }}
              >
                {/* แทนที่ด้วยรูปจริง */}
                <motion.div 
                  className="text-8xl"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -10, 10, 0]
                  }}
                  transition={{ duration: 0.5 }}
                >
                  👨‍💻
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* เอฟเฟกต์เพิ่มเติม */}
            <motion.div 
              className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 rounded-full opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div 
              className="absolute -bottom-6 -left-6 w-16 h-16 bg-purple-500 rounded-full opacity-30"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </motion.div>
        </motion.div>

        {/* ส่วนล่าง - เต็มความกว้าง */}
        <motion.div 
          className="lg:col-span-2 bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm"
          variants={fadeInUp}
          transition={{ delay: 0.6 }}
        >
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
            variants={containerVariants}
          >
            {/* สถิติ/ไฮไลท์ */}
            {[
              { number: "10+", text: "โปรเจกต์เล็กๆ", color: "text-blue-400" },
              { number: "1+", text: "ปีที่เริ่มเรียนรู้", color: "text-green-400" },
              { number: "∞", text: "ความกระตือรือร้น", color: "text-purple-400" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="space-y-2"
                variants={scaleIn}
                whileHover={{ 
                  scale: 1.1,
                  y: -5
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className={`text-3xl font-bold ${stat.color}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                    bounce: 0.4
                  }}
                >
                  {stat.number}
                </motion.div>
                <motion.div 
                  className="text-gray-300"
                  variants={fadeInUp}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  {stat.text}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* ทักษะที่กำลังเรียนรู้ */}
          <motion.div 
            className="mt-8"
            variants={fadeInUp}
            transition={{ delay: 1.2 }}
          >
            <motion.h3 
              className="text-xl font-semibold text-white mb-4 text-center"
              variants={fadeInUp}
            >
              เทคโนโลยีที่กำลังเรียนรู้
            </motion.h3>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-3"
              variants={containerVariants}
            >
              {['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'HTML/CSS', 'Git', 'C#', 'C', 'Python'].map((skill, index) => (
                <motion.span 
                  key={skill}
                  className="bg-gray-700 text-gray-200 px-4 py-2 rounded-full text-sm hover:bg-gray-600 transition-colors cursor-pointer"
                  variants={{
                    hidden: { opacity: 0, scale: 0 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 0.4,
                        delay: 1.4 + index * 0.1,
                        type: "spring",
                        bounce: 0.3
                      }
                    }
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: "#4B5563",
                    y: -2,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}