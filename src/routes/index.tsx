import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaGithub,
  FaBootstrap, FaFigma, FaLinkedin, FaFacebook, FaInstagram, FaTwitter,
  FaDownload, FaEnvelope, FaArrowUp, FaSun, FaMoon, FaMapMarkerAlt,
  FaCode, FaMobileAlt, FaRocket, FaPaintBrush, FaBolt, FaQuoteLeft,
  FaStar, FaExternalLinkAlt, FaBars, FaTimes, FaChevronDown,
} from "react-icons/fa";
import { SiExpress, SiMongodb, SiFirebase, SiTailwindcss, SiTypescript } from "react-icons/si";
import { HiOutlineSparkles } from "react-icons/hi2";

import profileImg from "@/assets/israt-profile.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";

export const Route = createFileRoute("/")({
  component: PortfolioPage,
});

/* -------------------------- Data -------------------------- */

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const SKILLS = [
  { name: "HTML5", icon: FaHtml5, level: 95, color: "#E44D26" },
  { name: "CSS3", icon: FaCss3Alt, level: 92, color: "#1572B6" },
  { name: "JavaScript", icon: FaJs, level: 90, color: "#F7DF1E" },
  { name: "React", icon: FaReact, level: 93, color: "#61DAFB" },
  { name: "Node.js", icon: FaNodeJs, level: 82, color: "#3C873A" },
  { name: "Express", icon: SiExpress, level: 80, color: "#ffffff" },
  { name: "MongoDB", icon: SiMongodb, level: 78, color: "#47A248" },
  { name: "Firebase", icon: SiFirebase, level: 84, color: "#FFCA28" },
  { name: "TypeScript", icon: SiTypescript, level: 85, color: "#3178C6" },
  { name: "Tailwind", icon: SiTailwindcss, level: 94, color: "#38BDF8" },
  { name: "Bootstrap", icon: FaBootstrap, level: 88, color: "#7952B3" },
  { name: "Git & GitHub", icon: FaGithub, level: 90, color: "#ffffff" },
];

const SERVICES = [
  { icon: FaCode, title: "Frontend Development", desc: "Pixel-perfect, performant interfaces built with React, TypeScript and modern tooling." },
  { icon: FaMobileAlt, title: "Responsive Websites", desc: "Fluid layouts that shine on every device — mobile-first, accessible, and fast." },
  { icon: FaPaintBrush, title: "UI / UX Design", desc: "Beautiful design systems, prototypes and interactions that users actually love." },
  { icon: FaReact, title: "React Development", desc: "Scalable component architecture, custom hooks and animation-rich SPAs." },
  { icon: FaBolt, title: "Web Optimization", desc: "Core Web Vitals, lazy loading, code-splitting — websites that fly." },
  { icon: FaRocket, title: "Launch & Deploy", desc: "CI/CD, edge hosting and analytics so your product ships confidently." },
];

const PROJECTS = [
  { img: p1, title: "Nebula Dashboard", desc: "A glassmorphic analytics dashboard with real-time charts.", tech: ["React", "TypeScript"], category: "React" },
  { img: p2, title: "Aurora Commerce", desc: "Modern e-commerce storefront with slick checkout.", tech: ["React", "Node.js", "Mongo"], category: "Full Stack" },
  { img: p3, title: "Halo Chat", desc: "Realtime messaging app with playful micro-interactions.", tech: ["JavaScript", "Firebase"], category: "JavaScript" },
  { img: p4, title: "Studio Portfolio", desc: "Award-style portfolio template with parallax reveals.", tech: ["React", "GSAP"], category: "React" },
  { img: p5, title: "Pulse Analytics", desc: "SaaS analytics platform with role-based dashboards.", tech: ["React", "Node.js"], category: "Full Stack" },
  { img: p6, title: "Bento Eats", desc: "Food delivery experience with a joyful mobile UI.", tech: ["JavaScript", "Tailwind"], category: "JavaScript" },
];

const PROJECT_FILTERS = ["All", "React", "JavaScript", "Full Stack"] as const;

const TIMELINE = [
  { year: "2024 — Now", title: "Freelance Frontend Developer", place: "Remote", desc: "Shipping premium client sites and product UIs with a focus on animation and craft.", tag: "Work" },
  { year: "2023 — 2024", title: "Frontend Engineer Intern", place: "Nova Labs", desc: "Built and maintained a design system used across 12 internal products.", tag: "Internship" },
  { year: "2022", title: "Hackathon — Best Design", place: "CodeFest", desc: "Awarded for a collaborative real-time whiteboard app.", tag: "Achievement" },
  { year: "2020 — 2024", title: "B.Sc. in Computer Science", place: "University", desc: "Graduated with distinction. Focused on human-computer interaction.", tag: "Education" },
];

