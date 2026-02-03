'use client';

import { useState } from 'react';
import { Music, Tv, Code } from 'lucide-react';

export default function PersonalityLayer() {
  const [showUsernameLore, setShowUsernameLore] = useState(false);

  const interests = [
    {
      icon: <Music className="w-6 h-6" />,
      title: "Music",
      items: ["Noga Erez", "Tai Verdes", "Discovery playlists at 2 AM"],
    },
    {
      icon: <Tv className="w-6 h-6" />,
      title: "Shows & Stories",
      items: ["K-dramas", "Superhero stories", "Anything with good character development"],
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Internet Things",
      items: ["Tech Twitter", "Hackathon memes", "Developer communities"],
    },
  ];

  return (
    <section id="personality" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Things That Make Me, Me
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-12">
          Beyond the resume
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {interests.map((interest, index) => (
            <div 
              key={index} 
              className="space-y-3 p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              <div className="text-gray-700 dark:text-gray-300">
                {interest.icon}
              </div>
              <h3 className="text-lg font-semibold">
                {interest.title}
              </h3>
              <ul className="space-y-1">
                {interest.items.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Username Easter Egg */}
        <div className="p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowUsernameLore(!showUsernameLore)}
            className="w-full text-left space-y-2 hover:opacity-80 transition-opacity"
          >
            <h3 className="text-lg font-semibold flex items-center justify-between">
              <span>About the username...</span>
              <span className="text-sm text-gray-500">
                {showUsernameLore ? '↑' : '→'}
              </span>
            </h3>
          </button>
          
          {showUsernameLore && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-slide-up">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Ever wondered what <span className="font-mono font-semibold">IM45145V</span> means?
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Rotate it 180°...
              </p>
              <div className="inline-block p-4 bg-gray-100 dark:bg-gray-900 rounded font-mono text-2xl transform rotate-180">
                IM45145V
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                It spells <span className="font-semibold">Ashish</span>. 
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                (Yes, I'm that kind of nerd.)
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
