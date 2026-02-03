'use client';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-3xl mx-auto animate-fade-in">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Hey, I'm Ashish.
            </h1>
            <div className="space-y-3 text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                I build things, lead communities, and spend a lot of time around hackathons.
              </p>
              <p>
                Introverted by default. Curious about a lot of things.
              </p>
            </div>
          </div>
          
          <div className="pt-4">
            <p className="text-base text-gray-500 dark:text-gray-500">
              Currently pursuing an MBA at IIM Ranchi, after graduating with a B.Tech from SNIST. 
              Balancing tech and management, one project at a time.
            </p>
          </div>

          <div className="pt-8">
            <a 
              href="#what-i-do" 
              className="inline-block text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              Scroll to learn more ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
