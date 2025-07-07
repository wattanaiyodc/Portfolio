'use client';

import { motion } from 'framer-motion';

export default function About() {
  const skills = [
   
  { name: 'React', level: 50, icon: '⚛️' },            
  { name: 'Next.js', level: 50, icon: '🌐' },           
  { name: 'Tailwind CSS', level: 40, icon: '💨' },     
  { name: 'JavaScript', level: 60, icon: '📜' },        
  { name: 'Python', level: 60, icon: '🐍' },           
  { name: 'C', level: 60, icon: '🔵' },                
  { name: 'C#', level: 70, icon: '🎵' },                       
  { name: 'Java', level: 80, icon: '☕' },              
  { name: 'HTML/CSS', level: 50, icon: '🖼️' },         
  { name: 'Git', level: 40, icon: '🔧' },             
];


  const experiences = [
    {
      year: 'ต้นปี 2022',
      title: 'เริ่มต้นเรียนรู้ ภาษาโปรแกรมเมอร์',
      description: 'เริ่มศึกษา C'
    },
     {
      year: 'ปลายปี 2022',
      title: 'เริ่มต้นเรียนรู้ Arduino',
      description: 'เขียนภาษา C เพื่อควบคุม Arduino'
    },
    {
      year: 'ต้นปี 2023',
      title: 'เรียนรู้ Java , OOP , Javascript , HTML/CSS , Python',
      description: 'เจาะลึก C และเรียนรู้ภาษาอื่นๆเพิ่มเติม'
    },
    {
      year: 'กลางปี 2023',
      title: 'ทำโปรเจค Openhouse Tic-Tac-Toe',
      description: 'เขี่ยน Node.js และ CV '
    },
    {
      year: 'ปลายปี 2023',
      title: 'เรียนรู้ Database Mysql',
      description: 'ทฤษฏีเบื่องต้น'
    },
    {
      year: 'กลางปี 2024',
      title: 'เรียนรู้ C# , .Net 8 framework , PLC , KRL (KUKA Robot Language)',
      description: 'เริ่มศึกษาเพื่อทำโปรเจคที่ได้รับจากลูกค้าและพัฒนาแอปพลิเคชั่นดังกล่าว'
    },
    {
      year: 'ปัจจุบัน',
      title: 'พัฒนา Portfolio และโปรเจกต์ส่วนตัว',
      description: 'สร้างผลงานและหาประสบการณ์ใหม่ๆ อย่างต่อเนื่อง'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8"
    >
      <div className="max-w-6xl mx-auto px-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
            เกี่ยวกับ
            <span className="text-blue-400"> ตัวผม</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Junior Developer ที่หลงใหลในการเรียนรู้เทคโนโลยีใหม่ๆ 
            และมุ่งมั่นพัฒนาตนเองให้เป็น  Full-Stack Developer
          </p>
        </motion.div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Personal Info */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm"
          >
            <h2 className="text-3xl font-bold text-white mb-6">🚀 เป้าหมายของผม</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                ผมเริ่มต้นเรียนรู้การเขียนโปรแกรมด้วยความหลงใหลในการสร้างสรรค์
                สิ่งใหม่ๆ ที่สามารถแก้ปัญหาและอำนวยความสะดวกให้ผู้คนได้
              </p>
              <p>
                แม้จะเป็น Junior แต่ผมมุ่งมั่นที่จะเรียนรู้อย่างต่อเนื่อง 
                และพร้อมรับความท้าทายใหม่ๆ เพื่อพัฒนาทักษะให้ดียิ่งขึ้น
              </p>
              <p>
                เป้าหมายของผมคือการสร้างทุกอย่างที่ผมอยากทำให้สำเร็จให้ได้
              </p>
            </div>
          </motion.div>

          {/* Quick Facts */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm"
          >
            <h2 className="text-3xl font-bold text-white mb-6">⚡ ข้อมูลเบื้องต้น</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📍</span>
                <span className="text-gray-300">ประเทศไทย</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎓</span>
                <span className="text-gray-300">Graduated with a Bachelor's Degree</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💻</span>
                <span className="text-gray-300">Frontend Development or Backend Development</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎯</span>
                <span className="text-gray-300">กำลังหางานแรก</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🍵</span>
                <span className="text-gray-300">Powered by Green Tea</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            🛠️ ทักษะของผม
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">{skill.icon}</span>
                  <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                  ></motion.div>
                </div>
                <p className="text-gray-400 text-sm mt-2">{skill.level}%</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            📅 เส้นทางการเรียนรู้
          </h2>
          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.4 + index * 0.2, duration: 0.6 }}
                className="flex items-center mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-20 text-center">
                  <div className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {exp.year}
                  </div>
                </div>
                <div className="flex-grow bg-gray-800/50 rounded-xl p-6 ml-6 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-white mb-2">{exp.title}</h3>
                  <p className="text-gray-300">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}