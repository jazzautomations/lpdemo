import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bot, ArrowRight, Zap, MessageSquare, BarChart3, Users, Clock, Shield } from "lucide-react";
import NET from "vanta/dist/vanta.net.min";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/* ─── Theme tokens ─── */
const theme = {
  dark: "#0a0a0f",
  surface: "#111118",
  card: "#17171f",
  border: "#262632",
  text: "#eae8e4",
  muted: "#8a8690",
  accent: "#FFD500",
  accentAlt: "#FF8C00",
  gradFrom: "#FFD500",
  gradTo: "#FF8C00",
};

const features = [
  {
    icon: MessageSquare,
    title: "SDR Automatizado",
    desc: "Responde, qualifica e agenda no WhatsApp 24/7. Seu cliente nunca mais cai no esquecimento.",
  },
  {
    icon: BarChart3,
    title: "CRM Inteligente",
    desc: "Cada lead com histórico completo, score de engajamento e próxima ação sugerida pela IA.",
  },
  {
    icon: Zap,
    title: "Automações Visuais",
    desc: "Crie fluxos completos de follow-up. WhatsApp, Instagram, email, tudo conectado.",
  },
  {
    icon: Clock,
    title: "Agendamento IA",
    desc: "O agente agenda reuniões direto no Google Calendar. Zero conflito, zero mão-de-obra.",
  },
  {
    icon: Users,
    title: "Multi-tenant",
    desc: "Cada cliente é um workspace isolado. Escala sem complicação.",
  },
  {
    icon: Shield,
    title: "Seguro por padrão",
    desc: "Autenticação, row-level security e dados criptografados. Sem surpresas.",
  },
];

