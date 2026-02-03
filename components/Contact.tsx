'use client';

import { Mail, Linkedin, Github, Twitter } from 'lucide-react';

export default function Contact() {
  const links = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      href: "mailto:hello@ashishmala.com",
      display: "hello@ashishmala.com",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      href: "https://linkedin.com/in/ashishmala",
      display: "linkedin.com/in/ashishmala",
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      href: "https://github.com/im45145v",
      display: "github.com/im45145v",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      label: "Twitter",
      href: "https://twitter.com/im45145v",
      display: "@im45145v",
    },
  ];

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Get in Touch
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Whether you're recruiting, building something interesting, or just want to chat about hackathons and tech communities—I'd love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 group"
            >
              <div className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                {link.icon}
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-500 dark:text-gray-500">
                  {link.label}
                </div>
                <div className="text-sm font-medium group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                  {link.display}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Built with care • No tracking, no analytics, just a simple site
          </p>
        </div>
      </div>
    </section>
  );
}