const CERTIFICATES = [
  { title: "Meta Frontend Developer", issuer: "Coursera", year: "2024" },
  { title: "Advanced React & Redux", issuer: "Udemy", year: "2024" },
  { title: "UI/UX Design Specialization", issuer: "CalArts", year: "2023" },
  { title: "Responsive Web Design", issuer: "freeCodeCamp", year: "2023" },
];

const TESTIMONIALS = [
  { name: "Ayaan R.", role: "Product Manager, Nova", rating: 5, text: "Israt turned our vague brief into a stunning, animated product page. Conversions jumped 32%." },
  { name: "Priya M.", role: "Founder, Halo", rating: 5, text: "Rare combination of design taste and clean code. Delivered on time and exceeded expectations." },
  { name: "Marcus L.", role: "CTO, Pulse", rating: 5, text: "One of the most detail-obsessed frontend devs I've worked with. Micro-interactions everywhere." },
];

const STATS = [
  { value: 45, suffix: "+", label: "Projects Completed" },
  { value: 30, suffix: "+", label: "Happy Clients" },
  { value: 3,  suffix: "y", label: "Years Experience" },
  { value: 12, suffix: "+", label: "Certificates" },
];

/* -------------------------- Root -------------------------- */

function PortfolioPage() {
  const [dark, setDark] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (stored === "light") setDark(false);
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("light", !dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="relative min-h-screen text-foreground overflow-x-clip">
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>
      <CursorGlow />
      <ScrollProgress />
      <AnimatedBackground />
      <Navbar dark={dark} setDark={setDark} />
      <main className="relative">
        <Hero />
        <About />
        <Stats />
        <Skills />
        <Services />
        <Projects />
        <Experience />
        <Certificates />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

/* -------------------------- Chrome -------------------------- */

function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-2 border-transparent animate-spin-slow"
             style={{ borderTopColor: "#6366F1", borderRightColor: "#EC4899" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl font-bold gradient-text">I</span>
        </div>
      </div>
    </motion.div>
  );
}

function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 200, damping: 25 });
  const sy = useSpring(y, { stiffness: 200, damping: 25 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 mix-blend-screen blur-3xl hidden md:block"
      style={{
        x: sx, y: sy,
        background: "radial-gradient(circle, rgba(139,92,246,0.55), rgba(236,72,153,0.25) 40%, transparent 70%)",
      }}
    />
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="fixed left-0 top-0 z-[70] h-[3px] w-full origin-left"
      style={{ scaleX, backgroundImage: "var(--gradient-brand)" }}
    />
  );
}

function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-mesh opacity-70" />
      <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full animate-blob"
           style={{ background: "radial-gradient(circle, #6366F1, transparent 65%)", filter: "blur(60px)" }} />
      <div className="absolute top-1/3 -right-32 h-[500px] w-[500px] rounded-full animate-blob"
           style={{ background: "radial-gradient(circle, #EC4899, transparent 65%)", filter: "blur(70px)", animationDelay: "3s" }} />
      <div className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full animate-blob"
           style={{ background: "radial-gradient(circle, #8B5CF6, transparent 65%)", filter: "blur(60px)", animationDelay: "6s" }} />
      {/* grid overlay */}
      <div className="absolute inset-0 opacity-[0.05]"
           style={{
             backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
             backgroundSize: "48px 48px",
           }} />
    </div>
  );
}

