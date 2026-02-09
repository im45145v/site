/**
 * Ashish Malla Portfolio - Funky Interactions v2.0
 * "Playful chaos with a system underneath" 
 * Updated: Feb 9, 2026 - Fixed cursor, communities, and nerd badge
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  console.log('DOM loaded, initializing components...');
  initCursorFollower();
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initTypingEffect();
  initHoverEffects();
  initUsernameReveal();
  initLogoRotation();
  loadDataFromJSON();
  
  // Initialize fun facts after a small delay to ensure DOM is ready
  setTimeout(() => {
    initFunFacts();
  }, 100);
});

/**
 * Load data from JSON file and populate page
 */
async function loadDataFromJSON() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      console.log('Using static HTML content');
      return;
    }
    
    const data = await response.json();
    console.log('Data loaded from JSON:', data);
    
    // Populate content from JSON
    populateHeroSection(data.profile);
    populateAboutBio(data.profile);
    populateActivities(data.activities);
    populateRoles(data.roles);
    populateCurrentCommunities(data.communities);
    populatePastCommunities(data.communities);
    populateSpeaking(data.speaking);
    populateOrganizing(data.organizing);
    populateTerminal(data.education);
    
    console.log('Data populated from JSON');
    
  } catch (error) {
    console.error('Error loading data.json:', error);
    console.log('Using static HTML content');
  }
}

/**
 * Populate hero section with profile data
 */
function populateHeroSection(profile) {
  if (!profile) return;
  
  // Update status
  const statusEl = document.getElementById('hero-status');
  if (statusEl && profile.status) {\n    statusEl.textContent = profile.status;
  }
  
  // Update name
  const nameEl = document.getElementById('hero-name');
  if (nameEl && profile.name) {
    nameEl.textContent = profile.name + '.';
    nameEl.setAttribute('data-text', profile.name + '.');
  }
  
  // Update title in nav and footer
  document.querySelectorAll('.logo-text').forEach(el => {
    if (profile.username) el.textContent = profile.username;
  });
  
  if (profile.tagline) {
    document.title = `${profile.name} — ${profile.tagline}`;
  }
}

/**
 * Populate about bio section
 */
function populateAboutBio(profile) {
  if (!profile || !profile.bio) return;
  
  const bioEl = document.querySelector('#about-bio p');
  if (bioEl) {
    bioEl.textContent = profile.bio;
  }
}

/**
 * Populate activities grid
 */
function populateActivities(activities) {
  if (!activities || !Array.isArray(activities)) return;
  
  const container = document.getElementById('activities-container');
  if (!container) return;
  
  container.innerHTML = activities.map(activity => `
    <div class=\"activity-card\" data-tilt>
      <div class=\"activity-icon\">${activity.icon}</div>
      <h3 class=\"activity-title\">${activity.title}</h3>
      <p class=\"activity-desc\">${activity.description}</p>
      <div class=\"activity-badge\">${activity.badge}</div>
    </div>
  `).join('');
}

/**
 * Populate roles strip
 */
function populateRoles(roles) {
  if (!roles || !Array.isArray(roles)) return;
  
  const track = document.querySelector('.roles-track');
  if (!track) return;
  
  // Duplicate roles for infinite scroll effect
  const allRoles = [...roles, ...roles];
  track.innerHTML = allRoles.map(role => `
    <span class=\"role-item\">${role}</span>
    <span class=\"role-divider\">\u2726</span>
  `).join('');
}

/**
 * Populate current communities
 */
