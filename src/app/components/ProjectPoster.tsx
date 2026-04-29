import { useState } from "react";
import { motion } from "motion/react";
import { Star, TrendingUp, Zap, Users } from "lucide-react";

interface Talent {
  id: string;
  employee: {
    name: string;
    photo: string;
    company: string;
    companyLogo: string;
  };
  project: {
    title: string;
    description: string;
    tools: string[];
    rating: number;
    metrics: {
      [key: string]: string;
    };
  };
}

interface ProjectPosterProps {
  talent: Talent;
  index: number;
}

export function ProjectPoster({ talent, index }: ProjectPosterProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-4xl"
    >
      <motion.div
        className="relative overflow-hidden cursor-pointer"
        style={{
          border: "8px solid #1a1a1a",
          backgroundColor: "#fff",
          minHeight: "600px",
        }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0" style={{ border: "4px solid #3a2a1a", margin: "8px" }} />

        <div className="relative p-12">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={talent.employee.photo}
                  alt={talent.employee.name}
                  className="w-20 h-20 rounded-full object-cover"
                  style={{ border: "4px solid #ff6b35" }}
                />
                <img
                  src={talent.employee.companyLogo}
                  alt={talent.employee.company}
                  className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white p-1"
                  style={{ border: "3px solid #1a1a1a" }}
                />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: 900,
                    color: "#1a1a1a",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {talent.employee.name}
                </h3>
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.9rem",
                    color: "#666",
                    letterSpacing: "0.05em",
                  }}
                >
                  {talent.employee.company}
                </p>
              </div>
            </div>

            <div className="flex gap-1">
              {Array.from({ length: talent.project.rating }).map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  fill="#ff6b35"
                  stroke="#ff6b35"
                />
              ))}
            </div>
          </div>

          <div
            className="mb-8 p-6"
            style={{
              backgroundColor: "#ff6b35",
              border: "4px solid #1a1a1a",
            }}
          >
            <h2
              className="uppercase mb-4"
              style={{
                fontSize: "3.5rem",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
              }}
            >
              {talent.project.title}
            </h2>
          </div>

          <p
            className="mb-8 leading-relaxed"
            style={{
              fontSize: "1.2rem",
              color: "#1a1a1a",
              lineHeight: 1.6,
            }}
          >
            {talent.project.description}
          </p>

          <div className="grid grid-cols-3 gap-6 mb-8">
            {Object.entries(talent.project.metrics).map(([key, value]) => (
              <div
                key={key}
                className="p-4"
                style={{
                  backgroundColor: "#2a2a2a",
                  border: "3px solid #1a1a1a",
                }}
              >
                <div
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: 900,
                    color: "#ff6b35",
                    fontFamily: "monospace",
                  }}
                >
                  {value}
                </div>
                <div
                  className="uppercase"
                  style={{
                    fontSize: "0.7rem",
                    color: "#aaa",
                    fontFamily: "monospace",
                    letterSpacing: "0.1em",
                  }}
                >
                  {key}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {talent.project.tools.map((tool) => (
              <div
                key={tool}
                className="px-6 py-3"
                style={{
                  backgroundColor: "#f5f5f0",
                  border: "3px solid #1a1a1a",
                  fontFamily: "monospace",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "#1a1a1a",
                }}
              >
                {tool}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            backgroundColor: "rgba(255, 107, 53, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="text-center space-y-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <h3
                className="uppercase mb-4"
                style={{
                  fontSize: "4rem",
                  fontWeight: 900,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                }}
              >
                VIEW PROFILE
              </h3>
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: "1rem",
                  color: "#fff",
                  letterSpacing: "0.1em",
                }}
              >
                CLICK TO SEE FULL PORTFOLIO
              </p>
            </motion.div>

            <div className="flex gap-8 justify-center">
              <div className="text-center">
                <TrendingUp size={40} color="#fff" />
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.8rem",
                    color: "#fff",
                    marginTop: "8px",
                  }}
                >
                  PROVEN IMPACT
                </p>
              </div>
              <div className="text-center">
                <Zap size={40} color="#fff" />
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.8rem",
                    color: "#fff",
                    marginTop: "8px",
                  }}
                >
                  FAST EXECUTOR
                </p>
              </div>
              <div className="text-center">
                <Users size={40} color="#fff" />
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.8rem",
                    color: "#fff",
                    marginTop: "8px",
                  }}
                >
                  TEAM PLAYER
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