const metrics = [
  { value: "3x", label: "mais conversões" },
  { value: "24/7", label: "disponível" },
  { value: "<2s", label: "tempo de resposta" },
  { value: "Zero", label: "leads perdidos" },
];

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  const [cssVars] = useState(() =>
    Object.entries({
      "--color-jazz-dark": theme.dark,
      "--color-jazz-surface": theme.surface,
      "--color-jazz-card": theme.card,
      "--color-jazz-border": theme.border,
      "--color-jazz-text": theme.text,
      "--color-jazz-muted": theme.muted,
      "--color-jazz-accent": theme.accent,
      "--color-jazz-accent-alt": theme.accentAlt,
      "--color-jazz-gradient-from": theme.gradFrom,
      "--color-jazz-gradient-to": theme.gradTo,
    } as Record<string, string>)
  );

  /* ─── Vanta + Lenis init ─── */
  useEffect(() => {
    if (vantaRef.current && !vantaEffect.current) {
      vantaEffect.current = NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        backgroundColor: 0x0a0a0f,
        color: 0xffd500,
        points: 8.0,
        maxDistance: 22.0,
        spacing: 18.0,
        showDots: true,
      });
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      vantaEffect.current?.destroy();
      vantaEffect.current = null;
      lenis.destroy();
    };
  }, []);

  /* ─── GSAP entrance ─── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero stagger */
      const heroEls = gsap.utils.toArray<HTMLElement>("[data-hero]");
      gsap.fromTo(heroEls, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.2 });

      /* Features */
      gsap.utils.toArray<HTMLElement>(".feat-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            delay: (i % 3) * 0.08,
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
      });

      /* Metrics */
      gsap.utils.toArray<HTMLElement>(".metric-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.4)",
            delay: i * 0.1,
            scrollTrigger: { trigger: ".metrics-row", start: "top 88%" },
          }
        );
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} style={Object.fromEntries(cssVars)} className="min-h-screen bg-[var(--color-jazz-dark)] text-[var(--color-jazz-text)] font-sans antialiased overflow-x-clip">
      {/* ──────────── HERO ──────────── */}
      <section ref={vantaRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Nav */}
        <nav data-hero className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-xl bg-[var(--color-jazz-dark)]/70 border-b border-[var(--color-jazz-border)]/40">
          <div className="flex items-center gap-2.5">
            <Bot className="w-6 h-6 text-[var(--color-jazz-accent)]" />
            <span className="text-base font-bold tracking-tight">
              Jazz <span className="text-[var(--color-jazz-accent)]">Automations</span>
            </span>
          </div>
          <a
            href="#precos"
            className="px-5 py-2 rounded-full border border-[var(--color-jazz-border)] text-sm font-semibold hover:border-[var(--color-jazz-accent)]/30 transition-colors duration-200"
          >
            Ver planos
          </a>
        </nav>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
          <p data-hero className="text-sm font-semibold tracking-widest uppercase text-[var(--color-jazz-accent)] mb-4">
            Agente IA para WhatsApp
          </p>
          <h1 data-hero className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            Seu time de vendas{" "}
            <span className="bg-gradient-to-r from-[var(--color-jazz-gradient-from)] to-[var(--color-jazz-gradient-to)] bg-clip-text text-transparent">
              nunca mais dorme
            </span>
          </h1>
          <p data-hero className="text-lg md:text-xl text-[var(--color-jazz-muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Automatize follow-ups, qualifique leads e agende reuniões — tudo pelo WhatsApp, Instagram e mais, com IA que entende seu negócio.
          </p>
          <div data-hero className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://jazzautomations.com.br"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[var(--color-jazz-accent)] text-[var(--color-jazz-dark)] font-bold text-base hover:scale-105 transition-transform duration-200"
            >
              Começar grátis
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#features"
              className="px-8 py-4 rounded-full border border-[var(--color-jazz-border)] text-sm font-semibold hover:border-[var(--color-jazz-accent)]/30 transition-colors duration-200"
            >
              Ver como funciona
            </a>
          </div>
        </div>
      </section>

      {/* ──────────── METRICS ──────────── */}
      <section className="relative py-16 bg-[var(--color-jazz-surface)] border-y border-[var(--color-jazz-border)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="metrics-row grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((m) => (
              <div key={m.label} className="metric-item text-center">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-[var(--color-jazz-gradient-from)] to-[var(--color-jazz-gradient-to)] bg-clip-text text-transparent mb-1">
                  {m.value}
                </div>
                <div className="text-sm text-[var(--color-jazz-muted)]">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── FEATURES ──────────── */}
      <section id="features" className="relative py-24 md:py-32 bg-[var(--color-jazz-dark)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase text-[var(--color-jazz-accent)] mb-3">
              Tudo que você precisa
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              De lead a cliente,{" "}
              <span className="text-[var(--color-jazz-accent)]">automatizado</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="feat-card p-7 rounded-2xl border border-[var(--color-jazz-border)] bg-[var(--color-jazz-card)] hover:border-[var(--color-jazz-accent)]/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-jazz-accent)]/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[var(--color-jazz-accent)]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-jazz-muted)]">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────── PRICING ──────────── */}
      <section id="precos" className="relative py-24 md:py-32 bg-[var(--color-jazz-surface)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase text-[var(--color-jazz-accent)] mb-3">
              Preços transparentes
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Escolha seu plano
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {[
              {
                name: "Starter",
                price: "R$ 197",
                period: "/mês",
                desc: "Pra quem quer testar",
                features: ["1 agente IA", "500 conversas/mês", "1 número WhatsApp", "CRM básico", "Suporte por email"],
                cta: "Começar grátis",
                highlighted: false,
              },
              {
                name: "Pro",
                price: "R$ 497",
                period: "/mês",
                desc: "Pra quem quer crescer",
                features: [
                  "3 agentes IA",
                  "Conversas ilimitadas",
                  "3 números WhatsApp",
                  "CRM avançado + automações",
                  "Agendamento automático",
                  "Dashboard analytics",
                  "Suporte prioritário",
                ],
                cta: "Ativar agora",
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Sob consulta",
                period: "",
                desc: "Pra operações grandes",
                features: [
                  "Agentes ilimitados",
                  "Números WhatsApp ilimitados",
                  "Multi-tenant",
                  "API completa",
                  "SLA garantido",
                  "Onboarding dedicado",
                ],
                cta: "Falar com time",
                highlighted: false,
              },
            ].map((p) => (
              <div
                key={p.name}
                className={`feat-card relative p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  p.highlighted
                    ? "border-[var(--color-jazz-accent)]/50 bg-[var(--color-jazz-accent)]/5 shadow-2xl shadow-[var(--color-jazz-accent)]/10 scale-[1.02]"
                    : "border-[var(--color-jazz-border)] bg-[var(--color-jazz-card)]"
                }`}
              >
                {p.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[var(--color-jazz-accent)] text-[var(--color-jazz-dark)] text-xs font-bold tracking-wide uppercase">
                    Mais popular
                  </div>
                )}
                <h3 className="text-lg font-bold mb-1">{p.name}</h3>
                <p className="text-sm text-[var(--color-jazz-muted)] mb-5">{p.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black tracking-tight">{p.price}</span>
                  {p.period && <span className="text-sm text-[var(--color-jazz-muted)]">{p.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <div className="w-4 h-4 mt-0.5 rounded-full bg-[var(--color-jazz-accent)]/10 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-jazz-accent)]" />
                      </div>
                      <span className="text-[var(--color-jazz-muted)]">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://jazzautomations.com.br"
                  className={`block w-full py-3 rounded-full text-center text-sm font-bold transition-transform duration-200 hover:scale-105 ${
                    p.highlighted
                      ? "bg-[var(--color-jazz-accent)] text-[var(--color-jazz-dark)]"
                      : "border border-[var(--color-jazz-border)] text-[var(--color-jazz-text)] hover:border-[var(--color-jazz-accent)]/30"
                  }`}
                >
                  {p.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── CTA ──────────── */}
      <section className="relative py-24 md:py-32 bg-[var(--color-jazz-dark)]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="feat-card relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-[var(--color-jazz-card)] to-[var(--color-jazz-dark)] border border-[var(--color-jazz-border)] text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[var(--color-jazz-accent)]/8 blur-[120px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-5">
                Seu próximo cliente tá{" "}
                <span className="bg-gradient-to-r from-[var(--color-jazz-gradient-from)] to-[var(--color-jazz-gradient-to)] bg-clip-text text-transparent">
                  esperando
                </span>
              </h2>
              <p className="text-lg text-[var(--color-jazz-muted)] max-w-xl mx-auto mb-8">
                Não perca mais leads por falta de follow-up. Seu agente de IA trabalha enquanto você dorme.
              </p>
              <a
                href="https://jazzautomations.com.br"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[var(--color-jazz-accent)] text-[var(--color-jazz-dark)] font-bold text-base hover:scale-105 transition-transform duration-200"
              >
                Começar agora — é grátis
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── FOOTER ──────────── */}
      <footer className="py-10 bg-[var(--color-jazz-surface)] border-t border-[var(--color-jazz-border)]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-[var(--color-jazz-accent)]" />
            <span className="text-sm font-semibold">
              Jazz <span className="text-[var(--color-jazz-accent)]">Automations</span>
            </span>
          </div>
          <p className="text-xs text-[var(--color-jazz-muted)]">
            © {new Date().getFullYear()} Jazz Automations. Feito com IA e café.
          </p>
        </div>
      </footer>
    </div>
  );
}