function Navbar({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const y = window.scrollY + 120;
      for (const item of NAV) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) {
          setActive(item.id);
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 md:px-8 py-3 transition-all ${scrolled ? "glass shadow-[var(--shadow-soft)]" : ""} mx-4`}>
        <button onClick={() => go("home")} className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl text-white font-bold"
                style={{ backgroundImage: "var(--gradient-brand)" }}>I</span>
          <span className="font-display text-lg font-semibold">Israt<span className="gradient-text">.</span></span>
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {n.label}
              {active === n.id && (
                <motion.span layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{ backgroundImage: "var(--gradient-brand-soft)" }} />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle theme"
            onClick={() => setDark(!dark)}
            className="grid h-10 w-10 place-items-center rounded-full glass hover:scale-110 transition"
          >
            {dark ? <FaSun /> : <FaMoon />}
          </button>
          <button
            onClick={() => go("contact")}
            className="hidden sm:inline-flex rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition hover:scale-105"
            style={{ backgroundImage: "var(--gradient-brand)" }}
          >
            Let's Talk
          </button>
          <button
            aria-label="Menu"
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full glass"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mx-4 mt-2 glass rounded-3xl p-4"
          >
            {NAV.map((n) => (
              <button key={n.id} onClick={() => go(n.id)}
                className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium hover:bg-white/5">
                {n.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full text-white shadow-[var(--shadow-glow)]"
          style={{ backgroundImage: "var(--gradient-brand)" }}
          aria-label="Back to top"
        >
          <FaArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* -------------------------- Reusable -------------------------- */

function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-14 max-w-2xl text-center"
    >
      <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        <HiOutlineSparkles className="text-accent" /> {eyebrow}
      </span>
      <h2 className="mt-4 text-4xl md:text-5xl font-bold">
        <span className="gradient-text">{title}</span>
      </h2>
      {desc && <p className="mt-4 text-muted-foreground">{desc}</p>}
    </motion.div>
  );
}

function TypingText({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = words[i % words.length];
    const speed = del ? 45 : 90;
    const t = setTimeout(() => {
      if (!del) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setDel(true), 1200);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDel(false); setI(i + 1); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i, words]);

  return (
    <span className="gradient-text">
      {text}
      <span className="ml-1 inline-block w-[3px] h-[1em] align-middle bg-accent animate-pulse" />
    </span>
  );
}

/* -------------------------- Hero -------------------------- */

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 px-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 gap-14 items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for freelance
          </span>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold leading-[1.05]">
            Hi, I'm <span className="gradient-text">Israt</span>
            <br />
            <span className="text-foreground/90">a </span>
            <TypingText words={["Frontend Dev", "UI/UX Designer", "React Engineer", "Creative Coder"]} />
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            I design and build premium, animated web experiences that feel alive — where craft, motion and code meet.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton primary onClick={() => scrollTo("contact")}>
              <FaEnvelope /> Contact Me
            </MagneticButton>
            <MagneticButton onClick={() => window.print()}>
              <FaDownload /> Download CV
            </MagneticButton>
          </div>
          <div className="mt-10 flex items-center gap-5 text-muted-foreground">
            <a href="#" className="hover:text-foreground transition"><FaGithub size={20} /></a>
            <a href="#" className="hover:text-foreground transition"><FaLinkedin size={20} /></a>
            <a href="#" className="hover:text-foreground transition"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-foreground transition"><FaInstagram size={20} /></a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mx-auto"
        >
          <div className="relative h-[380px] w-[380px] md:h-[460px] md:w-[460px]">
            <div className="absolute inset-0 rounded-full animate-spin-slow"
                 style={{ background: "conic-gradient(from 0deg, #6366F1, #8B5CF6, #EC4899, #6366F1)" }} />
            <div className="absolute inset-[4px] rounded-full bg-background" />
            <img
              src={profileImg}
              alt="Israt"
              className="absolute inset-[14px] rounded-full object-cover glow-ring"
              width={460} height={460}
            />
            {/* Floating chips */}
            <motion.div className="absolute -top-4 -left-6 glass rounded-2xl px-4 py-2 text-sm flex items-center gap-2 animate-float">
              <FaReact className="text-[#61DAFB]" /> React
            </motion.div>
            <motion.div className="absolute top-1/3 -right-8 glass rounded-2xl px-4 py-2 text-sm flex items-center gap-2 animate-float" style={{ animationDelay: "1.5s" }}>
              <FaCode className="text-accent" /> Clean Code
            </motion.div>
            <motion.div className="absolute -bottom-2 left-6 glass rounded-2xl px-4 py-2 text-sm flex items-center gap-2 animate-float" style={{ animationDelay: "3s" }}>
              <FaPaintBrush className="text-secondary" /> UI Design
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.button
        aria-label="Scroll"
        onClick={() => scrollTo("about")}
        className="absolute left-1/2 bottom-6 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <FaChevronDown />
      </motion.button>
    </section>
  );
}

function MagneticButton({
  children, onClick, primary,
}: { children: React.ReactNode; onClick?: () => void; primary?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handle = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const leave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      style={{
        x: sx, y: sy,
        backgroundImage: primary ? "var(--gradient-brand)" : undefined,
      }}
      onMouseMove={handle}
      onMouseLeave={leave}
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
        primary
          ? "text-white shadow-[var(--shadow-glow)]"
          : "glass hover:bg-white/10 text-foreground"
      }`}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.button>
  );
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* -------------------------- About -------------------------- */

