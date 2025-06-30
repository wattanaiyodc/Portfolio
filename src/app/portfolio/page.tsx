"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, Code, Cpu, Github, ExternalLink, Zap, Sparkles, Calendar, Users, Star } from 'lucide-react';

type ProjectSection = 'software' | 'hardware';

interface ProjectDetails {
  overview: string;
  features: string[];
  challenges: string;
  results: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  color: string;
  icon: React.JSX.Element;
  image: string;
  status: string;
  duration: string;
  team: string;
  details: ProjectDetails;
  github: string;
  demo: string;
}

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState<ProjectSection>('software');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 🎯 Dynamic Projects Data
  const projectsData: Record<ProjectSection, Project[]> = {
    software: [
      {
        id: 1,
        title: "AI-Powered Web App",
        description: "เว็บแอปพลิเคชันที่ใช้ AI ในการวิเคราะห์ข้อมูลและให้คำแนะนำแบบ Real-time",
        tech: ["React", "Node.js", "Python", "TensorFlow"],
        color: "from-purple-500 to-pink-500",
        icon: <Sparkles className="w-6 h-6" />,
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
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
        id: 2,
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
        github: "https://github.com/username/ecommerce-platform",
        demo: "https://ecommerce-demo.com"
      },
      {
        id: 3,
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
        github: "https://github.com/username/chat-app",
        demo: "https://chat-app-demo.com"
      }
    ],
    hardware: [
      {
        id: 4,
        title: "IoT Smart Home System",
        description: "ระบบบ้านอัจฉริยะที่ควบคุมผ่านแอปมือถือ รองรับ Voice Command",
        tech: ["Arduino", "ESP32", "Flutter", "Firebase"],
        color: "from-orange-500 to-red-500",
        icon: <Cpu className="w-6 h-6" />,
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=400&fit=crop",
        status: "Completed",
        duration: "4 เดือน",
        team: "2 คน",
        details: {
          overview: "ระบบบ้านอัจฉริยะที่ครบครันสำหรับควบคุมอุปกรณ์ต่างๆ ในบ้านผ่านแอปมือถือและเสียง",
          features: [
            "ควบคุมไฟและปลั๊กไฟ",
            "ระบบรักษาความปลอดภัย",
            "เซ็นเซอร์อุณหภูมิและความชื้น",
            "Voice Control ด้วย Google Assistant",
            "Mobile App สำหรับ iOS และ Android"
          ],
          challenges: "การจัดการ network latency และการ sync ข้อมูลระหว่างอุปกรณ์หลายตัว",
          results: "ประหยัดพลังงานได้ 30% และเพิ่มความสะดวกสบายในการใช้ชีวิต"
        },
        github: "https://github.com/username/smart-home",
        demo: "https://smart-home-demo.com"
      },
      {
        id: 5,
        title: "Autonomous Robot",
        description: "หุ่นยนต์อัตโนมัติที่สามารถหลีกเลี่ยงสิ่งกีดขวางและทำงานตามคำสั่งได้",
        tech: ["Raspberry Pi", "OpenCV", "Python", "TensorFlow Lite"],
        color: "from-indigo-500 to-purple-500",
        icon: <Cpu className="w-6 h-6" />,
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
        status: "In Progress",
        duration: "5 เดือน",
        team: "3 คน",
        details: {
          overview: "หุ่นยนต์อัตโนมัติที่ใช้ Computer Vision และ AI ในการนำทางและทำงานต่างๆ",
          features: [
            "Object Detection และ Recognition",
            "Path Planning Algorithm",
            "Voice Command Recognition",
            "Remote Control via Web Interface",
            "Autonomous Navigation"
          ],
          challenges: "การจัดการ real-time processing และการทำ SLAM (Simultaneous Localization and Mapping)",
          results: "กำลังพัฒนาและทดสอบ prototype"
        },
        github: "https://github.com/username/autonomous-robot",
        demo: "https://robot-demo.com"
      },
      {
        id: 6,
        title: "Wearable Health Monitor",
        description: "อุปกรณ์สวมใส่ติดตามสุขภาพแบบ Real-time พร้อมส่งข้อมูลไปยังแอปมือถือ",
        tech: ["Arduino Nano", "Bluetooth", "Sensors", "React Native"],
        color: "from-pink-500 to-rose-500",
        icon: <Zap className="w-6 h-6" />,
        image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&h=400&fit=crop",
        status: "Completed",
        duration: "2.5 เดือน",
        team: "2 คน",
        details: {
          overview: "อุปกรณ์สวมใส่สำหรับติดตามสุขภาพที่ส่งข้อมูลแบบ real-time ไปยังแอปมือถือ",
          features: [
            "วัดอัตราการเต้นของหัวใจ",
            "ติดตามการออกกำลังกาย",
            "วัดระดับ SpO2",
            "แจ้งเตือนเมื่อมีความผิดปกติ",
            "แบตเตอรี่ใช้งานได้ 7 วัน"
          ],
          challenges: "การจัดการ power consumption และความแม่นยำของเซ็นเซอร์",
          results: "ความแม่นยำในการวัดเทียบเท่าอุปกรณ์ทางการแพทย์ 98%"
        },
        github: "https://github.com/username/health-monitor",
        demo: "https://health-monitor-demo.com"
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
              {/* Back Button */}
              <div className="container mx-auto px-6 pt-8">
                <button 
                  onClick={closeProjectDetails}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 mb-8 group"
                >
                  <ChevronRight className="w-5 h-5 rotate-180 transform group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="font-medium">Back to Projects</span>
                </button>
              </div>

              {/* Project Header */}
              <div className="relative mb-12">
                <div className="h-80 relative overflow-hidden">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.color} opacity-60`} />
                  
                  {/* Project Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div className="container mx-auto">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`p-4 rounded-xl bg-gradient-to-br ${selectedProject.color}`}>
                          {selectedProject.icon}
                        </div>
                        <div>
                          <h1 className="text-4xl font-bold text-white mb-2">{selectedProject.title}</h1>
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

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 font-medium"
                    >
                      <Github className="w-5 h-5" />
                      <span>View Code</span>
                    </a>
                    <a 
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 px-8 py-4 bg-white/10 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 font-medium"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Live Demo</span>
                    </a>
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
    </div>
  );
};

export default Portfolio;