import { useState } from "react";
import { Plus } from "lucide-react";
import { Navbar } from "./components/Navbar";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectForm } from "./components/ProjectForm";
import { RecruiterPage } from "./components/RecruiterPage";

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

const mockProjects: Project[] = [
  {
    id: "1",
    title: "AI Agent Swarm",
    description: "Built a multi-agent system that autonomously processes 5k daily requests. Reduced manual intervention by 87%.",
    tools: ["Python", "PyTorch", "FastAPI", "Docker"],
    status: "approved",
    rating: 5,
    feedback: "Exceptional work. The architecture is clean and the performance metrics speak for themselves.",
    collaborators: ["@sarah.chen", "@mike.rodriguez"],
    submittedAt: new Date(2026, 2, 15),
  },
  {
    id: "2",
    title: "Real-time Analytics Dashboard",
    description: "Designed and shipped a high-performance analytics dashboard processing 2M events/day with sub-100ms latency.",
    tools: ["React", "WebSockets", "Redis", "Kafka"],
    status: "pending",
    collaborators: ["@alex.kim"],
    submittedAt: new Date(2026, 3, 18),
  },
  {
    id: "3",
    title: "ML Model Optimization Pipeline",
    description: "Reduced model inference time by 63% through quantization and custom CUDA kernels. Currently serving 10k+ users.",
    tools: ["CUDA", "TensorRT", "Python", "C++"],
    status: "approved",
    rating: 4,
    feedback: "Strong technical execution. Would like to see more documentation on the optimization strategies.",
    collaborators: [],
    submittedAt: new Date(2026, 1, 28),
  },
];

export default function App() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [showForm, setShowForm] = useState(false);
  const [currentRole, setCurrentRole] = useState<"employee" | "recruiter">("employee");

  const handleSubmitProject = (newProject: {
    title: string;
    description: string;
    tools: string[];
    collaborators: string[];
    mediaUrl?: string;
  }) => {
    const project: Project = {
      id: Date.now().toString(),
      ...newProject,
      status: "pending",
      submittedAt: new Date(),
    };
    setProjects([project, ...projects]);
  };

  const approvedCount = projects.filter((p) => p.status === "approved").length;
  const pendingCount = projects.filter((p) => p.status === "pending").length;

  if (currentRole === "recruiter") {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar currentRole={currentRole} onRoleSwitch={(role) => setCurrentRole(role)} />
        <RecruiterPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar currentRole={currentRole} onRoleSwitch={(role) => setCurrentRole(role)} />
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="mb-16">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1
                className="uppercase tracking-tighter text-foreground"
                style={{ fontSize: "5rem", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.02em" }}
              >
                YOUR ENGINE.
              </h1>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-accent" style={{ fontSize: "1.5rem", fontWeight: 900 }}>
                  *
                </span>
                <p className="text-muted-foreground" style={{ fontSize: "1rem", fontFamily: "monospace" }}>
                  Stop talking. Start showing.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-accent text-accent-foreground px-8 py-5 flex items-center gap-3 hover:bg-accent/90 transition-colors group"
            >
              <Plus size={24} className="group-hover:rotate-90 transition-transform" />
              <span className="uppercase tracking-widest" style={{ fontSize: "0.9rem", fontWeight: 900 }}>
                Submit Work
              </span>
            </button>
          </div>

          <div className="flex gap-8 mt-8">
            <div className="bg-secondary border-l-4 border-accent px-6 py-4">
              <div className="text-accent" style={{ fontSize: "2.5rem", fontWeight: 900, fontFamily: "monospace" }}>
                {approvedCount}
              </div>
              <div
                className="text-muted-foreground uppercase tracking-widest"
                style={{ fontSize: "0.65rem", fontFamily: "monospace" }}
              >
                Verified
              </div>
            </div>
            <div className="bg-secondary border-l-4 border-muted px-6 py-4">
              <div className="text-foreground" style={{ fontSize: "2.5rem", fontWeight: 900, fontFamily: "monospace" }}>
                {pendingCount}
              </div>
              <div
                className="text-muted-foreground uppercase tracking-widest"
                style={{ fontSize: "0.65rem", fontFamily: "monospace" }}
              >
                Pending
              </div>
            </div>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="border-4 border-dashed border-muted p-24 text-center">
            <p className="text-muted-foreground uppercase tracking-widest" style={{ fontSize: "0.9rem", fontFamily: "monospace" }}>
              Your engine is idling. Drop a project to start the telemetry.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>

      {showForm && <ProjectForm onClose={() => setShowForm(false)} onSubmit={handleSubmitProject} />}
    </div>
  );
}
