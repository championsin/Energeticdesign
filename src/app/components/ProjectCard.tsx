import { motion } from "motion/react";
import { Github, ExternalLink, Users, Clock } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  tools: string[];
  status: "draft" | "pending" | "approved" | "rejected";
  rating?: number;
  feedback?: string;
  collaborators: string[];
  submittedAt?: Date;
}

interface ProjectCardProps {
  project: Project;
  onEdit?: () => void;
}

export function ProjectCard({ project, onEdit }: ProjectCardProps) {
  const statusColors = {
    draft: "text-muted-foreground",
    pending: "text-accent",
    approved: "text-accent",
    rejected: "text-destructive",
  };

  const borderColors = {
    draft: "#a8a8f0",
    pending: "#d4d4f7",
    approved: "#8b8bec",
    rejected: "#a8a8f0",
  };

  const borderColor = borderColors[project.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`relative bg-secondary p-8 group cursor-pointer ${statusColors[project.status]}`}
      style={{ border: `4px solid ${borderColor}` }}
      onClick={onEdit}
    >
      <div className="absolute top-0 right-0 px-4 py-2 bg-background" style={{ borderLeft: `4px solid ${borderColor}`, borderBottom: `4px solid ${borderColor}` }}>
        <span className="uppercase tracking-widest" style={{ fontSize: "0.65rem", fontFamily: "monospace" }}>
          {project.status}
        </span>
      </div>

      <div className="space-y-6">
        <h3 className="uppercase tracking-tight" style={{ fontSize: "2rem", fontWeight: 900, lineHeight: 1.1 }}>
          {project.title}
        </h3>

        <p className="text-foreground/80" style={{ fontSize: "0.95rem" }}>
          {project.description}
        </p>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <div
                key={tool}
                className="px-3 py-1 bg-muted border border-border"
                style={{ fontFamily: "monospace", fontSize: "0.75rem" }}
              >
                {tool}
              </div>
            ))}
          </div>

          {project.collaborators.length > 0 && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users size={16} />
              <span style={{ fontFamily: "monospace", fontSize: "0.8rem" }}>
                {project.collaborators.length} collaborator{project.collaborators.length !== 1 ? "s" : ""}
              </span>
            </div>
          )}

          {project.submittedAt && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock size={16} />
              <span style={{ fontFamily: "monospace", fontSize: "0.8rem" }}>
                {new Date(project.submittedAt).toLocaleDateString()}
              </span>
            </div>
          )}

          {project.status === "approved" && project.rating && (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 ${i < project.rating! ? "bg-accent" : "bg-muted"}`}
                  />
                ))}
              </div>
              <span className="text-accent" style={{ fontFamily: "monospace", fontSize: "0.8rem" }}>
                {project.rating}/5
              </span>
            </div>
          )}

          {project.feedback && (
            <div className="mt-4 p-4 bg-muted/50 border-l-4 border-accent">
              <p style={{ fontFamily: "monospace", fontSize: "0.8rem" }} className="text-foreground/90">
                {project.feedback}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ border: `4px solid ${borderColor}`, filter: "brightness(1.2)" }} />
    </motion.div>
  );
}
