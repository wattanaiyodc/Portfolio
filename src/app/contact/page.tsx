"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Facebook, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async () => {
  setIsSubmitting(true);
  setSubmitStatus('idle');

  try {
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'ข้อความจากเว็บไซต์',
        message: formData.message,
      }),
    });

    const data = await response.json();
    console.log('Response:', data);

    if (response.ok) {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      document.querySelectorAll('[contenteditable]').forEach((el) => {
        el.textContent = '';
      });

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } else {
      throw new Error(data.error || 'ไม่สามารถส่งข้อความได้');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    setSubmitStatus('error');
    setTimeout(() => {
      setSubmitStatus('idle');
    }, 5000);
  } finally {
    setIsSubmitting(false);
  }
};


  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideInRight: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900 py-20 px-4">
      <style jsx>{`
        .button-hover:hover {
          background: linear-gradient(to right, #2563EB, #0891B2);
        }

        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9CA3AF;
        }

        .focus-blue:focus {
          border-color: #3B82F6;
          outline: none;
        }

        .status-message {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
          padding: 1rem;
          border-radius: 0.5rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .status-success {
          background: rgba(34, 197, 94, 0.1);
          color: #22C55E;
        }

        .status-error {
          background: rgba(239, 68, 68, 0.1);
          color: #EF4444;
        }
      `}</style>

      {/* Status Message */}
      {submitStatus !== 'idle' && (
        <motion.div
          className={`status-message ${submitStatus === 'success' ? 'status-success' : 'status-error'}`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
        >
          {submitStatus === 'success' ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>ข้อความถูกส่งเรียบร้อยแล้ว!</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5" />
              <span>เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง</span>
            </>
          )}
        </motion.div>
      )}

      <motion.div 
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            ติดต่อ
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              เรา
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            มีโปรเจกต์น่าสนใจ หรือต้องการปรึกษาเรื่องงาน? ส่งข้อความมาหาเราได้เลย
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div 
            className="space-y-8"
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <motion.h2 
              className="text-3xl font-bold text-white mb-8"
              variants={itemVariants}
            >
              ข้อมูลติดต่อ
            </motion.h2>
            
            {/* Contact Cards */}
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
            >
              {[
                { icon: Mail, title: "อีเมล", info: "wattanai.yodc@gmail.com", color: "bg-blue-500" },
                { icon: Phone, title: "โทรศัพท์", info: "+66 97 001 4690", color: "bg-cyan-500" },
                {
                  icon: MapPin,
                  title: "ที่อยู่",
                  info: (
                    <a
                      href="https://www.google.com/maps?q=88/2+หมู่ที่+2+ต.บ้านใหม่+อ.ปากเกร็ด+จ.นนทบุรี"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 underline hover:text-cyan-300"
                    >
                      88/2 หมู่ที่ 2 ต.บ้านใหม่ อ.ปากเกร็ด จ.นนทบุรี
                    </a>
                  ),
                  color: "bg-indigo-500"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                  variants={scaleIn}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <motion.div 
                      className={`${item.color} p-3 rounded-full`}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 360,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-white font-semibold">{item.title}</h3>
                      <p className="text-gray-300">{item.info}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Media */}
            <motion.div 
              className="mt-12"
              variants={itemVariants}
              transition={{ delay: 0.6 }}
            >
              <motion.h3 
                className="text-2xl font-bold text-white mb-6"
                variants={itemVariants}
              >
                ติดตามเรา
              </motion.h3>
              <motion.div 
                className="flex space-x-4"
                variants={containerVariants}
              >
                {[
                  { icon: Facebook, href: "https://www.facebook.com/phoenix.yodchan", color: "bg-blue-500", label: "Facebook" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`${social.color} p-3 rounded-full transition-colors`}
                    aria-label={social.label}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 360,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-6 h-6 text-white" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
              variants={scaleIn}
              transition={{ delay: 0.3 }}
            >
              <motion.h2 
                className="text-3xl font-bold text-white mb-8"
                variants={itemVariants}
              >
                ส่งข้อความ
              </motion.h2>
              
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div variants={slideInLeft} transition={{ delay: 0.3 }}>
                    <div className="block text-white font-medium mb-2">
                      ชื่อ <span className="text-red-400">*</span>
                    </div>
                    <div
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus-blue transition-colors cursor-text"
                      contentEditable
                      suppressContentEditableWarning={true}
                      data-placeholder="ชื่อของคุณ"
                      onInput={(e) => setFormData({...formData, name: (e.target as HTMLElement).textContent || ''})}
                    />
                  </motion.div>

                  <motion.div variants={slideInRight} transition={{ delay: 0.4 }}>
                    <div className="block text-white font-medium mb-2">
                      อีเมล <span className="text-red-400">*</span>
                    </div>
                    <div
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus-blue transition-colors cursor-text"
                      contentEditable
                      suppressContentEditableWarning={true}
                      data-placeholder="your@email.com"
                      onInput={(e) => setFormData({...formData, email: (e.target as HTMLElement).textContent || ''})}
                    />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants} transition={{ delay: 0.5 }}>
                  <div className="block text-white font-medium mb-2">หัวข้อ</div>
                  <div
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus-blue transition-colors cursor-text"
                    contentEditable
                    suppressContentEditableWarning={true}
                    data-placeholder="หัวข้อข้อความ"
                    onInput={(e) => setFormData({...formData, subject: (e.target as HTMLElement).textContent || ''})}
                  />
                </motion.div>

                <motion.div variants={itemVariants} transition={{ delay: 0.6 }}>
                  <div className="block text-white font-medium mb-2">
                    ข้อความ <span className="text-red-400">*</span>
                  </div>
                  <div
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus-blue transition-colors cursor-text min-h-[120px]"
                    contentEditable
                    suppressContentEditableWarning={true}
                    data-placeholder="เขียนข้อความของคุณที่นี่..."
                    onInput={(e) => setFormData({...formData, message: (e.target as HTMLElement).textContent || ''})}
                  />
                </motion.div>

                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 px-6 rounded-lg button-hover transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                  variants={itemVariants}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 0.98 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? (
                    <motion.div 
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>ส่งข้อความ</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Decoration */}
        <motion.div 
          className="mt-20 text-center"
          variants={scaleIn}
          transition={{ delay: 0.7 }}
        >
          <div className="inline-block">
            <motion.div 
              className="w-20 h-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
              animate={{
                background: [
                  "linear-gradient(45deg, #3B82F6, #06B6D4)",
                  "linear-gradient(45deg, #06B6D4, #3B82F6)",
                  "linear-gradient(45deg, #3B82F6, #06B6D4)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          <motion.p 
            className="text-gray-400 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            ขอบคุณที่สนใจติดต่อเรา
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;