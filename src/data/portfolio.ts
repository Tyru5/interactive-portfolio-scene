export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  link?: string
  github?: string
  position: [number, number, number]
  color: string
}

export interface Skill {
  category: string
  items: string[]
  color: string
}

export interface Contact {
  type: string
  value: string
  link?: string
  icon: string
}

export interface PortfolioData {
  name: string
  title: string
  about: string
  email: string
  projects: Project[]
  skills: Skill[]
  contact: Contact[]
}

export const portfolioData: PortfolioData = {
  name: "Tyrus Malmström",
  title: "Software Engineer",
  about: "Enthusiastic, passionate, and adaptable software engineer focused on solving problems through code with a forward-looking mindset. Currently working on tryiris.ai.",
  email: "tyrusm@hotmail.com",

  projects: [
    {
      id: "elizarpc",
      title: "elizarpc.chat",
      description: "gRPC demonstration with 3D model integration showcasing real-time communication protocols.",
      technologies: ["gRPC", "Three.js", "WebGL"],
      link: "https://elizarpc.chat",
      position: [22, 0, -3],
      color: "#06b6d4"
    },
    {
      id: "eheye",
      title: "eheye.chat",
      description: "AI chatbot POC featuring authentication and streaming responses for seamless user interaction.",
      technologies: ["AI/ML", "Auth", "Streaming"],
      link: "https://eheye.chat",
      position: [25, 0, 0],
      color: "#8b5cf6"
    },
    {
      id: "llmpricing",
      title: "llmpricing.fyi",
      description: "LLM pricing information platform built with modern stack for comparing AI model costs.",
      technologies: ["Convex", "Next.js", "shadcn UI"],
      link: "https://llmpricing.fyi",
      position: [28, 0, -3],
      color: "#10b981"
    },
    {
      id: "promptnsight",
      title: "promptnsight.ai",
      description: "AI chat interface inspired by Perplexity, providing intelligent search and answers.",
      technologies: ["AI", "React", "Search"],
      link: "https://promptnsight.ai",
      position: [25, 0, 3],
      color: "#f59e0b"
    },
    {
      id: "raytracer",
      title: "Ray Tracer",
      description: "C++ raytracer with reflection support, demonstrating graphics programming fundamentals.",
      technologies: ["C++", "Graphics", "Math"],
      github: "https://github.com/tyru5/ray-tracer",
      position: [22, 0, 3],
      color: "#ef4444"
    },
    {
      id: "1edtech",
      title: "1EdTech npm Package",
      description: "LTI 1.3 specification implementation for educational technology integration.",
      technologies: ["TypeScript", "npm", "EdTech"],
      position: [28, 0, 0],
      color: "#ec4899"
    }
  ],

  skills: [
    {
      category: "Languages",
      items: ["JavaScript", "TypeScript", "Java", "C", "C++", "C#", "PHP", "Elixir"],
      color: "#6366f1"
    },
    {
      category: "Frameworks",
      items: ["Next.js", "React", "Angular", "Vue.js", "Svelte", "Astro", "Express", "Phoenix"],
      color: "#06b6d4"
    },
    {
      category: "Runtimes",
      items: ["Node.js", "Bun", "Deno"],
      color: "#10b981"
    },
    {
      category: "Databases",
      items: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
      color: "#f59e0b"
    }
  ],

  contact: [
    {
      type: "Email",
      value: "tyrusm@hotmail.com",
      link: "mailto:tyrusm@hotmail.com",
      icon: "mail"
    },
    {
      type: "LinkedIn",
      value: "tyrus-malmstrom",
      link: "https://linkedin.com/in/tyrus-malmstrom",
      icon: "linkedin"
    },
    {
      type: "GitHub",
      value: "tyru5",
      link: "https://github.com/tyru5",
      icon: "github"
    },
    {
      type: "Website",
      value: "tiru5.dev",
      link: "https://tiru5.dev",
      icon: "globe"
    }
  ]
}