function populateCurrentCommunities(communities) {
  if (!communities || !Array.isArray(communities)) {
    console.log('No communities data found');
    return;
  }
  
  const container = document.querySelector('.community-grid');
  if (!container) {
    console.log('Community grid not found');
    return;
  }
  
  const currentCommunities = communities.filter(c => c.current);
  console.log('Current communities:', currentCommunities);
  
  if (currentCommunities.length === 0) {
    console.log('No current communities found');
    return;
  }
  
  container.innerHTML = currentCommunities.map((comm, index) => {\n    const emoji = getEmojiForCommunity(comm.name);
    \n    if (index === 0) {\n      // Main card for first community\n      return `\n        <div class=\"community-card main-card\">\n          <div class=\"community-logo-img\">\n            <span class=\"logo-emoji\">${emoji}</span>\n          </div>\n          <h3 class=\"community-name\">${comm.name}</h3>\n          <p class=\"community-role\">${comm.role}</p>\n          <p class=\"community-desc\">${comm.description}</p>\n          ${comm.stats ? `\n            <div class=\"community-stats\">\n              <div class=\"stat\">\n                <span class=\"stat-number\">${comm.stats.members}</span>\n                <span class=\"stat-label\">members</span>\n              </div>\n              <div class=\"stat\">\n                <span class=\"stat-number\">${comm.stats.events}</span>\n                <span class=\"stat-label\">events</span>\n              </div>\n            </div>\n          ` : ''}\n          ${comm.url ? `<a href=\"${comm.url}\" target=\"_blank\" rel=\"noopener\" class=\"community-link\">Visit \u2192</a>` : ''}\n        </div>\n      `;\n    }\n    \n    return `\n      <div class=\"community-card\">\n        <div class=\"community-logo-img\">\n          <span class=\"logo-emoji\">${emoji}</span>\n        </div>\n        <h3 class=\"community-name\">${comm.name}</h3>\n        <p class=\"community-role\">${comm.role}</p>\n        <p class=\"community-desc\">${comm.description}</p>\n      </div>\n    `;\n  }).join('');
}

/**
 * Populate past communities
 */
function populatePastCommunities(communities) {
  if (!communities || !Array.isArray(communities)) return;
  
  const container = document.querySelector('.past-communities');
  if (!container) return;
  
  const pastCommunities = communities.filter(c => !c.current);
  
  container.innerHTML = pastCommunities.map(comm => {
    const emoji = getEmojiForCommunity(comm.name);
    return `
      <div class=\"past-community-item\">\n        <span class=\"past-logo\">${emoji}</span>\n        <div class=\"past-info\">\n          <span class=\"past-name\">${comm.name}</span>\n          <span class=\"past-role\">${comm.role}</span>\n        </div>\n        ${comm.url ? `<a href=\"${comm.url}\" target=\"_blank\" rel=\"noopener\" class=\"past-link\">\u2197</a>` : ''}\n      </div>\n    `;
  }).join('');
}

/**
 * Populate speaking section
 */
function populateSpeaking(speaking) {
  if (!speaking) return;
  
  const container = document.querySelector('.speaking-grid');
  if (!container) return;
  
  // Get the latest year's data (2024 or 2026)
  const latestYear = speaking[2026] || speaking[2024];
  if (!latestYear) return;
  
  const speakerCategory = container.querySelector('.speaking-category');
  if (speakerCategory) {
    const itemsContainer = speakerCategory.querySelector('.speaking-items');
    if (itemsContainer) {
      itemsContainer.innerHTML = latestYear.map(item => `
        <a href=\"${item.url}\" target=\"_blank\" rel=\"noopener\" class=\"speaking-item\">\n          <div class=\"speaking-info\">\n            <span class=\"speaking-event\">${item.event}</span>\n            <span class=\"speaking-topic\">${item.topic}</span>\n          </div>\n          <span class=\"speaking-type\">${item.type}</span>\n        </a>\n      `).join('');
    }
  }
}

/**
 * Populate organizing section
 */
function populateOrganizing(organizing) {
  if (!organizing) return;
  
  const container = document.querySelector('.speaking-grid');
  if (!container) return;
  
  const categories = container.querySelectorAll('.speaking-category');
  const organizerCategory = categories[1]; // Second category
  
  if (organizerCategory) {
    const itemsContainer = organizerCategory.querySelector('.speaking-items');
    if (itemsContainer) {
      // Combine all years of organizing
      const items2026 = organizing[2026] || [];
      const items2024 = organizing[2024] || [];
      const items2021_2023 = organizing['2021-2023'] || [];
      const allItems = [...items2026, ...items2024, ...items2021_2023];
      
      itemsContainer.innerHTML = allItems.map(item => `
        <a href=\"${item.url}\" target=\"_blank\" rel=\"noopener\" class=\"speaking-item\">\n          <div class=\"speaking-info\">\n            <span class=\"speaking-event\">${item.event}</span>\n            <span class=\"speaking-topic\">${item.role}</span>\n          </div>\n          <span class=\"speaking-type\">Event</span>\n        </a>\n      `).join('');
    }
  }
}

/**
 * Populate terminal with education data
 */
function populateTerminal(education) {
  if (!education || !Array.isArray(education)) return;
  
  const terminalOutput = document.querySelector('.terminal-output');
  if (!terminalOutput) return;
  
  terminalOutput.innerHTML = education.map(edu => {
    const status = edu.status === 'Pursuing' ? '(pursuing)' : '';
    return `<span class=\"output-line\">\u2192 ${edu.degree} ${status} @ ${edu.institution}</span>`;
  }).join('');
}

/**
 * Helper function to get emoji for community
 */
function getEmojiForCommunity(name) {
  const emojiMap = {
    'Hackerabad': '🏘',
    'Postman': '📮',
    'GitHub': '🐈‍⬛',
    'AI Club SNIST': '🤖',
    'HackPrix': '🎯',
    'CodeDay': '🌟',
    'OpinHacks': '💡',
    'Streamlit': '📊',
    'IIM Ranchi Alumni Committee': '🎓'
  };
  return emojiMap[name] || '\u2b50';
}

/**
 * Custom cursor follower
 */
function initCursorFollower() {
  const cursor = document.querySelector('.cursor-follower');
  if (!cursor) {
    console.log('Cursor follower element not found');
    return;
  }
  
  console.log('Initializing cursor follower');
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  // Show cursor follower initially
  cursor.style.opacity = '0.8';
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Smooth cursor following
  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.15;
    cursorY += dy * 0.15;
    
    cursor.style.left = cursorX - 10 + 'px';
    cursor.style.top = cursorY - 10 + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  // Cursor effects on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .activity-card, .community-card, .easter-card, .contact-card, .speaking-item, .nerd-badge');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
    });
  });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (!toggle || !mobileMenu) return;
  
  toggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    toggle.classList.toggle('active');
  });
  
  // Close menu on link click
  const mobileLinks = document.querySelectorAll('.mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      toggle.classList.remove('active');
    });
  });
}

