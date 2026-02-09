/**
 * Ashish Malla Portfolio - Funky Interactions
 * "Playful chaos with a system underneath"
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initCursorFollower();
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initTypingEffect();
  initHoverEffects();
  initUsernameReveal();
  initLogoRotation();
  loadDataFromJSON();
});

/**
 * Load data from JSON file
 */
async function loadDataFromJSON() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) return;
    
    const data = await response.json();
    console.log('Data loaded:', data);
    
    // Data is available for dynamic content updates
    // Currently content is hardcoded in HTML for simplicity
    // This can be expanded to dynamically populate sections
    
  } catch (error) {
    console.log('Using static content (data.json not loaded)');
  }
}

/**
 * Custom cursor follower
 */
function initCursorFollower() {
  const cursor = document.querySelector('.cursor-follower');
  if (!cursor) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
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
  const interactiveElements = document.querySelectorAll('a, button, .activity-card, .community-card, .easter-card, .contact-card, .speaking-item');
  
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
    "🚀 Hackathon survival rate: surprisingly high"
  ];
  
  const trigger = document.querySelector('.nerd-badge');
  if (!trigger) return;
  
  trigger.addEventListener('click', () => {
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

// Initialize fun facts
document.addEventListener('DOMContentLoaded', initFunFacts);

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
