"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AboutPage() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Hi, I'm Amrendra";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayText(fullText.substring(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 60);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-indigo-100 dark:selection:bg-indigo-900/40 font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Left: Photo */}
          <motion.div variants={fadeUp} className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#6366F1] to-[#a855f7] opacity-40 blur-md" />
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#6366F1]/20 shadow-2xl">
                <Image
                  src="/Profile photo.jpeg"
                  alt="Amrendra"
                  width={224}
                  height={224}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Hero Text */}
          <motion.div variants={fadeUp} className="text-center md:text-left">
            <div className="inline-block px-4 py-1.5 mb-6 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#6366F1] dark:text-[#818CF8] uppercase bg-[#6366F1]/10 dark:bg-[#6366F1]/15 rounded-full border border-[#6366F1]/20">
              About me
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-[1.1]">
              <span className="text-[var(--text-heading)]">{displayText.substring(0, 8)}</span>
              <span className="text-[#6366F1]">{displayText.substring(8)}</span>
              <span className="inline-block w-1 md:w-1.5 h-[0.8em] bg-[#6366F1] ml-2 align-middle animate-[blink_1s_infinite]"></span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[var(--text-body)] font-medium max-w-xl leading-relaxed">
              A <span className="text-[#6366F1] dark:text-[#818CF8] font-bold">Technical Content Writer</span> and <span className="text-[#6366F1] dark:text-[#818CF8] font-bold">Frontend Developer</span> passionate about building amazing web experiences and sharing knowledge with the community.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Bento Grid Content */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto border-t border-[rgba(255,255,255,0.05)] mt-12">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          {/* Story Card */}
          <motion.div variants={fadeUp} whileHover={{ y: -5 }} className="lg:col-span-2 bg-[var(--card-bg)] p-8 md:p-12 rounded-3xl border border-[rgba(255,255,255,0.05)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-3d)] transition-all duration-500 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-black text-[var(--text-heading)] mb-8 flex items-center gap-3">
              <span className="w-8 md:w-12 h-1.5 md:h-2 bg-gradient-to-r from-[#6366F1] to-[#a855f7] rounded-full"></span>
              My Story
            </h2>
            <div className="space-y-6 md:space-y-8">
              <p className="text-base md:text-lg text-[var(--text-body)] leading-relaxed">
                I'm a self-taught developer who started my journey by learning HTML, CSS, and JavaScript through online courses and building real-world projects. Over the past few years, I've developed a deep passion for frontend development and modern web technologies. What started as curiosity has turned into a full-fledged career where I constantly explore new frameworks, tools, and best practices in the web development ecosystem.
              </p>
              <p className="text-base md:text-lg text-[var(--text-body)] leading-relaxed">
                During my coding journey, I realized that learning in isolation wasn't fulfilling. I wanted to give back to the community that helped me grow. That's when I started creating content — blog posts, tutorials, and technical guides — to help other developers navigate the complexities of modern web development. Today, I blend my technical expertise with my passion for communication to create valuable, easy-to-understand content that empowers developers at all levels.
              </p>
              <p className="text-base md:text-lg text-[var(--text-body)] leading-relaxed">
                "Code with Amrendra" was born from this vision: to create a platform where developers can learn cutting-edge technologies, stay updated with industry trends, and connect with a like-minded community. Whether you're just starting your coding journey or looking to master advanced concepts, I'm here to guide you every step of the way. Let's build amazing things together!
              </p>
            </div>
          </motion.div>

          {/* Skills Card */}
          <motion.div variants={fadeUp} whileHover={{ y: -5 }} className="lg:col-span-1 bg-[var(--card-bg)] p-8 md:p-10 rounded-3xl border border-[rgba(255,255,255,0.05)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-3d)] transition-all duration-500">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--text-heading)] mb-8 flex items-center gap-3">
              <span className="w-8 h-1.5 md:h-2 bg-gradient-to-r from-[#6366F1] to-[#a855f7] rounded-full"></span>
              Expertise
            </h2>
            <div className="space-y-8">
              {[
                { name: "React/Next.js", percentage: 95 },
                { name: "Node.js", percentage: 85 },
                { name: "React Native", percentage: 80 },
                { name: "UI/UX (Figma)", percentage: 75 },
                { name: "Digital Marketing", percentage: 88 },
                { name: "TailwindCSS", percentage: 92 }
              ].map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-bold text-[var(--text-heading)]">{skill.name}</h3>
                    <span className="text-sm font-semibold text-[#6366F1] dark:text-[#818CF8]">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-[var(--section-alt-bg)] border border-[rgba(255,255,255,0.05)] rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#6366F1] to-[#a855f7] rounded-full transition-all duration-500 ease-out shadow-[var(--shadow-glow)]"
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[var(--card-border)]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            className="bg-gradient-to-br from-[#6366F1]/10 to-[#a855f7]/10 dark:from-[#6366F1]/5 dark:to-[#a855f7]/5 border border-[#6366F1]/20 rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-black text-[var(--text-heading)] mb-4">
              Ready to work together?
            </h2>
            <p className="text-base md:text-lg text-[var(--text-body)] mb-8 max-w-2xl mx-auto">
              Whether you need a website built, want to collaborate on a project, or just want to chat about web development, I'd love to hear from you!
            </p>
            <Link
              href="/hire-me"
              className="group inline-flex items-center gap-2 bg-gradient-to-br from-[#6366F1] to-[#a855f7] text-white font-bold text-base md:text-lg py-4 md:py-5 px-8 md:px-10 rounded-2xl transition-all duration-300 shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-float)] hover:-translate-y-1 hover:scale-105 no-underline"
            >
              Get in Touch
              <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