/**
 * Smooth scroll for navigation links
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      
      const offsetTop = target.offsetTop - 80; // Account for fixed nav
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    });
  });
}

/**
 * Logo/Username rotation on hover (rotates 180° inline)
 */
function initLogoRotation() {
  const logos = document.querySelectorAll('.logo-text');
  
  logos.forEach(logo => {
    let isRotated = false;
    
    logo.addEventListener('mouseenter', () => {
      isRotated = !isRotated;
      logo.style.transform = isRotated ? 'rotate(180deg)' : 'rotate(0deg)';
    });
  });
}

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.activity-card, .community-card, .easter-card, .contact-card, .gallery-item, .highlight-item, .speaking-item, .past-community-item'
  );
  
  let animationCounter = 0;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger the animation using a counter for correct sequencing
        const delay = animationCounter * 100;
        animationCounter++;
        
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, delay);
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Add animation class styles
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Typing effect for terminal
 */
function initTypingEffect() {
  const terminalCommand = document.querySelector('.terminal-command');
  const terminalOutput = document.querySelector('.terminal-output');
  
  if (!terminalCommand || !terminalOutput) return;
  
  // Hide output initially
  terminalOutput.style.opacity = '0';
  
  // Simulate typing with consistent timing
  const text = terminalCommand.textContent;
  terminalCommand.textContent = '';
  terminalCommand.style.opacity = '1';
  
  let charIndex = 0;
  const typingDelay = 120; // Fixed delay for consistency
  
  function typeChar() {
    if (charIndex < text.length) {
      terminalCommand.textContent += text[charIndex];
      charIndex++;
      setTimeout(typeChar, typingDelay);
    } else {
      // Show output after typing
      setTimeout(() => {
        terminalOutput.style.opacity = '1';
        terminalOutput.style.transition = 'opacity 0.5s ease';
      }, 500);
    }
  }
  
  // Start typing after a delay
  setTimeout(typeChar, 1000);
}

/**
 * Hover effects for various elements
 */
function initHoverEffects() {
  // Gallery items
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const rotation = Math.random() * 4 - 2;
      item.style.transform = `scale(1.02) rotate(${rotation}deg)`;
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'scale(1) rotate(0)';
    });
  });
}

/**
 * Username reveal animation
 */
