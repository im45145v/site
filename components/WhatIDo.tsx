'use client';

export default function WhatIDo() {
  const activities = [
    {
      title: "Building & Shipping",
      description: "From hackathon prototypes to production-ready projects, I love turning ideas into working software.",
    },
    {
      title: "Community Leadership",
      description: "Lead at Hackerabad, Postman Student Leader. Organizing events, workshops, and creating spaces for builders.",
    },
    {
      title: "Hackathon Participation",
      description: "Multiple-time winner and enthusiast. Nothing beats the energy of building something in 48 hours.",
    },
    {
      title: "Technical Foundations",
      description: "Strong engineering background with hands-on experience across the stack.",
    },
  ];

  return (
    <section id="what-i-do" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          What I've Been Up To
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {activities.map((activity, index) => (
            <div 
              key={index} 
              className="space-y-2 p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold">
                {activity.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
