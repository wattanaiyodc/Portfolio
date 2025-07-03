"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, Code, Cpu, Github, ExternalLink, Zap, Sparkles, Calendar, Users, Star, Lock, ChevronLeft, X, Image } from 'lucide-react';

type ProjectSection = 'software' | 'hardware';

interface ProjectDetails {
  overview: string;
  features: string[];
  challenges: string;
  results: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  color: string;
  icon: React.JSX.Element;
  image: string;
  gallery?: string[];
  status: string;
  duration: string;
  team: string;
  details: ProjectDetails;
  github?: string; // เปลี่ยนเป็น optional
  demo?: string;   // เปลี่ยนเป็น optional
}

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState<ProjectSection>('software');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 🎯 Dynamic Projects Data with Separated IDs
  const projectsData: Record<ProjectSection, Project[]> = {
    software: [
      {
        id: "SW-001",
        title: "AI-Powered Web App",
        description: "เว็บแอปพลิเคชันที่ใช้ AI ในการวิเคราะห์ข้อมูลและให้คำแนะนำแบบ Real-time",
        tech: ["React", "Node.js", "Python", "TensorFlow"],
        color: "from-purple-500 to-pink-500",
        icon: <Sparkles className="w-6 h-6" />,
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
        gallery: [
                    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
                    "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop",
                    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
                    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop"
                  ],
        status: "Completed",
        duration: "3 เดือน",
        team: "4 คน",
        details: {
          overview: "โปรเจคนี้เป็นเว็บแอปพลิเคชันที่ใช้ปัญญาประดิษฐ์ในการวิเคราะห์ข้อมูลขนาดใหญ่และให้คำแนะนำที่เป็นประโยชน์แก่ผู้ใช้งานแบบ Real-time",
          features: [
            "ระบบวิเคราะห์ข้อมูลด้วย Machine Learning",
            "Dashboard แสดงผลแบบ Interactive",
            "API สำหรับ Integration กับระบบอื่น",
            "ระบบ Authentication และ Authorization",
            "Real-time Notifications"
          ],
          challenges: "ความท้าทายหลักคือการจัดการข้อมูลขนาดใหญ่และการทำให้ AI model ทำงานได้รวดเร็วบนเว็บแอป",
          results: "ระบบสามารถประมวลผลข้อมูลได้เร็วขึ้น 70% และมีความแม่นยำ 95%"
        },
        github: "https://github.com/username/ai-web-app",
        demo: "https://ai-web-app-demo.com"
      },
      {
        id: "SW-002",
        title: "E-Commerce Platform",
        description: "แพลตฟอร์มการค้าออนไลน์ที่มีระบบการชำระเงินและการจัดการสินค้าครบครัน",
        tech: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
        color: "from-blue-500 to-cyan-500",
        icon: <Code className="w-6 h-6" />,
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
        status: "In Progress",
        duration: "2 เดือน",
        team: "2 คน",
        details: {
          overview: "แพลตฟอร์ม E-Commerce ที่ครบครันสำหรับธุรกิจขนาดกลางถึงใหญ่ พร้อมระบบจัดการที่ทันสมัย",
          features: [
            "ระบบจัดการสินค้าและสต็อก",
            "Payment Gateway Integration",
            "ระบบจัดการคำสั่งซื้อ",
            "Analytics Dashboard",
            "Mobile Responsive Design"
          ],
          challenges: "การจัดการ state ที่ซับซ้อนและการ optimize performance สำหรับผู้ใช้จำนวนมาก",
          results: "กำลังพัฒนา MVP สำหรับ Beta Testing"
        },
        // ไม่มี github และ demo
      },
      {
        id: "SW-003",
        title: "Real-time Chat App",
        description: "แอปพลิเคชันแชทที่รองรับการสื่อสารแบบ Real-time พร้อมระบบ Video Call",
        tech: ["Socket.io", "WebRTC", "MongoDB", "Express"],
        color: "from-green-500 to-teal-500",
        icon: <Zap className="w-6 h-6" />,
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
        status: "Completed",
        duration: "1.5 เดือน",
        team: "3 คน",
        details: {
          overview: "แอปพลิเคชันแชทที่รองรับการสื่อสารแบบ Real-time พร้อมฟีเจอร์ Video Call และ File Sharing",
          features: [
            "Real-time Messaging",
            "Video & Voice Calls",
            "File Sharing",
            "Group Chat",
            "Message Encryption"
          ],
          challenges: "การจัดการ WebRTC connections และการ sync ข้อมูลแบบ real-time",
          results: "รองรับผู้ใช้พร้อมกันได้มากกว่า 1000 คน"
        },
        demo: "https://chat-app-demo.com" // มีแค่ demo ไม่มี github
      }
    ],
    hardware: [
      {
        id: "HW-001",
        title: "Tic-Tac-Toe",
        description: "Tic-Tac-Toe เป็นเกมกระดาน 3x3 สำหรับผู้เล่น 2 คน ผลัดกันวาง X และ O เป้าหมายคือเรียงสัญลักษณ์ให้ได้ 3 ตัวติดกันในแนวนอน แนวตั้ง หรือแนวทแยง",
        tech: ["KUKA Robot", "Python" , "CV" , "Node.js" , "PLC"],
        color: "from-orange-500 to-red-500",
        icon: <Cpu className="w-6 h-6" />,
        image: "/images/Tic-Tac-Toe/board.jpg",
        gallery: [
                 
                 ],
        status: "Completed",
        duration: "3 เดือน",
        team: "3 คน",
        details: {
          overview: "เกม XO นี้เป็นเกมกระดาน 3x3 ที่ผู้เล่นจะได้เล่นกับหุ่นยนต์ โดยฝั่งหุ่นยนต์มีระบบ AI ช่วยวิเคราะห์และตัดสินใจวางหมาก เพื่อท้าทายความสามารถของผู้เล่นในแต่ละตา ทำให้เกมมีความสนุกและท้าทายมากขึ้น",
          features: [
            "เล่นได้ 2 ฝ่าย: ผู้เล่นกับหุ่นยนต์",
            "หุ่นยนต์ใช้ AI วิเคราะห์และวางหมากอย่างชาญฉลาด",
            "ระบบแสดงผลบนบอร์ดจริง ทำให้เห็นหมากแต่ละตาชัดเจน",
            "รองรับการเริ่มเกมใหม่และรีเซ็ตคะแนนได้ง่าย",
            "อินเทอร์เฟซใช้งานง่าย เหมาะสำหรับผู้เล่นทุกวัย",           
          ],
          challenges: "การเล่นเกม XO กับคนจริงบางครั้งอาจไม่สะดวก หรือผู้เล่นต้องการคู่ต่อสู้ที่ท้าทายและไม่ซ้ำซาก AI ในหุ่นยนต์จึงต้องมีความสามารถวิเคราะห์และตัดสินใจอย่างชาญฉลาดเพื่อให้เกมสนุกและท้าทาย",
          results: "พัฒนาระบบ AI บนหุ่นยนต์ที่สามารถคิดและวางหมากได้อย่างมีประสิทธิภาพ ช่วยให้ผู้เล่นได้รับประสบการณ์เล่นเกมที่สมจริง ท้าทาย และเพลิดเพลินในทุกตา"
        },
        // โปรเจค Hardware อาจไม่มี online demo
      },
      {
        id: "HW-002",
        title: "Jim Toon Game (เกมจิ้มตุ๋น)",
        description: "มินิเกมที่สร้างมาจากการสั่งการ Auduino",
        tech: ["Arduino", "C" , "7 Segment" , "IC Timer"],
        color: "from-orange-500 to-red-500",
        icon: <Cpu className="w-6 h-6" />,
        image: "/images/Jim-Toon-Game/module.png",
        gallery: [
                  "/images/Jim-Toon-Game/module.png",
                  "/images/Jim-Toon-Game/circuit_1.png",
                  "/images/Jim-Toon-Game/circuit_2.png"
                 ],
        status: "Completed",
        duration: "1 เดือน",
        team: "1 คน",
        details: {
          overview: "มินิเกม ที่จะต้องกดปุ่มตามไฟ LED ที่แสดง ณ ขณะนั้น",
          features: [
            "สวิตช์เปิด-ปิดระบบ (On/Off Switch)",
            "ไฟสถานะเริ่มทำงาน",
            "ปุ่มเริ่มเกม (Start Button)",
            "ระบบสุ่มไฟขึ้นตามจุดต่าง ๆ",
            "ระบบจับเวลา",
            "ระบบนับคะแนนอัตโนมัติ",
            "เล่นซ้ำได้ทันที",
          ],
          challenges: "ผู้เล่นมักเบื่อง่ายกับเกมทั่วไปที่ไม่มีการโต้ตอบแบบเรียลไทม์ หรือไม่มีระบบตอบสนองต่อผู้เล่นอย่างชัดเจน เช่น ไฟ แสง สี เสียง และเวลาจริง",
          results: "เกมจิ้มตุ่นถูกออกแบบให้มีระบบตอบสนองแบบเรียลไทม์ ผ่านไฟ LED และปุ่มกด โดยมีระบบนับเวลาและคะแนน เพื่อเพิ่มความสนุก ท้าทาย และกระตุ้นการตอบสนองของผู้เล่นในเวลาจำกัด"
        },
        // โปรเจค Hardware อาจไม่มี online demo
      },
      {
        id: "HW-003",
        title: "Temperature Monitor",
        description: "ระบบติดตามอุณหภูมิแบบ Real-time ด้วย Arduino และ Sensors",
        tech: ["Arduino", "SHIELD", "LCD Display", "C"],
        color: "from-indigo-500 to-purple-500",
        icon: <Cpu className="w-6 h-6" />,
        image: "/images/temperature/module.png",
         gallery: [
                  "/images/temperature/module.png"                
                 ],
        status: "Completed",
        duration: "1 เดือน",
        team: "1 คน",
        details: {
          overview: "ระบบติดตามอุณหภูมิและความชื้นแบบ real-time พร้อมแสดงผลบน LCD และบันทึกข้อมูล",
          features: [
            "วัดอุณหภูมิและความชื้น",
            "แสดงผลบน LCD Display",
            "บันทึกข้อมูลลง SD Card",
            "แจ้งเตือนเมื่อเกินค่าที่กำหนด",
            "ใช้งานได้ 24/7"
          ],
          challenges: "การจัดการ sensor calibration และ data logging ที่เสถียร",
          results: "ความแม่นยำในการวัด ±0.5°C และใช้งานต่อเนื่องได้มากกว่า 6 เดือน"
        },
        github: "https://github.com/username/temperature-monitor"
        // มีแค่ github ไม่มี demo
      },
      {
        id: "HW-004",
        title: "Automatic Alcohol Dispenser",
        description: "อุปกรณ์ติดตั้งสำหรับการใช้งาน Alcohol แบบไร้การสัมผัส",
        tech: ["Arduino Nano", "Servo motor", "Sensors", "C"],
        color: "from-pink-500 to-rose-500",
        icon: <Zap className="w-6 h-6" />,
        image: "/images/alcohol/module.jpg",
        gallery: [
                  "/images/alcohol/module.jpg",
                  "/images/alcohol/circuit.jpg"                 
                 ],
        status: "Completed",
        duration: "2.5 เดือน",
        team: "2 คน",
        details: {
          overview: "อุปกรณ์สวมใส่สำหรับติดตามสุขภาพที่ส่งข้อมูลแบบ real-time ไปยังแอปมือถือ",
          features: [
            "ระบบอัตโนมัติแบบไม่ต้องสัมผัส ช่วยลดการแพร่กระจายของเชื้อโรค",
            "เซนเซอร์อินฟราเรด ตรวจจับมือได้อย่างแม่นยำ",
            "วางตั้งพื้นได้",
            "แจ้งเตือนเมื่อมีความผิดปกติ",           
          ],
          challenges: "การใช้ขวดแอลกอฮอล์แบบกดร่วมกันเสี่ยงต่อการแพร่เชื้อโรคจากการสัมผัสซ้ำ",
          results: "เครื่องกดแอลกอฮอล์อัตโนมัติช่วยลดการสัมผัส ใช้งานสะดวก ปลอดภัย เหมาะสำหรับพื้นที่สาธารณะ"
        },
        // เป็นโปรเจคที่เป็นความลับหรือของบริษัท ไม่สามารถแชร์ได้
      }
    ]
  };

  const currentProjects = projectsData[activeSection];

  const openProjectDetails = (project: Project) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProject(project);
      setIsTransitioning(false);
    }, 300);
  };

  const closeProjectDetails = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedProject(null);
      setIsTransitioning(false);
    }, 300);
  };
  
  const openImageModal = (image: string, index: number) => {
  setSelectedImage(image);
  setCurrentImageIndex(index);
};

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedProject && selectedProject.gallery) {
      const nextIndex = (currentImageIndex + 1) % selectedProject.gallery.length;
      setCurrentImageIndex(nextIndex);
      setSelectedImage(selectedProject.gallery[nextIndex]);
    }
  };

  const prevImage = () => {
    if (selectedProject && selectedProject.gallery) {
      const prevIndex = currentImageIndex === 0 ? selectedProject.gallery.length - 1 : currentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
      setSelectedImage(selectedProject.gallery[prevIndex]);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-500/5 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-pink-500/5 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10">
        {/* Main Content */}
        <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {!selectedProject ? (
            <>
              {/* Hero Section */}
              <div className="container mx-auto px-6 py-20">
                <div className={`text-center transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                  <div className="relative inline-block">
                    <h1 className="text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                      PORTFOLIO
                    </h1>
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full animate-bounce" />
                  </div>
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    สำรวจโปรเจคที่สร้างสรรค์และนวัตกรรมใหม่ๆ ที่ผสมผสานระหว่างเทคโนโลยี Software และ Hardware
                  </p>
                </div>

                {/* Section Toggle */}
                <div className="flex justify-center mt-16 mb-12">
                  <div className="bg-white/10 backdrop-blur-lg rounded-full p-2 border border-white/20">
                    {(Object.keys(projectsData) as ProjectSection[]).map((section) => (
                      <button
                        key={section}
                        onClick={() => setActiveSection(section)}
                        className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-500 transform hover:scale-105 ${
                          activeSection === section
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg scale-105'
                            : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        {section === 'software' ? (
                          <div className="flex items-center space-x-2">
                            <Code className="w-5 h-5" />
                            <span>Software Projects</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Cpu className="w-5 h-5" />
                            <span>Hardware Projects</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                  {currentProjects.map((project, index) => (
                    <div
                      key={project.id}
                      onClick={() => openProjectDetails(project)}
                      className={`group relative bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-700 transform hover:-translate-y-2 hover:scale-105 cursor-pointer ${
                        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      {/* Project Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-60 group-hover:opacity-40 transition-opacity duration-500`} />
                        
                        {/* Status Badge */}
                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                          project.status === 'Completed' 
                            ? 'bg-green-500/80 text-white' 
                            : 'bg-yellow-500/80 text-black'
                        }`}>
                          {project.status}
                        </div>

                        {/* Project ID Badge */}
                        <div className="absolute top-4 left-4 px-2 py-1 rounded-full text-xs font-mono bg-black/50 text-white border border-white/20">
                          {project.id}
                        </div>
                      </div>

                      {/* Project Content */}
                      <div className="p-6">
                        {/* Project Icon */}
                        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${project.color} mb-4 transform group-hover:rotate-12 transition-transform duration-500`}>
                          {project.icon}
                        </div>

                        <h3 className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-500">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-300 text-sm leading-relaxed mb-4 group-hover:text-gray-200 transition-colors duration-300 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Project Info */}
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{project.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{project.team}</span>
                          </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.tech.slice(0, 3).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-white/10 rounded-full text-xs font-medium border border-white/20"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="px-2 py-1 bg-white/10 rounded-full text-xs font-medium border border-white/20">
                              +{project.tech.length - 3}
                            </span>
                          )}
                        </div>
                      </div>       
                  
                      {/* Hover Arrow */}
                      <ChevronRight className="absolute top-6 right-6 w-6 h-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-500 text-white" />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
           /* Project Details Page */
            <div className="min-h-screen">
              {/* Project Header with Back Button Overlay */}
              <div className="relative mb-12">
                <div className="h-80 relative overflow-hidden">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.color} opacity-60`} />
                  
                  {/* Floating Back Button - Top Left */}
                  <button 
                    onClick={closeProjectDetails}
                    className="absolute top-6 left-6 z-20 flex items-center space-x-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-black/60 hover:border-white/40 transition-all duration-300 group hover:scale-105"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180 transform group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="font-medium text-sm">Back</span>
                  </button>

                 
                  {/* Project Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div className="container mx-auto">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`p-4 rounded-xl bg-gradient-to-br ${selectedProject.color}`}>
                          {selectedProject.icon}
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h1 className="text-4xl font-bold text-white">{selectedProject.title}</h1>
                            <span className="px-3 py-1 rounded-full text-sm font-mono bg-black/50 text-white border border-white/20">
                              {selectedProject.id}
                            </span>
                          </div>
                          <div className="flex items-center space-x-6 text-gray-200">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>{selectedProject.duration}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4" />
                              <span>{selectedProject.team}</span>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              selectedProject.status === 'Completed' 
                                ? 'bg-green-500/80 text-white' 
                                : 'bg-yellow-500/80 text-black'
                            }`}>
                              {selectedProject.status}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="container mx-auto px-6 pb-20">
                <div className="max-w-6xl mx-auto">
                  {/* Overview */}
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-white">Overview</h2>
                    <p className="text-gray-300 leading-relaxed text-lg">{selectedProject.details.overview}</p>
                  </div>

                  {/* Features */}
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-white">Key Features</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedProject.details.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors duration-300">
                          <Star className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6 text-white">Technology Stack</h2>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tech.map((tech, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-white/10 rounded-full font-medium border border-white/20 hover:border-white/40 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  {selectedProject?.gallery && selectedProject.gallery.length > 0 && (
                    <div className="mb-12">
                      <h2 className="text-3xl font-bold mb-6 text-white flex items-center space-x-3">
                        <Image className="w-8 h-8" />
                        <span>Project Gallery</span>
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selectedProject.gallery.map((image, index) => (
                          <div
                            key={index}
                            onClick={() => openImageModal(image, index)}
                            className="relative group cursor-pointer overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105"
                          >
                            <img
                              src={image}
                              alt={`${selectedProject.title} screenshot ${index + 1}`}
                              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                                  <ExternalLink className="w-6 h-6 text-white" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Challenges & Results */}
                  <div className="grid md:grid-cols-2 gap-12 mb-12">
                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                      <h2 className="text-2xl font-bold mb-4 text-white">Challenges</h2>
                      <p className="text-gray-300 leading-relaxed">{selectedProject.details.challenges}</p>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                      <h2 className="text-2xl font-bold mb-4 text-white">Results</h2>
                      <p className="text-gray-300 leading-relaxed">{selectedProject.details.results}</p>
                    </div>
                  </div>

                  {/* Action Buttons - แสดงเฉพาะปุ่มที่มี link */}
                  <div className="flex flex-wrap gap-4">
                    {selectedProject.github && (
                      <a 
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 font-medium"
                      >
                        <Github className="w-5 h-5" />
                        <span>View Code</span>
                      </a>
                    )}
                    
                    {selectedProject.demo && (
                      <a 
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 px-8 py-4 bg-white/10 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 font-medium"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>Live Demo</span>
                      </a>
                    )}

                    {/* ถ้าไม่มีทั้ง github และ demo ให้แสดงข้อความแจ้ง */}
                    {!selectedProject.github && !selectedProject.demo && (
                      <div className="flex items-center space-x-3 px-8 py-4 bg-gray-600/20 rounded-xl border border-gray-500/30 font-medium text-gray-400">
                        <Lock className="w-5 h-5" />
                        <span>Code & Demo ไม่เปิดเผยต่อสาธารณะ</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed bottom-8 right-8 pointer-events-none">
        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse absolute -top-4 -left-4" />
        <div className="w-4 h-4 bg-pink-400 rounded-full animate-bounce absolute -bottom-6 -right-6" />
      </div>
      {/* Image Modal */}
  {selectedImage && (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative max-w-6xl max-h-[90vh] w-full flex items-center justify-center">
        {/* Close Button */}
        <button
          onClick={closeImageModal}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors duration-300"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Navigation Buttons */}
        {selectedProject && selectedProject.gallery && selectedProject.gallery.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors duration-300"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}

        {/* Image */}
              <img
          src={selectedImage}
          alt="Project screenshot"
          className="max-w-full max-h-full object-contain rounded-lg"
          style={{ width: 'auto', height: 'auto' }}
        />

        {/* Image Counter */}
        {selectedProject && selectedProject.gallery && selectedProject.gallery.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/50 rounded-full text-white text-sm">
            {currentImageIndex + 1} / {selectedProject.gallery.length}
          </div>
        )}
      </div>
    </div>
  )}
      </div>
      
  );
};

export default Portfolio;