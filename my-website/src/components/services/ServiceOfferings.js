'use client';

import { 
  Globe, 
  Zap, 
  Code, 
  Layout, 
  FileText, 
  Cpu, 
  Gauge, 
  Search, 
  Wrench, 
  Share2, 
  Key, 
  Sliders, 
  Link2, 
  BarChart3, 
  MessageSquare, 
  Workflow, 
  Layers, 
  Activity, 
  FileCheck, 
  Monitor, 
  Smartphone, 
  Eye, 
  Grid, 
  Target, 
  GitBranch, 
  Server, 
  DollarSign, 
  ShieldCheck, 
  BookOpen, 
  Compass, 
  BarChart 
} from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const OFFERING_ICON_MAP = {
  Globe, Zap, Code, Layout, FileText, Cpu, Gauge, Search,
  Wrench, Share2, Key, Sliders, Link2, BarChart3, MessageSquare,
  Workflow, Layers, Activity, FileCheck, Monitor, Smartphone,
  Eye, Grid, Target, GitBranch, Server, DollarSign, ShieldCheck,
  BookOpen, Compass, BarChart
};

export default function ServiceOfferings({ offerings = [], serviceTitle }) {
  return (
    <section className="py-20 bg-[var(--background)] border-b border-[var(--card-border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section Title */}
        <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#10B981] dark:text-[#34D399] bg-[#10B981]/10 px-3.5 py-1.5 rounded-full border border-[#10B981]/20 mb-4 inline-block">
            CORE CAPABILITIES
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-heading)] tracking-tight mt-3 mb-4">
            What We Offer in {serviceTitle}
          </h2>
          <p className="text-[var(--text-body)] text-base sm:text-lg leading-relaxed">
            Comprehensive technical solutions designed to meet your specific business requirements.
          </p>
        </AnimatedSection>

        {/* Offerings Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map((item, idx) => {
            const IconComponent = OFFERING_ICON_MAP[item.icon] || Code;
            return (
              <StaggerItem
                key={idx}
                className="group bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 transition-all duration-300 hover:border-[#10B981]/40 hover:shadow-[var(--shadow-hover)] hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] dark:text-[#34D399] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#10B981] group-hover:text-white transition-all duration-300">
                  <IconComponent size={22} />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-heading)] mb-2 group-hover:text-[#10B981] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
                  {item.description}
                </p>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