function About() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="About Me" title="Crafting delightful digital things" />
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="lg:col-span-2 glass rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full"
                 style={{ backgroundImage: "var(--gradient-brand)", filter: "blur(40px)", opacity: 0.5 }} />
            <img src={profileImg} alt="Israt" className="h-28 w-28 rounded-2xl object-cover" width={112} height={112} />
            <h3 className="mt-5 text-2xl font-bold">Israt</h3>
            <p className="text-muted-foreground">Frontend Developer · UI Designer</p>
            <div className="mt-6 space-y-2 text-sm">
              <Row k="Location" v="Dhaka, Bangladesh" />
              <Row k="Email" v="hello@israt.dev" />
              <Row k="Experience" v="3+ Years" />
              <Row k="Freelance" v="Available" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-3 space-y-5"
          >
            <p className="text-lg leading-relaxed">
              I'm a frontend developer who lives at the intersection of{" "}
              <span className="gradient-text font-semibold">design</span> and{" "}
              <span className="gradient-text font-semibold">code</span>.
              For the past few years I've helped startups and creators launch
              beautifully-crafted, high-performing products — from marketing
              sites to full SaaS dashboards.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When I'm not coding you'll find me sketching interfaces, exploring
              motion design, or geeking out over color palettes.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <Feature icon={FaBolt} title="Fast" desc="Snappy UIs, obsessed with Core Web Vitals." />
              <Feature icon={FaPaintBrush} title="Design-led" desc="Every pixel considered — motion included." />
              <Feature icon={FaCode} title="Clean Code" desc="Typed, modular and easy to iterate on." />
              <Feature icon={FaRocket} title="Shipping" desc="From Figma to production — end to end." />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-white/10 pb-1.5">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }: { icon: React.ComponentType<{className?: string}>; title: string; desc: string }) {
  return (
    <div className="glass rounded-2xl p-4 hover:-translate-y-1 transition">
      <div className="grid h-10 w-10 place-items-center rounded-xl text-white"
           style={{ backgroundImage: "var(--gradient-brand)" }}>
        <Icon className="text-lg" />
      </div>
      <div className="mt-3 font-semibold">{title}</div>
      <div className="text-sm text-muted-foreground">{desc}</div>
    </div>
  );
}

/* -------------------------- Stats -------------------------- */

