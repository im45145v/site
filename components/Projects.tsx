'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ProjectProps {
  title: string;
  type: string;
  summary: string;
  details?: {
    what: string;
    why: string;
    learned: string;
  };
}

function ProjectCard({ title, type, summary, details }: ProjectProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">{type}</span>
          </div>
          {details && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex-shrink-0 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              aria-label={isExpanded ? "Show less" : "Show more"}
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {summary}
        </p>

        {details && isExpanded && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4 animate-slide-up">
            <div>
              <h4 className="font-semibold mb-2">What was built</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {details.what}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Why it mattered</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {details.why}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">What was learned</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {details.learned}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const projects: ProjectProps[] = [
    {
      title: "Hackerabad Community Events",
      type: "Community Leadership",
      summary: "Led organization of hackathons, workshops, and tech events bringing together hundreds of builders and learners.",
      details: {
        what: "Coordinated end-to-end event planning, speaker management, venue logistics, and participant engagement for multiple tech events. Built connections between students, professionals, and companies.",
        why: "Creating accessible spaces for learning and collaboration helps grow the local tech ecosystem. Many participants built their first project or made their first tech connection at our events.",
        learned: "How to balance structure with flexibility, manage diverse stakeholder expectations, and create genuine value for attendees beyond just 'running an event'.",
      },
    },
    {
      title: "Postman Student Leadership",
      type: "Community & Advocacy",
      summary: "Student leader for Postman, organizing workshops and helping students learn API development and testing.",
      details: {
        what: "Conducted hands-on workshops on API development, organized study groups, and created learning resources. Connected students with Postman's ecosystem and best practices.",
        why: "APIs are fundamental to modern development, but often feel intimidating to beginners. Making this knowledge accessible opens doors to better development practices.",
        learned: "How to break down complex technical concepts, adapt teaching style to different skill levels, and build sustainable learning communities.",
      },
    },
    {
      title: "Hackathon Wins & Projects",
      type: "Development & Competition",
      summary: "Multiple hackathon wins building everything from social impact tools to technical utilities. Each one taught something new.",
      details: {
        what: "Built diverse projects under tight deadlines: education platforms, healthcare tools, developer utilities. Each project required quick learning, smart scoping, and effective demos.",
        why: "Hackathons force you to ship. They teach prioritization, rapid prototyping, and how to communicate technical value. Plus, they're genuinely fun.",
        learned: "MVP thinking, working with new tech under pressure, presenting to judges, and the importance of solving real problems over building cool tech for its own sake.",
      },
    },
    {
      title: "Technical Projects",
      type: "Development",
      summary: "Various web applications, tools, and experiments. Some shipped, some learned from, all meaningful.",
      details: {
        what: "Full-stack applications using modern frameworks, API integrations, automation tools, and experimental projects trying new technologies and patterns.",
        why: "Continuous building keeps skills sharp and curiosity alive. Every project is a chance to try something new or do something familiar better.",
        learned: "The value of starting small, iterating based on real use, and knowing when to move on. Also, documentation matters more than you think.",
      },
    },
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Projects, Hackathons & Community Work
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-12">
          Click to expand for more details
        </p>
        
        <div className="space-y-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
