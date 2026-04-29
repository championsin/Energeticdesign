import { useState } from "react";
import { X, Plus } from "lucide-react";
import { motion } from "motion/react";

interface ProjectFormProps {
  onClose: () => void;
  onSubmit: (project: {
    title: string;
    description: string;
    tools: string[];
    collaborators: string[];
    mediaUrl?: string;
  }) => void;
}

export function ProjectForm({ onClose, onSubmit }: ProjectFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [toolInput, setToolInput] = useState("");
  const [tools, setTools] = useState<string[]>([]);
  const [collaboratorInput, setCollaboratorInput] = useState("");
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [mediaUrl, setMediaUrl] = useState("");

  const handleAddTool = () => {
    if (toolInput.trim() && !tools.includes(toolInput.trim())) {
      setTools([...tools, toolInput.trim()]);
      setToolInput("");
    }
  };

  const handleAddCollaborator = () => {
    if (collaboratorInput.trim() && !collaborators.includes(collaboratorInput.trim())) {
      setCollaborators([...collaborators, collaboratorInput.trim()]);
      setCollaboratorInput("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, tools, collaborators, mediaUrl: mediaUrl || undefined });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto"
    >
      <div className="min-h-screen p-8 flex items-start justify-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-4xl bg-secondary border-4 border-accent p-12 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <X size={24} />
          </button>

          <h2 className="uppercase tracking-tight mb-8" style={{ fontSize: "3rem", fontWeight: 900, lineHeight: 1.1 }}>
            Submit Work
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="uppercase tracking-widest" style={{ fontSize: "0.7rem", fontFamily: "monospace" }}>
                Project Title*
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-input border-2 border-border focus:border-accent px-6 py-4 text-foreground outline-none transition-colors"
                style={{ fontSize: "1.2rem" }}
                placeholder="AI Agent Swarm"
              />
            </div>

            <div className="space-y-3">
              <label className="uppercase tracking-widest" style={{ fontSize: "0.7rem", fontFamily: "monospace" }}>
                Description*
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={6}
                className="w-full bg-input border-2 border-border focus:border-accent px-6 py-4 text-foreground outline-none transition-colors resize-none"
                style={{ fontSize: "1rem" }}
                placeholder="Built a multi-agent system that processes 5k requests daily..."
              />
            </div>

            <div className="space-y-3">
              <label className="uppercase tracking-widest" style={{ fontSize: "0.7rem", fontFamily: "monospace" }}>
                Tech Stack
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={toolInput}
                  onChange={(e) => setToolInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTool())}
                  className="flex-1 bg-input border-2 border-border focus:border-accent px-6 py-3 text-foreground outline-none transition-colors"
                  style={{ fontFamily: "monospace" }}
                  placeholder="Python, PyTorch, Vercel..."
                />
                <button
                  type="button"
                  onClick={handleAddTool}
                  className="px-6 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors flex items-center gap-2"
                >
                  <Plus size={20} />
                  ADD
                </button>
              </div>
              {tools.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tools.map((tool) => (
                    <div
                      key={tool}
                      className="px-3 py-1 bg-muted border border-border flex items-center gap-2"
                      style={{ fontFamily: "monospace", fontSize: "0.75rem" }}
                    >
                      {tool}
                      <button
                        type="button"
                        onClick={() => setTools(tools.filter((t) => t !== tool))}
                        className="hover:text-destructive"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <label className="uppercase tracking-widest" style={{ fontSize: "0.7rem", fontFamily: "monospace" }}>
                Collaborators
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={collaboratorInput}
                  onChange={(e) => setCollaboratorInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddCollaborator())}
                  className="flex-1 bg-input border-2 border-border focus:border-accent px-6 py-3 text-foreground outline-none transition-colors"
                  style={{ fontFamily: "monospace" }}
                  placeholder="@username or email"
                />
                <button
                  type="button"
                  onClick={handleAddCollaborator}
                  className="px-6 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors flex items-center gap-2"
                >
                  <Plus size={20} />
                  ADD
                </button>
              </div>
              {collaborators.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {collaborators.map((collab) => (
                    <div
                      key={collab}
                      className="px-3 py-1 bg-muted border border-border flex items-center gap-2"
                      style={{ fontFamily: "monospace", fontSize: "0.75rem" }}
                    >
                      {collab}
                      <button
                        type="button"
                        onClick={() => setCollaborators(collaborators.filter((c) => c !== collab))}
                        className="hover:text-destructive"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <label className="uppercase tracking-widest" style={{ fontSize: "0.7rem", fontFamily: "monospace" }}>
                Media URL (GitHub, Live Demo, etc.)
              </label>
              <input
                type="url"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                className="w-full bg-input border-2 border-border focus:border-accent px-6 py-3 text-foreground outline-none transition-colors"
                style={{ fontFamily: "monospace" }}
                placeholder="https://github.com/..."
              />
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-accent text-accent-foreground py-5 uppercase tracking-widest hover:bg-accent/90 transition-colors"
                style={{ fontSize: "1.1rem", fontWeight: 900 }}
              >
                Submit for Approval
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-8 bg-muted text-foreground py-5 uppercase tracking-widest hover:bg-muted/80 transition-colors"
                style={{ fontSize: "1.1rem", fontWeight: 900 }}
              >
                Cancel
              </button>
            </div>
          </form>

          <div className="mt-8 p-4 border-l-4 border-accent bg-muted/30">
            <p style={{ fontFamily: "monospace", fontSize: "0.75rem" }} className="text-muted-foreground">
              * Your submission will be sent to your manager for approval. Tagged collaborators must accept before submission is complete.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