function initUsernameReveal() {
  const usernameCard = document.querySelector('#username-reveal');
  if (!usernameCard) return;
  
  const rotatedText = usernameCard.querySelector('.username-rotated');
  const ashishText = usernameCard.querySelector('.username-ashish');
  const mindBlown = usernameCard.querySelector('.mind-blown');
  
  // Initially hide the reveal
  if (rotatedText) rotatedText.style.opacity = '0.3';
  if (ashishText) ashishText.style.opacity = '0';
  if (mindBlown) mindBlown.style.opacity = '0';
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate the reveal
        setTimeout(() => {
          if (rotatedText) {
            rotatedText.style.opacity = '1';
            rotatedText.style.transition = 'opacity 0.5s ease';
          }
        }, 500);
        
        setTimeout(() => {
          if (ashishText) {
            ashishText.style.opacity = '1';
            ashishText.style.transition = 'opacity 0.5s ease';
            ashishText.style.transform = 'scale(1.1)';
            setTimeout(() => {
              ashishText.style.transform = 'scale(1)';
            }, 200);
          }
        }, 1000);
        
        setTimeout(() => {
          if (mindBlown) {
            mindBlown.style.opacity = '1';
            mindBlown.style.transition = 'opacity 0.3s ease';
          }
        }, 1500);
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });
  
  observer.observe(usernameCard);
}

/**
 * Random fun facts tooltip on nerd badge click
 */
function initFunFacts() {
  const facts = [
    "💡 Fun fact: The 4 in IM45145V looks like an 'h' when rotated!",
    "🎵 Currently vibing to: Noga Erez",
    "📺 Probably watching a K-drama right now",
    "☕ Fueled by coffee and curiosity",
    "🚀 Hackathon survival rate: surprisingly high",
    "🤓 I collect random facts like some people collect stamps",
    "🌃 Night owl by nature, coffee dependent by choice",
    "🎮 Still believe in cheat codes for life"
  ];
  
  const trigger = document.querySelector('.nerd-badge');
  if (!trigger) {
    console.log('Nerd badge not found!');
    return;
  }
  
  console.log('Nerd badge found, adding click listener');
  
  trigger.addEventListener('click', (e) => {
    console.log('Nerd badge clicked!');
    e.preventDefault();
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    
    // Create temporary tooltip
    const tooltip = document.createElement('div');
    tooltip.textContent = randomFact;
    tooltip.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #7c3aed, #06b6d4);
      color: white;
      padding: 1rem 2rem;
      border-radius: 12px;
      font-size: 1rem;
      z-index: 9999;
      animation: popIn 0.3s ease;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    `;
    
    document.body.appendChild(tooltip);
    
    // Remove after delay
    setTimeout(() => {
      tooltip.style.opacity = '0';
      tooltip.style.transition = 'opacity 0.3s ease';
      setTimeout(() => tooltip.remove(), 300);
    }, 2000);
  });
  
  // Add popIn animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes popIn {
      from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  `;
  document.head.appendChild(style);
}

// Fun facts functionality is now initialized in main DOMContentLoaded

/**
 * Easter egg: Konami code reveals secret message
 */
function initKonamiCode() {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;
  
  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      
      if (konamiIndex === konamiCode.length) {
        showKonamiEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
}

function showKonamiEasterEgg() {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.5s ease;
  `;
  
  overlay.innerHTML = `
    <div style="text-align: center; color: white; font-family: 'Space Grotesk', sans-serif;">
      <p style="font-size: 4rem; margin-bottom: 1rem;">🎮</p>
      <h2 style="font-size: 2rem; margin-bottom: 1rem; background: linear-gradient(135deg, #7c3aed, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">You found the secret!</h2>
      <p style="font-size: 1.2rem; color: #a0a0b0; margin-bottom: 2rem;">You know the Konami code? We should definitely talk.</p>
      <button onclick="this.parentElement.parentElement.remove()" style="background: linear-gradient(135deg, #7c3aed, #06b6d4); color: white; border: none; padding: 1rem 2rem; border-radius: 8px; font-size: 1rem; cursor: pointer;">Nice. 🤝</button>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  // Add fadeIn animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

// Initialize Konami code
document.addEventListener('DOMContentLoaded', initKonamiCode);

/**
 * Intersection observer for nav highlighting
 */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });
  
  sections.forEach(section => observer.observe(section));
}

document.addEventListener('DOMContentLoaded', initNavHighlight);

/**
 * Console easter egg
 */
console.log(`
%c👋 Hey there, fellow console explorer!

%cYou're clearly someone who digs deeper.
I like that.

%cWant to chat about code, hackathons, or anything else?
Find me at @im45145v

%c✨ Rotate "IM45145V" 180° — you'll see it.
`, 
'font-size: 24px; font-weight: bold;',
'font-size: 14px; color: #7c3aed;',
'font-size: 14px; color: #06b6d4;',
'font-size: 12px; color: #f97316; font-style: italic;'
);
