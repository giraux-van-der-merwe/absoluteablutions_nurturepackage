"use client";

import Image from "next/image";
import { useState, useEffect, useRef, ReactNode } from "react";

// ─── Animation wrapper ────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="h-px w-8 bg-[#D48442]" />
      <span
        className="text-xs font-bold tracking-[0.16em] uppercase text-[#D48442]"
        style={{ fontFamily: "var(--font-archivo)" }}
      >
        {children}
      </span>
    </div>
  );
}

function LayerTag({ number, label }: { number: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-5">
      <div
        className="w-7 h-7 rounded-full bg-[#D48442] flex items-center justify-center text-[#FAF6EF] text-xs font-bold"
        style={{ fontFamily: "var(--font-archivo)" }}
      >
        {number}
      </div>
      <span
        className="text-[#D48442] text-xs font-bold tracking-[0.16em] uppercase"
        style={{ fontFamily: "var(--font-archivo)" }}
      >
        Layer {label}
      </span>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header({
  simplified,
  onToggle,
}: {
  simplified: boolean;
  onToggle: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLight = scrolled || simplified;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[#FAF6EF]/95 backdrop-blur-sm shadow-sm border-b border-[#D8C8B4]"
    >
      <div className="max-w-[1160px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Image
          src="/logo.png"
          alt="Desert Signal"
          width={152}
          height={38}
          className="h-8 w-auto object-contain"
          priority
        />
        <div className="flex items-center gap-4">
          <span
            className="text-sm font-medium hidden sm:block text-[#4A2812]"
            style={{ fontFamily: "var(--font-archivo)" }}
          >
            Prepared for Absolute Ablutions
          </span>
          <button
            onClick={onToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300 border ${
              simplified
                ? "bg-[#4A2812] text-[#FAF6EF] border-[#4A2812]"
                : "bg-transparent text-[#4A2812]/60 border-[#D8C8B4] hover:border-[#4A2812] hover:text-[#4A2812]"
            }`}
            style={{ fontFamily: "var(--font-archivo)" }}
          >
            {simplified ? (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <span className="hidden sm:inline">Full View</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <line x1="2" y1="3" x2="12" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="2" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="2" y1="11" x2="9" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="hidden sm:inline">Simplify</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative bg-[#2B1A10] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 56px, rgba(212,132,66,0.6) 56px, rgba(212,132,66,0.6) 57px)",
        }}
      />
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-[#D48442]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1160px] mx-auto px-6 pt-36 pb-0">
        <FadeIn delay={0}>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span
              className="text-[#D48442] border border-[#D48442]/40 bg-[#D48442]/10 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
              style={{ fontFamily: "var(--font-archivo)" }}
            >
              Nurture Package Proposal
            </span>
            <span className="text-[#D8C8B4]/50 text-sm" style={{ fontFamily: "var(--font-archivo)" }}>
              15 May 2026 · Desert Signal
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <h1
            className="text-[#FAF6EF] font-black leading-[1.04] mb-8"
            style={{
              fontFamily: "var(--font-archivo)",
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            }}
          >
            Educate the lead
            <br />
            <span className="text-[#D48442]">until they sell</span>
            <br />
            themselves.
          </h1>
        </FadeIn>

        <FadeIn delay={160}>
          <p className="text-[#D8C8B4] text-lg leading-relaxed max-w-2xl mb-6">
            Many leads who contact Absolute Ablutions already have intent. They came from a Google
            search or a targeted ad. Our goal is to answer all their questions and objections before
            they know to ask them.
          </p>
        </FadeIn>

        <FadeIn delay={220}>
          <p
            className="text-[#D8C8B4]/50 text-sm mb-16"
            style={{ fontFamily: "var(--font-archivo)" }}
          >
            For:{" "}
            <span className="text-[#D8C8B4]/80">Alet Byers &amp; Gerhard Scheepers</span>
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="grid sm:grid-cols-3 gap-4 pb-0">
            {[
              {
                n: "01",
                label: "The Guide",
                desc: "A downloadable anchor asset that builds trust and signals intent.",
              },
              {
                n: "02",
                label: "Email Sequences",
                desc: "An educational course and targeted objection-specific sequences.",
              },
              {
                n: "03",
                label: "WhatsApp",
                desc: "Warm, human follow-up integrated with the email flow.",
              },
            ].map((layer, i) => (
              <div
                key={i}
                className="border border-[#FAF6EF]/10 rounded-2xl p-6 hover:bg-[#FAF6EF]/5 transition-colors duration-300"
              >
                <div
                  className="text-[#D48442] text-xs font-bold tracking-widest uppercase mb-3"
                  style={{ fontFamily: "var(--font-archivo)" }}
                >
                  Layer {layer.n}
                </div>
                <div
                  className="text-[#FAF6EF] font-bold text-lg mb-2"
                  style={{ fontFamily: "var(--font-archivo)" }}
                >
                  {layer.label}
                </div>
                <p className="text-[#D8C8B4]/70 text-sm leading-relaxed">{layer.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      <div className="relative h-20 mt-8">
        <svg
          viewBox="0 0 1440 80"
          className="absolute bottom-0 left-0 right-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 L0,45 C180,10 360,65 540,38 C720,12 900,58 1080,32 C1260,8 1350,50 1440,30 L1440,80 Z"
            fill="#FAF6EF"
          />
        </svg>
      </div>
    </section>
  );
}

// ─── Strategic Idea ───────────────────────────────────────────────────────────

function StrategicIdea() {
  return (
    <section className="bg-[#FAF6EF] py-28 px-6">
      <div className="max-w-[1160px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <FadeIn>
            <Eyebrow>The Strategic Idea</Eyebrow>
            <h2
              className="text-[#4A2812] font-black leading-[1.08] mb-8"
              style={{
                fontFamily: "var(--font-archivo)",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
              }}
            >
              Answer every question
              <br />
              <span className="text-[#D48442]">before it&rsquo;s asked.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-[#4A2812]/75 text-lg leading-relaxed mb-5">
              The approach is borrowed from a framework called{" "}
              <em>They Ask, You Answer</em> — the principle that businesses that answer buyer
              questions most completely and honestly win the most trust and, ultimately, the most
              sales.
            </p>
            <p className="text-[#4A2812]/75 text-lg leading-relaxed">
              The content isn&rsquo;t about Absolute Ablutions. It&rsquo;s about{" "}
              <strong className="text-[#4A2812]">how to buy right</strong> — and Absolute Ablutions
              happens to be the obvious answer at the end of that journey.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={150}>
          <div className="bg-[#F4E8D5] border border-[#D8C8B4] rounded-2xl p-8">
            <p
              className="text-[#A45A2A] text-xs font-bold tracking-widest uppercase mb-6"
              style={{ fontFamily: "var(--font-archivo)" }}
            >
              Three Layers
            </p>
            <div className="space-y-6">
              {[
                {
                  n: "1",
                  title: "The Guide",
                  desc: "A downloadable asset that anchors the whole ecosystem",
                },
                {
                  n: "2",
                  title: "Email Sequences",
                  desc: "An educational course and targeted objection sequences",
                },
                {
                  n: "3",
                  title: "WhatsApp Touchpoints",
                  desc: "Warm, human follow-up integrated with the email flow",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D48442] flex items-center justify-center text-[#FAF6EF] text-sm font-bold"
                    style={{ fontFamily: "var(--font-archivo)" }}
                  >
                    {item.n}
                  </div>
                  <div>
                    <div
                      className="font-bold text-[#4A2812] mb-1"
                      style={{ fontFamily: "var(--font-archivo)" }}
                    >
                      {item.title}
                    </div>
                    <p className="text-[#4A2812]/65 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-[#D8C8B4]">
              <p className="text-[#4A2812]/55 text-sm italic leading-relaxed">
                The main focus lies on the guide and email sequences, with WhatsApp serving as
                connector and follow-up. As a foundation phase, we answer the questions that apply
                most broadly to most ICPs.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Layer 1: The Guide ───────────────────────────────────────────────────────

function LayerOne() {
  const contents = [
    "How to assess your actual requirements (use case, capacity, frequency)",
    "The technology decisions: Cleanflush vs. Recycle",
    "What quality looks like: build spec, certifications, warranty, etc.",
    "Understanding total cost: purchase price vs. hire vs. 3-year ownership cost",
    "Maintenance realities: what breaks, what it costs, what support to expect",
    "Safety compliance: what Mine Ready means, ramp gradients, SANS standards",
    "Custom vs. standard: when to spec bespoke and what the process looks like",
    "Questions to ask any manufacturer before you buy",
  ];

  const goals = [
    "Leads who download this are high-intent. Downloading is a buying signal.",
    "The guide download could trigger a HubSpot task for a sales rep to follow up, if used as a lead magnet.",
    "It serves as a leave-behind, a forward-to-colleague asset, and a WhatsApp share.",
    "Sections map directly to email topics — each email can offer to go deeper with the guide.",
  ];

  return (
    <section className="bg-[#F4E8D5] py-28 px-6">
      <div className="max-w-[1160px] mx-auto">
        <FadeIn>
          <LayerTag number="1" label="One" />
          <Eyebrow>The Guide</Eyebrow>
          <h2
            className="text-[#4A2812] font-black leading-[1.08] mb-2 max-w-3xl"
            style={{
              fontFamily: "var(--font-archivo)",
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            }}
          >
            &ldquo;The Complete Buyer&rsquo;s Guide to Mobile Ablution Facilities&rdquo;
          </h2>
          <p
            className="text-[#A45A2A] text-sm mb-12"
            style={{ fontFamily: "var(--font-archivo)" }}
          >
            Example title
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <FadeIn delay={80}>
              <p className="text-[#4A2812]/75 text-base leading-relaxed mb-8">
                A multi-page downloadable PDF that can be used by the sales team via email or
                WhatsApp. It answers every major question a buyer has before they feel confident
                purchasing. This guide is branded for Absolute Ablutions, but is not a product
                brochure. It aims to be genuinely useful to any buyer, regardless of which
                manufacturer they end up choosing — earning trust by not selling.
              </p>
            </FadeIn>
            <FadeIn delay={120}>
              <h3
                className="text-[#4A2812] font-bold text-xl mb-5"
                style={{ fontFamily: "var(--font-archivo)" }}
              >
                Contents
              </h3>
              <div className="space-y-3">
                {contents.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4A2812] text-[#FAF6EF] text-xs font-bold flex items-center justify-center mt-0.5"
                      style={{ fontFamily: "var(--font-archivo)" }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-[#4A2812]/75 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={200}>
            <div className="bg-[#FAF6EF] border border-[#D8C8B4] rounded-2xl p-8">
              <h3
                className="text-[#4A2812] font-bold text-xl mb-6"
                style={{ fontFamily: "var(--font-archivo)" }}
              >
                What this guide does
              </h3>
              <div className="space-y-4">
                {goals.map((goal, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#5B948A]/20 border border-[#5B948A]/50 flex items-center justify-center mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#5B948A]" />
                    </div>
                    <p className="text-[#4A2812]/70 text-sm leading-relaxed">{goal}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-[#5B948A]/10 border border-[#5B948A]/20 rounded-xl">
                <p
                  className="text-[#5B948A] text-sm leading-relaxed font-medium"
                  style={{ fontFamily: "var(--font-archivo)" }}
                >
                  Going forward, each asset can be refined and aimed at specific ICPs — but as a
                  foundation phase, we answer the questions that apply most broadly.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Layer 2: Email Sequences ─────────────────────────────────────────────────

function LayerTwo() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: "A — Educational Course" },
    { id: 1, label: "B1 — Price" },
    { id: 2, label: "B2 — Maintenance" },
    { id: 3, label: "B3 — Custom" },
    { id: 4, label: "B4 — Timing" },
  ];

  const courseTopics = [
    {
      title: "What to look for before you compare prices",
      desc: "The quality signals buyers miss (certifications, build materials, etc.)",
    },
    {
      title: "The real cost of ownership",
      desc: "Hire vs. buy, 3-year maths, what most suppliers don't tell you about maintenance costs",
    },
    {
      title: "The technology questions",
      desc: "Cleanflush vs. Recycle, solar independence, capacity sizing",
    },
    {
      title: "What good after-sales looks like",
      desc: "Warranty terms, spare parts availability, technical support, what happens when something goes wrong on-site",
    },
    {
      title: "Safety and compliance",
      desc: "Ramp gradients, Mine Ready specifications, SANS standards, what to ask before deploying on a regulated site",
    },
    {
      title: "Custom vs. standard",
      desc: "When it's worth speccing bespoke, what the process looks like, and what it costs",
    },
  ];

  const sequences = [
    {
      code: "B1",
      emails: 4,
      title: '"It\'s more expensive than I expected"',
      subtitle:
        "Reframes the conversation from price to value. Gives the lead the maths and lets them draw their own conclusion.",
      trigger: "Manually enrolled by sales rep in HubSpot when price objection is raised",
      items: [
        "What the price includes that cheaper options don't (build spec, certification, warranty, after-sales)",
        "The 3-year ownership cost vs. 3 years of hire",
        "What happens when a cheaper unit fails: real costs of downtime, replacement parts, no-support scenarios",
        "The asset framing: it's on your balance sheet, it generates revenue or eliminates cost every deployment",
      ],
    },
    {
      code: "B2",
      emails: 4,
      title: '"What does maintenance actually involve?"',
      subtitle: "For leads who are worried about owning something they'll have to maintain.",
      trigger: "Manually enrolled when maintenance concern is raised",
      items: [
        "What routine maintenance looks like (realistic, not scary)",
        "What the 1-year manufacturer's warranty covers",
        "Where spare parts come from and how fast they arrive",
        "What technical support looks like in practice — direct line, not a call centre",
        "Comparison: maintaining a unit you own vs. dealing with a hire company's damaged or poorly-serviced stock",
      ],
    },
    {
      code: "B3",
      emails: 3,
      title: '"Can you do something custom / different from what\'s on the website?"',
      subtitle:
        "For leads who have a specific requirement that standard products don't obviously meet. This is a buying signal, not an objection — treat it that way.",
      trigger: "Manually enrolled when custom enquiry is raised",
      items: [
        "What the design process looks like",
        "What kinds of customisation are possible: interior spec, branding, layout, system type",
        "Examples of custom units built for specific use cases (without revealing client details)",
        "Timeline and what the lead needs to provide to start the process",
        "CTA: let's start with a brief — here's what we need from you",
      ],
    },
    {
      code: "B4",
      emails: 5,
      title: '"Come back to me in [X months]"',
      subtitle:
        "For leads with genuine timing delays. Keeps AA present and useful without being annoying. Spaced monthly.",
      trigger: "Manually enrolled when lead defers with a timeline",
      items: [
        "Immediate: low-pressure acknowledgement, confirms you'll be in touch",
        "Month 2: educational piece matched to their industry",
        "Month 3: relevant social proof — a client in a similar situation",
        "Month 4–5: lead time reminder — practical flag as project date approaches",
        'Month 5–6: direct re-engagement — "your timing window is opening, here\'s where we left off"',
      ],
    },
  ];

  return (
    <section className="bg-[#FAF6EF] py-28 px-6">
      <div className="max-w-[1160px] mx-auto">
        <FadeIn>
          <LayerTag number="2" label="Two" />
          <Eyebrow>Email Sequences</Eyebrow>
          <h2
            className="text-[#4A2812] font-black leading-[1.08] mb-4 max-w-3xl"
            style={{
              fontFamily: "var(--font-archivo)",
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            }}
          >
            A structured educational experience,{" "}
            <span className="text-[#D48442]">not a mailout.</span>
          </h2>
          <p className="text-[#4A2812]/70 text-lg leading-relaxed mb-12 max-w-2xl">
            Two types: a main educational course triggered by guide download or quote request, and
            shorter objection-specific sequences triggered by the sales rep when a lead stalls.
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="flex flex-wrap gap-2 mb-10 border-b border-[#D8C8B4]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-sm font-semibold rounded-t-lg transition-all duration-200 -mb-px ${
                  activeTab === tab.id
                    ? "bg-[#FAF6EF] border border-[#D8C8B4] border-b-2 border-b-[#D48442] text-[#D48442]"
                    : "text-[#4A2812]/45 hover:text-[#4A2812]/75 border border-transparent"
                }`}
                style={{ fontFamily: "var(--font-archivo)" }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {activeTab === 0 && (
          <div className="animate-fade-in">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-[#F4E8D5] border border-[#D8C8B4] rounded-2xl p-6">
                  <p
                    className="text-[#A45A2A] text-xs font-bold tracking-widest uppercase mb-2"
                    style={{ fontFamily: "var(--font-archivo)" }}
                  >
                    Example course title
                  </p>
                  <p
                    className="text-[#4A2812] font-bold text-xl italic leading-snug"
                    style={{ fontFamily: "var(--font-archivo)" }}
                  >
                    &ldquo;How to Buy a Mobile Ablution Unit: What Most Buyers Don&rsquo;t Know
                    Before They Spend&rdquo;
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {courseTopics.map((topic, i) => (
                    <div
                      key={i}
                      className="bg-[#F4E8D5] border border-[#D8C8B4] rounded-xl p-5 hover:border-[#D48442]/40 transition-colors duration-200"
                    >
                      <div
                        className="text-[#D48442] text-xs font-bold mb-2 tracking-wide"
                        style={{ fontFamily: "var(--font-archivo)" }}
                      >
                        Email {i + 1}
                      </div>
                      <div
                        className="text-[#4A2812] font-semibold text-sm mb-2"
                        style={{ fontFamily: "var(--font-archivo)" }}
                      >
                        {topic.title}
                      </div>
                      <p className="text-[#4A2812]/60 text-xs leading-relaxed">{topic.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <div className="bg-[#F4E8D5] border border-[#D8C8B4] rounded-2xl p-6">
                  <h4
                    className="text-[#4A2812] font-bold mb-5"
                    style={{ fontFamily: "var(--font-archivo)" }}
                  >
                    Details
                  </h4>
                  <dl className="space-y-4 text-sm">
                    {[
                      {
                        label: "Trigger",
                        value: "Guide download, quote request, or manually enrolled by sales rep",
                      },
                      {
                        label: "Cadence",
                        value: "One email every 3–4 days. Full course delivered in ~3 weeks",
                      },
                      {
                        label: "Format",
                        value:
                          "300–400 words, visually clean, one idea per email, one CTA per email. Mobile-readable.",
                      },
                      {
                        label: "End CTA",
                        value:
                          "Download the full guide, or book a factory visit / request a quote",
                      },
                    ].map((item, i) => (
                      <div key={i}>
                        <dt
                          className="text-[#A45A2A] text-xs font-bold uppercase tracking-wider mb-1"
                          style={{ fontFamily: "var(--font-archivo)" }}
                        >
                          {item.label}
                        </dt>
                        <dd className="text-[#4A2812]/75 leading-relaxed">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="bg-[#5B948A]/10 border border-[#5B948A]/20 rounded-2xl p-5">
                  <p
                    className="text-[#5B948A] text-sm leading-relaxed font-medium"
                    style={{ fontFamily: "var(--font-archivo)" }}
                  >
                    Framed as a short course — &ldquo;over the next [x] days, here&rsquo;s what
                    we&rsquo;ll cover.&rdquo; The lead knows what&rsquo;s coming and is more likely
                    to read each one.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab > 0 && (
          <div className="animate-fade-in">
            {(() => {
              const seq = sequences[activeTab - 1];
              return (
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="inline-flex items-center gap-2 bg-[#D48442]/10 border border-[#D48442]/25 rounded-full px-4 py-1.5 mb-5">
                      <span
                        className="text-[#D48442] text-xs font-bold"
                        style={{ fontFamily: "var(--font-archivo)" }}
                      >
                        Sequence {seq.code}
                      </span>
                    </div>
                    <h3
                      className="text-[#4A2812] font-bold text-2xl mb-3 leading-snug"
                      style={{ fontFamily: "var(--font-archivo)" }}
                    >
                      {seq.title}
                    </h3>
                    <p className="text-[#4A2812]/70 text-base leading-relaxed mb-8">
                      {seq.subtitle}
                    </p>
                    <div className="space-y-3">
                      {seq.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex gap-4 items-start p-4 bg-[#F4E8D5] border border-[#D8C8B4] rounded-xl"
                        >
                          <span
                            className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D48442] text-[#FAF6EF] text-xs font-bold flex items-center justify-center"
                            style={{ fontFamily: "var(--font-archivo)" }}
                          >
                            {i + 1}
                          </span>
                          <p className="text-[#4A2812]/75 text-sm leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#F4E8D5] border border-[#D8C8B4] rounded-2xl p-6 h-fit">
                    <div
                      className="text-[#A45A2A] text-xs font-bold tracking-widest uppercase mb-5"
                      style={{ fontFamily: "var(--font-archivo)" }}
                    >
                      Sequence Details
                    </div>
                    <dl className="space-y-5 text-sm">
                      <div>
                        <dt
                          className="text-[#4A2812]/45 text-xs uppercase tracking-wider mb-1"
                          style={{ fontFamily: "var(--font-archivo)" }}
                        >
                          Emails in sequence
                        </dt>
                        <dd
                          className="text-[#4A2812] font-black text-3xl"
                          style={{ fontFamily: "var(--font-archivo)" }}
                        >
                          {seq.emails}
                        </dd>
                      </div>
                      <div>
                        <dt
                          className="text-[#4A2812]/45 text-xs uppercase tracking-wider mb-1"
                          style={{ fontFamily: "var(--font-archivo)" }}
                        >
                          Trigger
                        </dt>
                        <dd className="text-[#4A2812]/75 leading-relaxed">{seq.trigger}</dd>
                      </div>
                      <div>
                        <dt
                          className="text-[#4A2812]/45 text-xs uppercase tracking-wider mb-1"
                          style={{ fontFamily: "var(--font-archivo)" }}
                        >
                          Follow-up
                        </dt>
                        <dd className="text-[#4A2812]/75 leading-relaxed">
                          Rep follows up after the sequence ends
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Layer 3: WhatsApp ────────────────────────────────────────────────────────

function LayerThree() {
  const messages = [
    {
      trigger: "After quote sent (Day 2)",
      text: "Hi [Name], just checking you received the quote I sent through. Happy to answer any questions or talk through the spec. Just let me know. — [Rep name], Absolute Ablutions",
    },
    {
      trigger: "After guide downloaded (same day)",
      text: "Hi [Name], I saw you downloaded our buyer's guide — hope it's useful. You'll also get a few short emails from us over the next couple of weeks covering the main topics in more detail. Let me know if anything comes up. — [Rep name]",
    },
    {
      trigger: "After no email response for 5 days",
      text: "Hi [Name], I sent a few emails your way — just wanted to make sure they landed. If WhatsApp is easier, happy to chat here. — [Rep name], Absolute Ablutions",
    },
    {
      trigger: "Factory visit invitation",
      text: "Hi [Name], if it would help to see the units in person before deciding, you're welcome to come through to our factory in Blackheath. Takes half a morning — most people say it makes the decision a lot easier. When suits you? — [Rep name]",
    },
    {
      trigger: "Custom enquiry follow-up",
      text: "Hi [Name], thinking about your requirement for [custom spec]. We've done similar before — I'd like to set up a quick call to talk through what's possible. When works? — [Rep name]",
    },
  ];

  return (
    <section className="bg-[#F4E8D5] py-28 px-6">
      <div className="max-w-[1160px] mx-auto">
        <FadeIn>
          <LayerTag number="3" label="Three" />
          <Eyebrow>WhatsApp Touchpoints</Eyebrow>
          <h2
            className="text-[#4A2812] font-black leading-[1.08] mb-4 max-w-2xl"
            style={{
              fontFamily: "var(--font-archivo)",
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            }}
          >
            Warm. Human.
            <br />
            <span className="text-[#D48442]">Never a text wall.</span>
          </h2>
          <p className="text-[#4A2812]/70 text-lg leading-relaxed mb-12 max-w-2xl">
            Simple WhatsApp messages aimed at keeping the lead warm and following up when there is no
            response to emails. Points to the guide and reminds about the email sequence.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {messages.map((msg, i) => (
            <FadeIn key={i} delay={i * 55}>
              <div className="bg-[#FAF6EF] border border-[#D8C8B4] rounded-2xl p-5 hover:border-[#5B948A]/40 transition-colors duration-200 h-full flex flex-col">
                <div
                  className="text-[#5B948A] text-xs font-bold tracking-wide uppercase mb-4"
                  style={{ fontFamily: "var(--font-archivo)" }}
                >
                  {msg.trigger}
                </div>
                <div className="flex-1 bg-[#DCF8C6] rounded-2xl rounded-tl-sm p-4 text-[#1a1a1a] text-sm leading-relaxed shadow-sm">
                  {msg.text}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={280}>
          <div className="bg-[#5B948A]/10 border border-[#5B948A]/25 rounded-2xl p-7">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#5B948A] flex items-center justify-center text-white text-base leading-none">
                ℹ
              </div>
              <div>
                <h4
                  className="text-[#4A2812] font-bold mb-2"
                  style={{ fontFamily: "var(--font-archivo)" }}
                >
                  WhatsApp and HubSpot
                </h4>
                <p className="text-[#4A2812]/70 text-sm leading-relaxed">
                  HubSpot integrates with WhatsApp Business API via tools like Twilio or native
                  HubSpot WhatsApp integration. We recommend setting this up before launching
                  sequences so rep activity is tracked centrally.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Connection Flow ──────────────────────────────────────────────────────────

function ConnectionFlow() {
  return (
    <section className="bg-[#2B1A10] py-28 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 56px, rgba(212,132,66,0.5) 56px, rgba(212,132,66,0.5) 57px)",
        }}
      />
      <div className="relative z-10 max-w-[1160px] mx-auto">
        <FadeIn>
          <Eyebrow>How It Connects</Eyebrow>
          <h2
            className="text-[#FAF6EF] font-black leading-[1.08] mb-16 max-w-2xl"
            style={{
              fontFamily: "var(--font-archivo)",
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            }}
          >
            One connected
            <br />
            <span className="text-[#D48442]">lead journey.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div>
              <div
                className="bg-[#D48442] text-[#FAF6EF] rounded-2xl p-5 font-bold mb-4"
                style={{ fontFamily: "var(--font-archivo)" }}
              >
                Via Google / Ads → Request a Quote form
              </div>
              <div className="ml-5 pl-4 border-l border-[#D48442]/40">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-[#D8C8B4] text-sm">
                  Sales rep qualifies → Enrolls in course, specific sequence, or sends Guide
                </div>
              </div>
            </div>
            <div>
              <div
                className="bg-[#5B948A] text-[#FAF6EF] rounded-2xl p-5 font-bold mb-4"
                style={{ fontFamily: "var(--font-archivo)" }}
              >
                Via guide download (website / WhatsApp share)
              </div>
              <div className="ml-5 pl-4 border-l border-[#5B948A]/40">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-[#D8C8B4] text-sm">
                  HubSpot task fires → Rep reaches out within 24hrs
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-3 opacity-30">
            <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
              <path
                d="M10 0v24M3 17l7 7 7-7"
                stroke="#D48442"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
            <div
              className="text-[#D48442] text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: "var(--font-archivo)" }}
            >
              Both paths lead to
            </div>
            <div
              className="text-[#FAF6EF] font-bold text-xl mb-5"
              style={{ fontFamily: "var(--font-archivo)" }}
            >
              Lead enrolled in educational course
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                "Reads emails → clicks articles → deeper engagement",
                "Stalls on objection → Rep enrolls in specific sequence",
                "End of course → Factory visit / Quote request / Follow-up call",
              ].map((outcome, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/8 rounded-xl p-4 text-[#D8C8B4] text-sm leading-relaxed"
                >
                  {outcome}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Deliverables + Timeline ──────────────────────────────────────────────────

function Deliverables() {
  const deliverables = [
    { id: 1, asset: "Buyer's Guide", format: "PDF (10–15 pages)", notes: "Anchor asset" },
    {
      id: 2,
      asset: "Educational email course",
      format: "6 emails",
      notes: "One per objection topic; 300–400 words each",
    },
    { id: 3, asset: "Objection sequence B1", format: "4 emails", notes: "Price / value" },
    { id: 4, asset: "Objection sequence B2", format: "4 emails", notes: "Maintenance & aftercare" },
    { id: 5, asset: "Objection sequence B3", format: "3 emails", notes: "Custom options" },
    { id: 6, asset: "Objection sequence B4", format: "5 emails", notes: "Timing / come back later" },
    {
      id: 7,
      asset: "WhatsApp templates",
      format: "Set",
      notes: "Covers key touchpoints; built from completed guide and emails",
    },
  ];

  const timeline = [
    {
      week: "1–2",
      title: "Research & Information Gathering",
      tasks: [
        "General outlines for guide and email courses set up",
        "Competitor research to identify gaps and differentiation",
        "Request and gather information to ensure accuracy and specificity (your input needed)",
        "Gather images and graphics as needed (your input needed)",
      ],
    },
    {
      week: "3–4",
      title: "Development of Buyer's Guide",
      tasks: [
        "Outlining and structure",
        "Drafts for approval",
        "Graphic layout and assembly",
        "Finals for approval",
      ],
    },
    {
      week: "5",
      title: "Educational Email Course",
      tasks: ["Written based on completed guide"],
    },
    {
      week: "6",
      title: "Objection Emails + WhatsApp",
      tasks: ["Objection sequences written", "WhatsApp templates written"],
    },
  ];

  return (
    <section className="bg-[#FAF6EF] py-28 px-6">
      <div className="max-w-[1160px] mx-auto">
        <FadeIn>
          <Eyebrow>Deliverables</Eyebrow>
          <h2
            className="text-[#4A2812] font-black leading-[1.08] mb-4 max-w-2xl"
            style={{
              fontFamily: "var(--font-archivo)",
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            }}
          >
            A complete{" "}
            <span className="text-[#D48442]">Nurture Kit.</span>
          </h2>
          <p className="text-[#4A2812]/70 text-base leading-relaxed mb-12 max-w-xl">
            Together these assets create a system that answers objections early and establishes
            Absolute Ablutions as the no-brainer option for interested buyers. Page and email counts
            may change based on content.
          </p>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="overflow-x-auto mb-24 rounded-2xl border border-[#D8C8B4]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#F4E8D5] border-b border-[#D8C8B4]">
                  {["#", "Asset", "Format", "Notes"].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[#4A2812]/50 text-xs font-bold tracking-widest uppercase px-6 py-4"
                      style={{ fontFamily: "var(--font-archivo)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {deliverables.map((d, i) => (
                  <tr
                    key={d.id}
                    className={`border-b border-[#D8C8B4]/60 hover:bg-[#F4E8D5]/60 transition-colors duration-150 ${
                      i === deliverables.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td
                      className="px-6 py-4 text-[#A45A2A] font-bold text-sm"
                      style={{ fontFamily: "var(--font-archivo)" }}
                    >
                      {String(d.id).padStart(2, "0")}
                    </td>
                    <td
                      className="px-6 py-4 text-[#4A2812] font-semibold text-sm"
                      style={{ fontFamily: "var(--font-archivo)" }}
                    >
                      {d.asset}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="bg-[#F4E8D5] border border-[#D8C8B4] text-[#4A2812]/65 text-xs px-3 py-1 rounded-full"
                        style={{ fontFamily: "var(--font-archivo)" }}
                      >
                        {d.format}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#4A2812]/60 text-sm">{d.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <Eyebrow>Estimated Timeline</Eyebrow>
          <h3
            className="text-[#4A2812] font-black text-3xl mb-12"
            style={{ fontFamily: "var(--font-archivo)" }}
          >
            6 Weeks to a Complete System
          </h3>
        </FadeIn>

        <div className="relative">
          <div className="absolute left-12 top-0 bottom-0 w-px bg-[#D8C8B4] hidden md:block" />
          <div className="space-y-5">
            {timeline.map((phase, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="flex gap-8 items-stretch">
                  <div className="flex-shrink-0 w-24 hidden md:flex flex-col items-center justify-center bg-[#D48442] rounded-2xl text-[#FAF6EF] relative z-10 py-5">
                    <div
                      className="text-xs font-bold uppercase tracking-wider opacity-75 mb-1"
                      style={{ fontFamily: "var(--font-archivo)" }}
                    >
                      Week
                    </div>
                    <div
                      className="text-2xl font-black"
                      style={{ fontFamily: "var(--font-archivo)" }}
                    >
                      {phase.week}
                    </div>
                  </div>
                  <div className="flex-1 bg-[#F4E8D5] border border-[#D8C8B4] rounded-2xl p-6">
                    <div
                      className="text-[#D48442] text-xs font-bold uppercase tracking-wider mb-2 md:hidden"
                      style={{ fontFamily: "var(--font-archivo)" }}
                    >
                      Week {phase.week}
                    </div>
                    <h4
                      className="text-[#4A2812] font-bold text-lg mb-3"
                      style={{ fontFamily: "var(--font-archivo)" }}
                    >
                      {phase.title}
                    </h4>
                    <ul className="space-y-2">
                      {phase.tasks.map((task, j) => (
                        <li key={j} className="flex gap-2.5 items-start text-sm text-[#4A2812]/70">
                          <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#D48442] mt-[7px]" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={350}>
          <div className="mt-8 p-5 bg-[#5B948A]/10 border border-[#5B948A]/20 rounded-xl">
            <p
              className="text-[#5B948A] text-sm leading-relaxed font-medium"
              style={{ fontFamily: "var(--font-archivo)" }}
            >
              As each asset is completed, it is immediately useable and will be shared with you. In
              order: Buyer&rsquo;s Guide → Educational Email Course → Objection Sequences → WhatsApp
              Messages.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#4A2812] py-16 px-6">
      <div className="max-w-[1160px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <div>
          <Image
            src="/logo.png"
            alt="Desert Signal"
            width={152}
            height={38}
            className="h-8 w-auto object-contain brightness-0 invert opacity-90"
          />
        </div>
        <div className="text-left md:text-right">
          <p
            className="text-[#D8C8B4] text-sm font-medium"
            style={{ fontFamily: "var(--font-archivo)" }}
          >
            Prepared for Absolute Ablutions
          </p>
          <p className="text-[#D8C8B4]/55 text-sm mt-1">Alet Byers &amp; Gerhard Scheepers</p>
          <a
            href="mailto:giraux@getdesertsignal.com"
            className="text-[#D48442] text-sm hover:text-[#E1B04B] transition-colors duration-200 mt-3 inline-block"
            style={{ fontFamily: "var(--font-archivo)" }}
          >
            giraux@getdesertsignal.com
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Simplified View ──────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="mt-14 mb-5">
      <span className="text-[#D48442] text-[11px] font-semibold tracking-[0.2em] uppercase">
        {children}
      </span>
    </div>
  );
}

function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-[#4A2812] font-bold text-[1.1rem] mt-9 mb-3 leading-snug">
      {children}
    </h3>
  );
}

function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`text-[#4A2812]/75 leading-[1.85] mb-4 ${className}`}
      style={{ fontSize: "17px" }}
    >
      {children}
    </p>
  );
}

function SimpleList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 mb-6">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 items-start">
          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#D48442] text-[#FAF6EF] text-[10px] font-bold flex items-center justify-center mt-[3px]">
            {i + 1}
          </span>
          <span className="text-[#4A2812]/75 leading-relaxed" style={{ fontSize: "16px" }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 mb-6">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 items-start">
          <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#D48442] mt-[9px]" />
          <span className="text-[#4A2812]/75 leading-relaxed" style={{ fontSize: "16px" }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Divider() {
  return <div className="border-t border-[#D8C8B4] my-10" />;
}

function SimplifiedView() {
  return (
    <div className="bg-[#FAF6EF] min-h-screen pt-28 pb-28 px-6">
      <div className="max-w-[680px] mx-auto">

        {/* Document header */}
        <div className="mb-12">
          <p className="text-[#D48442] text-[11px] font-semibold tracking-[0.2em] uppercase mb-5">
            Nurture Package Proposal
          </p>
          <h1
            className="text-[#4A2812] font-bold leading-[1.1] mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            Educate the lead until{" "}
            <span className="text-[#D48442]">they sell themselves.</span>
          </h1>
          <p className="text-[#4A2812]/40 text-sm">
            Prepared by Desert Signal · 15 May 2026
            <br />
            For: Alet Byers &amp; Gerhard Scheepers
          </p>
        </div>

        <Divider />

        {/* Strategic Idea */}
        <SectionHeading>The Strategic Idea</SectionHeading>

        <Body>
          Many leads who contact Absolute Ablutions already have intent. They came from a Google search or a targeted ad. Our goal is to answer all their questions and objections before they know to ask them.
        </Body>

        <Body>
          <strong className="text-[#4A2812] font-semibold">The nurture package aims to turn leads into clients by educating the lead until they sell themselves.</strong>
        </Body>

        <Body>
          The approach is borrowed from a framework called <em>They Ask, You Answer</em> — the principle that the businesses that answer buyer questions most completely and honestly win the most trust and, ultimately, the most sales. The content isn&rsquo;t about Absolute Ablutions. It&rsquo;s about how to buy right — and Absolute Ablutions happens to be the obvious answer at the end of that journey.
        </Body>

        <Body>This package has three layers:</Body>
        <SimpleList items={[
          "The Guide — a downloadable asset that anchors the whole ecosystem",
          "Email sequences — an educational course and targeted objection sequences",
          "WhatsApp touchpoints — warm, human follow-up integrated with the email flow",
        ]} />

        <Body>
          The main focus lies on the guide and email sequences, with WhatsApp serving as connectors and follow-up. As a foundation phase, we answer the questions that apply most broadly to most ICPs.
        </Body>

        <Divider />

        {/* Layer 1 */}
        <SectionHeading>Layer 1 — The Guide</SectionHeading>

        <p
          className="text-[#4A2812] font-bold text-xl mb-2 italic leading-snug"
          style={{ fontFamily: "var(--font-archivo)" }}
        >
          &ldquo;The Complete Buyer&rsquo;s Guide to Mobile Ablution Facilities&rdquo;
        </p>
        <p className="text-[#A45A2A] text-sm mb-6" style={{ fontFamily: "var(--font-archivo)" }}>
          Example title
        </p>

        <Body>
          A multi-page downloadable PDF that can be used by the sales team via email or WhatsApp. It answers every major question a buyer has before they feel confident purchasing. This guide is branded for Absolute Ablutions, but is not a product brochure — it aims to be genuinely useful to any buyer, regardless of which manufacturer they end up choosing, earning trust by not selling.
        </Body>

        <SubHeading>Contents</SubHeading>
        <SimpleList items={[
          "How to assess your actual requirements (use case, capacity, frequency)",
          "The technology decisions: Cleanflush vs. Recycle",
          "What quality looks like: build spec, certifications, warranty, etc.",
          "Understanding total cost: purchase price vs. hire vs. 3-year ownership cost",
          "Maintenance realities: what breaks, what it costs, what support to expect",
          "Safety compliance: what Mine Ready means, ramp gradients, SANS standards",
          "Custom vs. standard: when to spec bespoke and what the process looks like",
          "Questions to ask any manufacturer before you buy",
        ]} />

        <SubHeading>Goal with the guide</SubHeading>
        <BulletList items={[
          "Leads who download this are high-intent. Downloading is a buying signal.",
          "The guide download could trigger a HubSpot task for a sales rep to follow up, if used as a lead magnet.",
          "It serves as a leave-behind, a forward-to-colleague asset, and a WhatsApp share.",
          "Sections map directly to email topics — each email can offer to go deeper with the guide.",
        ]} />

        <Divider />

        {/* Layer 2 */}
        <SectionHeading>Layer 2 — Email Sequences</SectionHeading>

        <SubHeading>A. The Educational Email Course</SubHeading>
        <p
          className="text-[#A45A2A] text-xs font-bold tracking-widest uppercase mb-3"
          style={{ fontFamily: "var(--font-archivo)" }}
        >
          Triggered by: guide download, quote request, or manually enrolled by sales rep
        </p>

        <Body>
          This is the main sequence. Framed as a short course — &ldquo;over the next [x] days, here&rsquo;s what we&rsquo;ll cover.&rdquo; The lead knows what&rsquo;s coming and is more likely to read each one. It&rsquo;s a structured educational experience that mirrors the guide in shorter form.
        </Body>

        <p className="text-[#4A2812] font-bold mb-4 italic" style={{ fontFamily: "var(--font-archivo)" }}>
          Example course title: &ldquo;How to Buy a Mobile Ablution Unit: What Most Buyers Don&rsquo;t Know Before They Spend&rdquo;
        </p>

        <Body>Topics — one per email:</Body>
        <SimpleList items={[
          "What to look for before you compare prices — the quality signals buyers miss (certifications, build materials, etc.)",
          "The real cost of ownership — hire vs. buy, 3-year maths, what most suppliers don't tell you about maintenance costs",
          "The technology questions — Cleanflush vs. Recycle, solar independence, capacity sizing",
          "What good after-sales looks like — warranty terms, spare parts availability, technical support, what happens when something goes wrong on-site",
          "Safety and compliance — ramp gradients, Mine Ready specifications, SANS standards, what to ask before deploying on a regulated site",
          "Custom vs. standard — when it's worth speccing bespoke, what the process looks like, and what it costs",
        ]} />

        <Body>
          <strong className="text-[#4A2812]">Cadence:</strong> One email every 3–4 days. Full course delivered in approximately 3 weeks.
        </Body>
        <Body>
          <strong className="text-[#4A2812]">Format:</strong> Short-form (300–400 words), visually clean, one idea per email, one link or CTA per email. Mobile-readable. Can link to relevant blog articles and specific product pages for leads who want to go deeper.
        </Body>
        <Body>
          <strong className="text-[#4A2812]">End of course CTA:</strong> Download the full guide, or book a factory visit / request a quote.
        </Body>

        <SubHeading>B. Objection-Specific Sequences</SubHeading>

        <Body>
          Triggered manually by the sales rep in HubSpot when a specific objection is raised. These are shorter sequences — used when a warm lead stalls on a specific issue. The rep identifies the blocker, enrolls the lead in the relevant sequence, and the emails go out automatically. The rep follows up after the sequence ends.
        </Body>

        <div className="mt-8 space-y-8">
          {[
            {
              code: "B1",
              title: "\"It's more expensive than I expected\"",
              note: "4 emails. Reframes the conversation from price to value. Gives the lead the maths and lets them draw their own conclusion.",
              items: [
                "What the price includes that cheaper options don't (build spec, certification, warranty, after-sales)",
                "The 3-year ownership cost vs. 3 years of hire",
                "What happens when a cheaper unit fails: real costs of downtime, replacement parts, no-support scenarios",
                "The asset framing: it's on your balance sheet, it generates revenue or eliminates cost every deployment",
              ],
            },
            {
              code: "B2",
              title: "\"What does maintenance actually involve?\"",
              note: "4 emails. For leads who are worried about owning something they'll have to maintain.",
              items: [
                "What routine maintenance looks like (realistic, not scary)",
                "What the 1-year manufacturer's warranty covers",
                "Where spare parts come from and how fast they arrive",
                "What technical support looks like in practice — direct line, not a call centre",
                "Comparison: maintaining a unit you own vs. dealing with a hire company's damaged or poorly-serviced stock",
              ],
            },
            {
              code: "B3",
              title: "\"Can you do something custom / different from what's on the website?\"",
              note: "3 emails. For leads with a specific requirement standard products don't obviously meet. This is a buying signal, not an objection.",
              items: [
                "What the design process looks like",
                "What kinds of customisation are possible: interior spec, branding, layout, system type",
                "Examples of custom units built for specific use cases (without revealing client details)",
                "Timeline and what the lead needs to provide to start the process",
                "CTA: let's start with a brief — here's what we need from you",
              ],
            },
            {
              code: "B4",
              title: "\"Come back to me in [X months]\"",
              note: "5 emails. For leads with genuine timing delays. Keeps AA present and useful without being annoying. Spaced monthly.",
              items: [
                "Immediate: low-pressure acknowledgement, confirms you'll be in touch",
                "Month 2: educational piece matched to their industry",
                "Month 3: relevant social proof — a client in a similar situation",
                "Month 4–5: lead time reminder — practical flag as project date approaches",
                "Month 5–6: direct re-engagement — \"your timing window is opening, here's where we left off\"",
              ],
            },
          ].map((seq) => (
            <div key={seq.code}>
              <div className="flex items-start gap-3 mb-2">
                <span
                  className="flex-shrink-0 mt-0.5 text-[#D48442] text-xs font-bold tracking-wider"
                  style={{ fontFamily: "var(--font-archivo)" }}
                >
                  {seq.code}
                </span>
                <p
                  className="text-[#4A2812] font-bold"
                  style={{ fontFamily: "var(--font-archivo)", fontSize: "16px" }}
                >
                  {seq.title}
                </p>
              </div>
              <p className="text-[#4A2812]/55 text-sm italic mb-3 pl-8">{seq.note}</p>
              <div className="pl-8">
                <BulletList items={seq.items} />
              </div>
            </div>
          ))}
        </div>

        <Divider />

        {/* Layer 3 */}
        <SectionHeading>Layer 3 — WhatsApp Touchpoints</SectionHeading>

        <Body>
          Simple WhatsApp messages aimed at keeping the lead warm and following up when there is no response to emails. They point to the guide and remind about the email sequence. Concise, never a text wall.
        </Body>

        <SubHeading>Suggested touchpoints</SubHeading>
        <BulletList items={[
          "After quote sent (Day 2) — check receipt, invite questions",
          "After guide downloaded (same day) — acknowledge download, flag email sequence",
          "After no email response for 5 days — gentle check-in, offer WhatsApp as alternative",
          "Factory visit invitation — offer in-person viewing at Blackheath factory",
          "Custom enquiry follow-up — reference their specific requirement, invite a call",
        ]} />

        <Body>
          HubSpot integrates with WhatsApp Business API via tools like Twilio or native HubSpot WhatsApp integration. We recommend setting this up before launching sequences so rep activity is tracked centrally.
        </Body>

        <Divider />

        {/* Connection */}
        <SectionHeading>How the Pieces Connect</SectionHeading>

        <Body>
          A lead enters through one of two paths: a Google or paid ad click that leads to a quote request form, or a guide download via the website or a WhatsApp share. Both paths feed into the same system.
        </Body>

        <Body>
          For quote requests, the sales rep qualifies the lead and manually enrolls them in the educational course, a specific objection sequence, or sends the guide directly. For guide downloads, HubSpot fires a task for the rep to reach out within 24 hours — and the lead is then enrolled in the educational course.
        </Body>

        <Body>
          From there, leads progress through the course. Those who engage deeply get linked to relevant articles and product pages. Those who stall on a specific objection get enrolled in the matching sequence by the rep. At the end of the course, the CTA drives toward a factory visit, a quote request, or a direct follow-up call.
        </Body>

        <Divider />

        {/* Deliverables */}
        <SectionHeading>Deliverables Summary</SectionHeading>

        <div className="space-y-3 mb-6">
          {[
            { id: "01", asset: "Buyer's Guide", format: "PDF (10–15 pages)", note: "Anchor asset" },
            { id: "02", asset: "Educational email course", format: "6 emails", note: "300–400 words each" },
            { id: "03", asset: "Objection sequence B1", format: "4 emails", note: "Price / value" },
            { id: "04", asset: "Objection sequence B2", format: "4 emails", note: "Maintenance & aftercare" },
            { id: "05", asset: "Objection sequence B3", format: "3 emails", note: "Custom options" },
            { id: "06", asset: "Objection sequence B4", format: "5 emails", note: "Timing / come back later" },
            { id: "07", asset: "WhatsApp templates", format: "Set", note: "Covers key touchpoints" },
          ].map((d) => (
            <div key={d.id} className="flex gap-4 items-baseline border-b border-[#D8C8B4]/50 pb-3">
              <span
                className="flex-shrink-0 text-[#D48442] text-xs font-bold w-6"
                style={{ fontFamily: "var(--font-archivo)" }}
              >
                {d.id}
              </span>
              <span
                className="flex-1 text-[#4A2812] font-semibold text-sm"
                style={{ fontFamily: "var(--font-archivo)" }}
              >
                {d.asset}
              </span>
              <span className="text-[#4A2812]/45 text-sm">{d.format}</span>
              <span className="text-[#4A2812]/40 text-xs hidden sm:block">{d.note}</span>
            </div>
          ))}
        </div>

        <Body>
          Page and email counts may change based on content. As each asset is completed, it is immediately useable and shared. In order: Buyer&rsquo;s Guide → Educational Email Course → Objection Sequences → WhatsApp Messages.
        </Body>

        <Divider />

        {/* Timeline */}
        <SectionHeading>Estimated Timeline — 6 Weeks</SectionHeading>

        <div className="space-y-6">
          {[
            {
              week: "1–2",
              title: "Research & Information Gathering",
              tasks: [
                "General outlines for guide and email courses set up",
                "Competitor research to identify gaps and differentiation",
                "Request and gather information to ensure accuracy (your input needed)",
                "Gather images and graphics as needed (your input needed)",
              ],
            },
            {
              week: "3–4",
              title: "Development of Buyer's Guide",
              tasks: ["Outlining and structure", "Drafts for approval", "Graphic layout and assembly", "Finals for approval"],
            },
            {
              week: "5",
              title: "Educational Email Course",
              tasks: ["Written based on completed guide"],
            },
            {
              week: "6",
              title: "Objection Emails + WhatsApp",
              tasks: ["Objection sequences written", "WhatsApp templates written"],
            },
          ].map((phase) => (
            <div key={phase.week} className="flex gap-5 items-start">
              <div
                className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#D48442] flex flex-col items-center justify-center text-[#FAF6EF]"
              >
                <span className="text-[8px] font-bold uppercase tracking-wider opacity-75" style={{ fontFamily: "var(--font-archivo)" }}>Wk</span>
                <span className="text-base font-black leading-none" style={{ fontFamily: "var(--font-archivo)" }}>{phase.week}</span>
              </div>
              <div className="flex-1 pt-1">
                <p className="text-[#4A2812] font-bold mb-2" style={{ fontFamily: "var(--font-archivo)" }}>
                  {phase.title}
                </p>
                <ul className="space-y-1">
                  {phase.tasks.map((t, i) => (
                    <li key={i} className="flex gap-2 text-sm text-[#4A2812]/65">
                      <div className="flex-shrink-0 w-1 h-1 rounded-full bg-[#D48442] mt-[7px]" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[#D8C8B4] flex items-center justify-between">
          <Image
            src="/logo.png"
            alt="Desert Signal"
            width={120}
            height={30}
            className="h-6 w-auto object-contain opacity-70"
          />
          <a
            href="mailto:giraux@getdesertsignal.com"
            className="text-[#D48442] text-sm hover:text-[#A45A2A] transition-colors"
            style={{ fontFamily: "var(--font-archivo)" }}
          >
            giraux@getdesertsignal.com
          </a>
        </div>

      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [simplified, setSimplified] = useState(false);

  return (
    <main>
      <Header simplified={simplified} onToggle={() => setSimplified((s) => !s)} />
      <div
        className="transition-opacity duration-500"
        style={{ opacity: 1 }}
      >
        {simplified ? (
          <SimplifiedView />
        ) : (
          <>
            <Hero />
            <StrategicIdea />
            <LayerOne />
            <LayerTwo />
            <LayerThree />
            <ConnectionFlow />
            <Deliverables />
            <Footer />
          </>
        )}
      </div>
    </main>
  );
}
