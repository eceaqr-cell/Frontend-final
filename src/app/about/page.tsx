'use client';

import React, { useState } from 'react';

import {
  Menu, X, Zap, ShieldCheck,
  Cpu, Flame, ChevronDown, Battery, HardDrive,
  Users, GraduationCap, Star, Sparkles
} from 'lucide-react';

export default function AboutPage() {
  // Mobile menu state
  const [mobileMenu, setMobileMenu] = useState(false);

  // Hardware Inspector Modal state
  const [modalOpen, setModalOpen] = useState(false);

  // FAQ Accordion states
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const instructor = {
  name: 'MS, Srong Sokcheat',
  role: 'Instructor & Mentor',
  badge: 'Senior Technical Educator',
  bio: 'Dedicated to bridging high-performance computer engineering and hands-on technical education with over 15 years of industry and academic expertise.',
  image: '/pic/Intructor.png',
  tags: [
    'System Architecture',
    'Mentorship',
    'Hardware Engineering',
    'Thermal Design'
  ]
};

  // FAQ Data
  const faqs = [
    {
      q: "What warranty and support comes with NEXUS laptops?",
      a: "All NEXUS laptops come standard with a 3-Year Limited Hardware Warranty, 1-year on-site support, and lifetime hardware diagnostic assistance."
    },
    {
      q: "How do I customize RAM and NVMe storage options?",
      a: "Our laptops feature modular dual DDR5 SODIMM slots and dual PCIe 4.0 M.2 SSD slots for easy upgradeability without voiding your warranty."
    },
    {
      q: "What is the lead time for custom built gaming PCs?",
      a: "Custom desktop rigs undergo a 48-hour burn-in stress test and liquid loop pressure testing. Average turnaround is 3 to 5 business days."
    },
    {
      q: "Do you offer international shipping and customs clearance?",
      a: "Yes! We ship globally to over 60 countries with full duty calculation and insured express air freight."
    }
  ];

  // Team Data
  const team = [
    { name: 'Sun Rathanak Sathya', role: 'About • Contact', image: '/About-Conatct.jpg' },
    { name: 'Nen Makara', role: 'Homepage . Product', image: '/pic/Homepage.jpg' },
    { name: 'Chhao Chhannon', role: 'Login , Register , API', image: '/pic/API.jpg' },
    { name: 'Hai Heng Ravit', role: 'Contact', image: '/Contact2.jpg' },
    { name: 'Ban dendy', role: 'Contact', image: '/pic/Contact.jpg' },
    { name: 'Bunthoeun Sovannaraech', role: 'About', image: '/about.jpg' },
    { name: 'Lun Kimtri', role: 'Webdeveloper', image: '/Webdevloper.jpg' },
  ];

  return (
    <div className="theme-page min-h-screen flex flex-col bg-[#fcfdfd] text-slate-900 font-sans antialiased dark:bg-background dark:text-foreground">

      {/* 1. NAVBAR SECTION */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="pt-16 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
            Built for modern <br />
            <span className="text-teal-600">computing & laptop systems</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            NEXUS empowers creators, engineers, and gamers with custom laptop engineering, whisper-quiet liquid thermal dynamics, and top-tier silicon performance.
          </p>
        </div>

        {/* Hero Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div
            onClick={() => setModalOpen(true)}
            className="group relative h-60 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-sm cursor-pointer transform hover:-translate-y-1 transition duration-300"
          >
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
              alt="NEXUS Laptop"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-left text-white">
              <span className="text-[10px] uppercase font-bold tracking-widest text-teal-400">NEXUS Blade Pro</span>
              <span className="text-xs font-semibold">OLED 120Hz Workstation</span>
            </div>
          </div>

          <div
            onClick={() => setModalOpen(true)}
            className="group relative h-60 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-sm cursor-pointer transform hover:-translate-y-1 transition duration-300"
          >
            <img
              src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"
              alt="Custom PC Rig"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-left text-white">
              <span className="text-[10px] uppercase font-bold tracking-widest text-teal-400">Liquid Cooled Rig</span>
              <span className="text-xs font-semibold">RTX 4090 Custom Builds</span>
            </div>
          </div>

          <div
            onClick={() => setModalOpen(true)}
            className="group relative h-60 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-sm cursor-pointer transform hover:-translate-y-1 transition duration-300"
          >
            <img
              src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80"
              alt="Workspace Setup"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-left text-white">
              <span className="text-[10px] uppercase font-bold tracking-widest text-teal-400">Ecosystem</span>
              <span className="text-xs font-semibold">Thunderbolt 4 Hubs & Displays</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. METRICS SECTION */}
      <section className="py-12 border-t border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-widest mb-8 max-w-xl mx-auto">
            We are on a mission to empower organizations and creators through smarter, faster, and more efficient hardware across global operations.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
            <div className="p-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">25</div>
              <div className="text-[11px] text-slate-500 mt-1 font-medium">Design Tech Awards</div>
            </div>
            <div className="p-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">100+</div>
              <div className="text-[11px] text-slate-500 mt-1 font-medium">Custom Rig Builds</div>
            </div>
            <div className="p-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">~500</div>
              <div className="text-[11px] text-slate-500 mt-1 font-medium">Daily Laptops Shipped</div>
            </div>
            <div className="p-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">3,000</div>
              <div className="text-[11px] text-slate-500 mt-1 font-medium">Clients in 60+ Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURE SPOTLIGHTS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* Spotlight 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
              SOLUTION
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-3 mb-4">
              Delivering Certainty in Extreme Computing
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed text-xs sm:text-sm">
              NEXUS proprietary thermal dynamics keep high-TDP CPUs and GPUs running at peak boost clocks without throttling during multi-hour render jobs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200/80 bg-white shadow-sm">
                <Zap className="w-5 h-5 text-teal-600 mb-2" />
                <h4 className="text-xs font-bold text-slate-900">Faster Decisions</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">Instant performance BIOS turbo profiles.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200/80 bg-white shadow-sm">
                <ShieldCheck className="w-5 h-5 text-teal-600 mb-2" />
                <h4 className="text-xs font-bold text-slate-900">Sustainable Growth</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">Long-term durability with 3-year warranty.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80"
                alt="Laptop Thermal Engineering"
                className="w-full h-80 object-cover opacity-90"
              />
            </div>

            {/* Floating Metric Badges */}
            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-100 text-center min-w-[110px]">
              <div className="text-xl font-black text-slate-900">10x</div>
              <div className="text-[9px] text-slate-500 font-bold uppercase">Faster Decisions</div>
            </div>
            <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-100 text-center min-w-[110px]">
              <div className="text-xl font-black text-teal-600">95%</div>
              <div className="text-[9px] text-slate-500 font-bold uppercase">Thermal Efficiency</div>
            </div>
          </div>
        </div>

        {/* Spotlight 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=1000&q=80"
                alt="PC Custom Assembly"
                className="w-full h-80 object-cover opacity-90"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
              SOLUTION
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-3 mb-4">
              Unparalleled Customization Experience
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed text-xs sm:text-sm">
              We bring over a decade of computer engineering experience delivering consistent high-performance laptops and custom PC rigs tailored to your needs.
            </p>

            <div className="space-y-3 text-xs text-slate-700 font-semibold">
              <div className="flex items-center gap-3">
                <Cpu className="w-4 h-4 text-teal-600" /> Deep Silicon Binning & Overclock Tuning
              </div>
              <div className="flex items-center gap-3">
                <Flame className="w-4 h-4 text-teal-600" /> Custom Silent Liquid Cooling & Thermal Curves
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 4. INSTRUCTOR CARD SECTION (OVER / ABOVE TEAM) */}
      <section className="py-16 bg-slate-50/70 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-teal-700 uppercase tracking-widest bg-teal-100/70 px-3.5 py-1 rounded-full border border-teal-200/80 mb-3 shadow-xs">
              <GraduationCap className="w-4 h-4 text-teal-600" /> ACADEMIC INSTRUCTOR
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Our Honored Instructor</h2>
            <p className="text-xs text-slate-500 mt-1">Leading our learning path and inspiring team friendship & collaboration.</p>
          </div>

          {/* Dedicated Instructor Card */}
          <div className="max-w-3xl mx-auto mb-16 bg-gradient-to-br from-white via-teal-50/40 to-slate-50 dark:from-card dark:via-teal-950/30 dark:to-muted rounded-3xl p-6 sm:p-8 border-2 border-teal-500/30 shadow-xl relative overflow-hidden">
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 relative z-10">

              {/* Photo Frame */}
            <div className="relative shrink-0">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-teal-600">
            <img
             src={instructor.image}
             alt={instructor.name}
             className="w-full h-full object-cover object-center"
            />
             </div>

  <div className="absolute -bottom-3 -right-3 bg-teal-600 text-white p-2 rounded-xl shadow border-2 border-white flex items-center justify-center">
    <Sparkles className="w-4 h-4" />
  </div>
</div>

              {/* Bio & Details */}
              <div className="text-center md:text-left space-y-2 flex-1">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-teal-700 bg-teal-100/90 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                  <Star className="w-3 h-3 fill-teal-600 text-teal-600" /> {instructor.badge}
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {instructor.name}
                </h3>
                <p className="text-xs font-bold text-teal-600 uppercase tracking-widest">
                  {instructor.role}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pt-1">
                  &quot;{instructor.bio}&quot;
                </p>

                {/* Skill / Value Pills */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
                  {instructor.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-semibold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                      <Users className="w-3 h-3 text-teal-600" /> {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 5. TEAM SECTION */}
      <section className="py-16 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">TEAM</span>
          <h2 className="text-3xl font-bold text-slate-900 mt-1 mb-2">Meet the NEXUS people</h2>
          <p className="text-xs text-slate-500 mb-12">We deliver reliable computing hardware solutions for a high-performance future.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover mb-3 border-2 border-slate-100 shadow-sm"
                />
                <h3 className="font-bold text-slate-900 text-sm">{member.name}</h3>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Question</h2>
          <p className="text-xs text-slate-500 mt-2">Clear answers to common questions about our platform, features, and support.</p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left px-5 py-4 font-semibold text-xs text-slate-800 flex justify-between items-center hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0"></span>
                  <span>{faq.q}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-teal-600' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 pl-10">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. HARDWARE MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl border border-slate-200">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">SPECIFICATION SHEET</span>
            <h3 className="text-xl font-bold text-slate-900 mt-1 mb-4">NEXUS Blade Pro Laptop</h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <Cpu className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Intel Core i9-14900HX</div>
                  <div className="text-slate-500">24 Cores, 32 Threads, up to 5.8 GHz Turbo Clock.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <HardDrive className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">64GB DDR5 RAM + 2TB Gen4 NVMe</div>
                  <div className="text-slate-500">7000 MB/s high-speed SSD read and render performance.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <Battery className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">99.9 Whr Battery + Fast Charging</div>
                  <div className="text-slate-500">Maximum flight-allowed battery capacity with 140W USB-C GaN fast charge.</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setModalOpen(false)}
              className="w-full mt-6 bg-teal-600 text-white font-semibold py-2.5 rounded-xl hover:bg-teal-700 transition text-xs shadow-md shadow-teal-500/20"
            >
              Close Spec Sheet
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
