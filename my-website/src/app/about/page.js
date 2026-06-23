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
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-indigo-100 dark:selection:bg-indigo-900/40 font-sans overflow-x-hidden">
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

      {/* Story Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[var(--card-border)]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-heading)] mb-10 md:mb-14 flex items-center gap-3">
            <span className="w-12 md:w-16 h-1.5 md:h-2 bg-gradient-to-r from-[#6366F1] to-[#a855f7] rounded-full"></span>
            My Story
          </motion.h2>

          <div className="space-y-6 md:space-y-8">
            <motion.p variants={fadeUp} className="text-base md:text-lg text-[var(--text-body)] leading-relaxed">
              I'm a self-taught developer who started my journey by learning HTML, CSS, and JavaScript through online courses and building real-world projects. Over the past few years, I've developed a deep passion for frontend development and modern web technologies. What started as curiosity has turned into a full-fledged career where I constantly explore new frameworks, tools, and best practices in the web development ecosystem.
            </motion.p>

            <motion.p variants={fadeUp} className="text-base md:text-lg text-[var(--text-body)] leading-relaxed">
              During my coding journey, I realized that learning in isolation wasn't fulfilling. I wanted to give back to the community that helped me grow. That's when I started creating content — blog posts, tutorials, and technical guides — to help other developers navigate the complexities of modern web development. Today, I blend my technical expertise with my passion for communication to create valuable, easy-to-understand content that empowers developers at all levels.
            </motion.p>

            <motion.p variants={fadeUp} className="text-base md:text-lg text-[var(--text-body)] leading-relaxed">
              "Code with Amrendra" was born from this vision: to create a platform where developers can learn cutting-edge technologies, stay updated with industry trends, and connect with a like-minded community. Whether you're just starting your coding journey or looking to master advanced concepts, I'm here to guide you every step of the way. Let's build amazing things together!
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[var(--card-border)]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-heading)] mb-10 md:mb-14 flex items-center gap-3">
            <span className="w-12 md:w-16 h-1.5 md:h-2 bg-gradient-to-r from-[#6366F1] to-[#a855f7] rounded-full"></span>
            Skills &amp; Expertise
          </motion.h2>
          <div className="space-y-8 md:space-y-10">
            {[
              { name: "React/Next.js", percentage: 95 },
              { name: "Node.js", percentage: 85 },
              { name: "React Native", percentage: 80 },
              { name: "UI/UX (Figma)", percentage: 75 },
              { name: "Digital Marketing", percentage: 88 },
              { name: "TailwindCSS", percentage: 92 }
            ].map((skill) => (
              <motion.div key={skill.name} variants={fadeUp}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg md:text-xl font-bold text-[var(--text-heading)]">{skill.name}</h3>
                  <span className="text-sm md:text-base font-semibold text-[#6366F1] dark:text-[#818CF8]">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-[var(--section-alt-bg)] border border-[var(--card-border)] rounded-full h-2.5 md:h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#6366F1] to-[#a855f7] rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${skill.percentage}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
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
              className="group inline-flex items-center gap-2 bg-gradient-to-br from-[#6366F1] to-[#a855f7] text-white font-bold text-base md:text-lg py-3 md:py-4 px-8 md:px-10 rounded-full transition-all duration-300 hover:shadow-[0_10px_30px_rgba(99,102,241,0.4)] hover:-translate-y-1 hover:opacity-95 no-underline"
            >
              Get in Touch
              <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