function Stats() {
  return (
    <section className="py-10 px-6">
      <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass rounded-3xl p-6 text-center hover:-translate-y-1 transition"
          >
            <div className="text-4xl md:text-5xl font-bold gradient-text">
              <Counter to={s.value} />{s.suffix}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1400; const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(p * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n}</span>;
}

/* -------------------------- Skills -------------------------- */

function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Skills" title="Tools I work with daily" desc="A toolkit I've curated across years of shipping." />
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.04 }}
              whileHover={{ y: -6 }}
              className="group relative glass rounded-3xl p-5 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                   style={{ background: `radial-gradient(circle at 50% 0%, ${s.color}33, transparent 60%)` }} />
              <div className="relative flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl glass" style={{ color: s.color }}>
                  <s.icon className="text-2xl" />
                </div>
                <div>
                  <div className="font-semibold">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.level}% Proficiency</div>
                </div>
              </div>
              <div className="relative mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }} whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.1 + i * 0.04 }}
                  className="h-full rounded-full"
                  style={{ backgroundImage: "var(--gradient-brand)" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- Services -------------------------- */

function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Services" title="What I can build for you" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6, delay: i * 0.05 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl p-[1.5px] overflow-hidden"
              style={{ backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.02))" }}
            >
              <div className="relative h-full glass rounded-[calc(1.5rem-1.5px)] p-7 overflow-hidden">
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 group-hover:opacity-70 transition"
                     style={{ backgroundImage: "var(--gradient-brand)", filter: "blur(40px)" }} />
                <div className="relative">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl text-white shadow-[var(--shadow-glow)]"
                       style={{ backgroundImage: "var(--gradient-brand)" }}>
                    <s.icon className="text-2xl" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  <div className="mt-5 text-sm gradient-text font-semibold inline-flex items-center gap-1">
                    Learn more →
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- Projects -------------------------- */

function Projects() {
  const [filter, setFilter] = useState<typeof PROJECT_FILTERS[number]>("All");
  const filtered = useMemo(
    () => filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filter),
    [filter]
  );

  return (
    <section id="projects" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Projects" title="Selected work" desc="A curated set of recent builds." />
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {PROJECT_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative rounded-full px-5 py-2 text-sm font-medium transition ${
                filter === f ? "text-white" : "glass hover:bg-white/10"
              }`}
            >
              {filter === f && (
                <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full"
                  style={{ backgroundImage: "var(--gradient-brand)" }} />
              )}
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.title} p={p} i={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ p, i }: { p: typeof PROJECTS[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0); const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 12); rx.set(-py * 12);
  };
  const leave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: i * 0.05 }}
      className="group"
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={leave}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-3xl p-[1.5px]"
      >
        <div className="absolute inset-0 rounded-3xl opacity-70 group-hover:opacity-100 transition"
             style={{ backgroundImage: "linear-gradient(135deg, #6366F1, #8B5CF6, #EC4899)" }} />
        <div className="relative rounded-[calc(1.5rem-1.5px)] bg-card overflow-hidden">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img src={p.img} alt={p.title} loading="lazy" width={1024} height={768}
                 className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                 style={{ background: "linear-gradient(180deg, transparent, rgba(15,23,42,0.85))" }} />
            <div className="absolute inset-x-4 bottom-4 flex gap-2 opacity-0 group-hover:opacity-100 transition translate-y-2 group-hover:translate-y-0">
              <a href="#" className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs font-medium">
                <FaGithub /> Code
              </a>
              <a href="#" className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white"
                 style={{ backgroundImage: "var(--gradient-brand)" }}>
                <FaExternalLinkAlt /> Live
              </a>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <span className="text-xs rounded-full glass px-2 py-1">{p.category}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.tech.map(t => (
                <span key={t} className="text-[11px] rounded-full glass px-2 py-0.5">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------- Experience -------------------------- */

function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="Journey" title="Experience & Education" />
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 rounded-full"
               style={{ backgroundImage: "linear-gradient(180deg, #6366F1, #EC4899)" }} />
          <div className="space-y-10">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.6 }}
                className={`relative md:grid md:grid-cols-2 md:gap-10 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div className={`pl-14 md:pl-0 ${i % 2 ? "md:text-left md:pl-10" : "md:text-right md:pr-10"}`}>
                  <div className="glass rounded-3xl p-6 inline-block text-left">
                    <span className="inline-block text-xs uppercase tracking-widest gradient-text font-semibold">{t.tag}</span>
                    <h3 className="mt-1 text-xl font-semibold">{t.title}</h3>
                    <div className="text-sm text-muted-foreground">{t.place} · {t.year}</div>
                    <p className="mt-2 text-sm">{t.desc}</p>
                  </div>
                </div>
                <span className="absolute left-4 md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 grid h-7 w-7 place-items-center rounded-full text-white text-xs font-bold shadow-[var(--shadow-glow)]"
                      style={{ backgroundImage: "var(--gradient-brand)" }}>
                  {i + 1}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- Certificates -------------------------- */

function Certificates() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Certificates" title="Continuous learning" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CERTIFICATES.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ scale: 1.03 }}
              className="group relative glass rounded-3xl p-6 overflow-hidden"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:animate-shine"
                   style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }} />
              <div className="grid h-12 w-12 place-items-center rounded-2xl text-white"
                   style={{ backgroundImage: "var(--gradient-brand)" }}>
                <FaStar />
              </div>
              <h3 className="mt-4 font-semibold leading-tight">{c.title}</h3>
              <div className="mt-1 text-sm text-muted-foreground">{c.issuer} · {c.year}</div>
              <button className="mt-4 text-sm gradient-text font-semibold">View →</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- Testimonials -------------------------- */

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[i];

  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeader eyebrow="Testimonials" title="Kind words from clients" />
        <div className="relative glass rounded-3xl p-8 md:p-12 text-center overflow-hidden">
          <FaQuoteLeft className="mx-auto text-4xl gradient-text" />
          <AnimatePresence mode="wait">
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mt-6 text-lg md:text-xl leading-relaxed">"{t.text}"</p>
              <div className="mt-6 flex justify-center gap-1 text-amber-400">
                {Array.from({ length: t.rating }).map((_, k) => <FaStar key={k} />)}
              </div>
              <div className="mt-4 font-semibold">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.role}</div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((_, k) => (
              <button key={k} onClick={() => setI(k)}
                aria-label={`Testimonial ${k + 1}`}
                className={`h-2 rounded-full transition-all ${i === k ? "w-8" : "w-2 bg-white/20"}`}
                style={i === k ? { backgroundImage: "var(--gradient-brand)" } : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- Contact -------------------------- */

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (form.subject.trim().length < 3) e.subject = "Subject too short";
    if (form.message.trim().length < 10) e.message = "Message too short";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Contact" title="Let's build something" desc="Have a project in mind? Let's talk." />
        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="glass rounded-3xl p-6 flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ backgroundImage: "var(--gradient-brand)" }}>
                <FaEnvelope />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Email</div>
                <div className="font-semibold">hello@israt.dev</div>
              </div>
            </div>
            <div className="glass rounded-3xl p-6 flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ backgroundImage: "var(--gradient-brand)" }}>
                <FaMapMarkerAlt />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Location</div>
                <div className="font-semibold">Dhaka, Bangladesh</div>
              </div>
            </div>
            <div className="glass rounded-3xl overflow-hidden">
              <iframe
                title="Map"
                src="https://www.google.com/maps?q=Dhaka&output=embed"
                className="w-full h-56 border-0"
                loading="lazy"
              />
            </div>
            <div className="glass rounded-3xl p-6 flex items-center justify-around text-xl">
              {[FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaTwitter].map((Ic, i) => (
                <a key={i} href="#" className="hover:gradient-text transition"><Ic /></a>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="lg:col-span-3 glass rounded-3xl p-6 md:p-8 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" error={errors.name}>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="input" placeholder="Your name" maxLength={80} />
              </Field>
              <Field label="Email" error={errors.email}>
                <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="input" placeholder="you@email.com" maxLength={120} />
              </Field>
            </div>
            <Field label="Subject" error={errors.subject}>
              <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                className="input" placeholder="What's it about?" maxLength={120} />
            </Field>
            <Field label="Message" error={errors.message}>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                rows={5} className="input resize-none" placeholder="Tell me about your project…" maxLength={1000} />
            </Field>
            <button type="submit"
              className="relative inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow)] hover:scale-[1.02] transition"
              style={{ backgroundImage: "var(--gradient-brand)" }}>
              Send Message
            </button>
            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="rounded-2xl bg-emerald-500/15 text-emerald-300 px-4 py-3 text-sm"
                >
                  ✓ Thanks! Your message has been sent.
                </motion.div>
              )}
            </AnimatePresence>
            <style>{`
              .input {
                width: 100%;
                border-radius: 1rem;
                background: rgba(255,255,255,0.05);
                border: 1px solid rgba(255,255,255,0.12);
                padding: 0.85rem 1rem;
                font-size: 0.9rem;
                color: inherit;
                outline: none;
                transition: border-color .2s, box-shadow .2s;
              }
              .input::placeholder { color: rgba(255,255,255,0.4); }
              .input:focus {
                border-color: rgba(139,92,246,0.6);
                box-shadow: 0 0 0 4px rgba(139,92,246,0.15);
              }
            `}</style>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="text-xs text-rose-400 mt-1 inline-block">{error}</span>}
    </label>
  );
}

/* -------------------------- Footer -------------------------- */

function Footer() {
  return (
    <footer className="relative pt-16 pb-8 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="glass rounded-3xl p-8 md:p-10 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl text-white font-bold"
                    style={{ backgroundImage: "var(--gradient-brand)" }}>I</span>
              <span className="font-display text-lg font-semibold">Israt<span className="gradient-text">.</span></span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Frontend developer crafting animated, premium web experiences.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold mb-3">Quick Links</div>
            <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              {NAV.map(n => (
                <li key={n.id}>
                  <button onClick={() => scrollTo(n.id)} className="hover:gradient-text">{n.label}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold mb-3">Social</div>
            <div className="flex gap-3">
              {[FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaTwitter].map((Ic, i) => (
                <a key={i} href="#"
                   className="grid h-10 w-10 place-items-center rounded-full glass hover:-translate-y-1 transition">
                  <Ic />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Israt. Crafted with <span className="gradient-text font-semibold">love</span> & React.
        </div>
      </div>
    </footer>
  );
}
