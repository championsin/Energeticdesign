import { useState, useRef, useEffect } from "react";
import { Search, ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { ProjectPoster } from "./ProjectPoster";

const mockTalents = [
  {
    id: "1",
    employee: {
      name: "Sarah Chen",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      company: "Google",
      companyLogo: "https://www.google.com/favicon.ico",
    },
    project: {
      title: "AI Agent Swarm",
      description: "Built a multi-agent system that autonomously processes 5k daily requests. Reduced manual intervention by 87%. The system uses reinforcement learning to optimize task allocation across 12 autonomous agents.",
      tools: ["Python", "PyTorch", "FastAPI", "Docker", "Redis", "Kubernetes"],
      rating: 5,
      metrics: {
        users: "5000+",
        uptime: "99.9%",
        latency: "12ms",
      },
    },
  },
  {
    id: "2",
    employee: {
      name: "Alex Kim",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      company: "Meta",
      companyLogo: "https://www.facebook.com/favicon.ico",
    },
    project: {
      title: "Real-time Analytics Engine",
      description: "Designed and shipped a high-performance analytics dashboard processing 2M events/day with sub-100ms latency. Built custom WebSocket protocol for live data streaming.",
      tools: ["React", "WebSockets", "Redis", "Kafka", "PostgreSQL"],
      rating: 5,
      metrics: {
        events: "2M/day",
        latency: "84ms",
        concurrent: "10k",
      },
    },
  },
  {
    id: "3",
    employee: {
      name: "Mike Rodriguez",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      company: "Stripe",
      companyLogo: "https://stripe.com/favicon.ico",
    },
    project: {
      title: "ML Model Optimization Pipeline",
      description: "Reduced model inference time by 63% through quantization and custom CUDA kernels. Currently serving 10k+ users with zero downtime.",
      tools: ["CUDA", "TensorRT", "Python", "C++", "Docker"],
      rating: 4,
      metrics: {
        speedup: "3.2x",
        users: "10k+",
        accuracy: "98.7%",
      },
    },
  },
  {
    id: "4",
    employee: {
      name: "Priya Sharma",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      company: "Airbnb",
      companyLogo: "https://www.airbnb.com/favicon.ico",
    },
    project: {
      title: "Distributed Cache Layer",
      description: "Architected a distributed caching system that reduced database load by 78% and improved response times across all services.",
      tools: ["Go", "Redis", "Memcached", "Prometheus"],
      rating: 5,
      metrics: {
        reduction: "78%",
        qps: "50k",
        ttl: "24h",
      },
    },
  },
];

export function RecruiterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
  });

  const searchOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const searchY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current && scrollContainerRef.current.scrollTop > 50) {
        setHasScrolled(true);
      }
    };

    const container = scrollContainerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="h-screen overflow-y-auto"
      style={{ backgroundColor: "#f5f5f0" }}
    >
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-8">
        <div className="w-full max-w-5xl">
          <h1
            className="uppercase tracking-tighter text-center mb-12"
            style={{
              fontSize: "4.5rem",
              fontWeight: 900,
              lineHeight: 0.9,
              color: "#1a1a1a",
              letterSpacing: "-0.03em",
            }}
          >
            DISCOVER<br />CHAMPIONS
          </h1>

          <div className="relative" style={{ border: "8px solid #1a1a1a" }}>
            <div className="absolute inset-0" style={{ border: "4px solid #3a2a1a", margin: "8px" }} />
            <div className="relative bg-white p-10">
              <div className="flex items-center gap-6">
                <Search size={48} style={{ color: "#1a1a1a" }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by skills, projects, or technologies..."
                  className="flex-1 bg-transparent outline-none"
                  style={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#1a1a1a",
                  }}
                />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hasScrolled ? 0 : 1 }}
            className="text-center mt-12 flex flex-col items-center gap-4"
          >
            <p
              style={{
                fontFamily: "monospace",
                fontSize: "0.9rem",
                color: "#666",
                letterSpacing: "0.1em",
              }}
            >
              SCROLL TO SEE THE TALENTS
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowDown size={24} style={{ color: "#666" }} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="px-8 pb-24 space-y-12 flex flex-col items-center">
        {mockTalents.map((talent, index) => (
          <ProjectPoster key={talent.id} talent={talent} index={index} />
        ))}
      </div>
    </div>
  );
}
