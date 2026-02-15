/**
 * Ashish Malla Portfolio - Funky Interactions v3.0
 * "Playful chaos with a system underneath" 
 * Updated: Feb 15, 2026 - UI polish, SEO, performance, creative touches
 */

const speakingAccordionHandlers = new WeakMap();

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  console.log('🚀 DOM loaded, initializing components...');
  
  try {
    initCursorFollower();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initTypingEffect();
    initHoverEffects();
    initUsernameReveal();
    initLogoRotation();
    initSpeakingAccordion();
    initPrintHandler();
    loadDataFromJSON();
    
    // Initialize fun facts after a small delay to ensure DOM is ready
    setTimeout(() => {
      initFunFacts();
    }, 100);
    
    // Add lazy loading error handling for images
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.addEventListener('error', function() {
        console.warn('Failed to load image:', this.src);
        this.style.opacity = '0.3';
        this.alt = 'Image unavailable';
      });
    });
    
    console.log('✨ All components initialized successfully');
  } catch (error) {
    console.error('❌ Error during initialization:', error);
  }
});

/**
 * Handle Ctrl+P to show DIY cube resume layout
 */
function initPrintHandler() {
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      e.preventDefault();
      const printResume = document.querySelector('.print-resume');
      if (printResume) {
        printResume.style.display = 'block';
      }
      window.print();
      if (printResume) {
        printResume.style.display = 'none';
      }
    }
  });

  window.addEventListener('afterprint', () => {
    const printResume = document.querySelector('.print-resume');
    if (printResume) {
      printResume.style.display = 'none';
    }
  });
}

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
    populateMetaTags(data.profile, data.contact);
    populateHeroSection(data.profile);
    populateAboutBio(data.profile);
    populateActivities(data.activities);
    populateRoles(data.roles);
    populateCurrentCommunities(data.communities);
    populatePastCommunities(data.communities);
    populateHighlights(data.highlights);
    populateGallery(data.gallery);
    populateSpeaking(data.speaking);
    populateOrganizing(data.organizing);
    populateTerminal(data.profile);
    populateEducation(data.education);
    populateFunFacts(data.funFacts);
    populateContact(data.contact, data.profile);
    
    // Re-init accordion after dynamic content is loaded
    initSpeakingAccordion();
    
    console.log('Data populated from JSON');
    
  } catch (error) {
    console.error('Error loading data.json:', error);
    console.log('Using static HTML content');
  }
}

/**
 * Populate meta tags and structured data
 */
function populateMetaTags(profile, contact) {
  if (!profile) return;
  
  // Update page title
  if (profile.name && profile.tagline) {
    document.title = `${profile.name} — ${profile.tagline}`;
  }
  
  // Update meta descriptions
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta && profile.bio) {
    const shortBio = profile.bio.substring(0, 160);
    descriptionMeta.setAttribute('content', shortBio);
  }
  
  // Update Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && profile.name && profile.tagline) {
    ogTitle.setAttribute('content', `${profile.name} — ${profile.tagline}`);
  }
  
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription && profile.tagline) {
    ogDescription.setAttribute('content', `${profile.tagline}. ${profile.bio ? profile.bio.substring(0, 100) : ''}`);
  }
  
  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage && profile.avatar) {
    ogImage.setAttribute('content', `https://im45145v.dev/${profile.avatar}`);
  }
  
  // Update Twitter Card tags
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle && profile.name && profile.tagline) {
    twitterTitle.setAttribute('content', `${profile.name} — ${profile.tagline}`);
  }
  
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription && profile.tagline) {
    twitterDescription.setAttribute('content', `${profile.tagline}. ${profile.bio ? profile.bio.substring(0, 100) : ''}`);
  }
  
  const twitterImage = document.querySelector('meta[name="twitter:image"]');
  if (twitterImage && profile.avatar) {
    twitterImage.setAttribute('content', `https://im45145v.dev/${profile.avatar}`);
  }
  
  const twitterSite = document.querySelector('meta[name="twitter:site"]');
  if (twitterSite && profile.username) {
    twitterSite.setAttribute('content', `@${profile.username.toLowerCase()}`);
  }
  
  // Update structured data
  if (profile.name && contact) {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": profile.fullName || profile.name,
      "alternateName": profile.username,
      "url": "https://im45145v.dev",
      "jobTitle": profile.tagline || "Engineer & Community Builder",
      "description": profile.bio,
      "sameAs": []
    };
    
    if (contact.github) structuredData.sameAs.push(contact.github);
    if (contact.twitter) structuredData.sameAs.push(contact.twitter);
    if (contact.linkedin) structuredData.sameAs.push(contact.linkedin);
    if (contact.instagram) structuredData.sameAs.push(contact.instagram);
    if (contact.devpost) structuredData.sameAs.push(contact.devpost);
    
    // Update or create structured data script
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
    if (structuredDataScript) {
      structuredDataScript.textContent = JSON.stringify(structuredData, null, 2);
    }
  }
}

/**
 * Populate hero section with profile data
 */
function populateHeroSection(profile) {
  if (!profile) return;
  
  // Update status
  const statusEl = document.getElementById('hero-status');
  if (statusEl && profile.status) {
    statusEl.textContent = profile.status;
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
    <div class="activity-card" data-tilt>
      <div class="activity-icon">${activity.icon}</div>
      <h3 class="activity-title">${activity.title}</h3>
      <p class="activity-desc">${activity.description}</p>
      <div class="activity-badge">${activity.badge}</div>
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
    <span class="role-item">${role}</span>
    <span class="role-divider">✦</span>
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
  
  container.innerHTML = currentCommunities.map((comm, index) => {
    const emoji = getEmojiForCommunity(comm.name);
    const logoUrl = getLogoForCommunity(comm.name);
    const logoHtml = logoUrl 
      ? `<div class="community-logo-container"><div class="logo-wrapper"><img src="${logoUrl}" alt="${comm.name}" class="logo-img" width="48" height="48" loading="lazy" decoding="async" onerror="this.onerror=null;this.parentElement.innerHTML='<span class=logo-emoji>${emoji}</span>';"></div></div>`
      : `<div class="community-logo-container"><div class="logo-wrapper logo-emoji-wrapper"><span class="logo-emoji">${emoji}</span></div></div>`;

    if (index === 0) {
      return `
        <div class="community-card main-card">
          ${logoHtml}
          <h3 class="community-name">${comm.name}</h3>
          <p class="community-role">${comm.role}</p>
          <p class="community-desc">${comm.description}</p>
          ${comm.stats ? `
            <div class="community-stats">
              <div class="stat">
                <span class="stat-number">${comm.stats.members}</span>
                <span class="stat-label">members</span>
              </div>
              <div class="stat">
                <span class="stat-number">${comm.stats.events}</span>
                <span class="stat-label">events</span>
              </div>
            </div>
          ` : ''}
          ${comm.url ? `<a href="${comm.url}" target="_blank" rel="noopener" class="community-link">Visit →</a>` : ''}
        </div>
      `;
    }

    return `
      <div class="community-card">
        ${logoHtml}
        <h3 class="community-name">${comm.name}</h3>
        <p class="community-role">${comm.role}</p>
        <p class="community-desc">${comm.description}</p>
        ${comm.url ? `<a href="${comm.url}" target="_blank" rel="noopener" class="community-link">Visit →</a>` : ''}
      </div>
    `;
  }).join('');
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
    const logoUrl = getLogoForCommunity(comm.name);
    const logoHtml = logoUrl
      ? `<div class="past-logo-wrapper"><img src="${logoUrl}" alt="${comm.name}" class="past-logo-img" width="24" height="24" loading="lazy" decoding="async" onerror="this.onerror=null;this.parentElement.innerHTML='<span class=past-logo>${emoji}</span>';"></div>`
      : `<div class="past-logo-wrapper"><span class="past-logo">${emoji}</span></div>`;
    return `
      <div class="past-community-item">
        ${logoHtml}
        <div class="past-info">
          <span class="past-name">${comm.name}</span>
          <span class="past-role">${comm.role}</span>
        </div>
        ${comm.url ? `<a href="${comm.url}" target="_blank" rel="noopener" class="past-link">↗</a>` : ''}
      </div>
    `;
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
        <a href="${item.url}" target="_blank" rel="noopener" class="speaking-item">
          <div class="speaking-info">
            <span class="speaking-event">${item.event}</span>
            <span class="speaking-topic">${item.topic}</span>
          </div>
          <span class="speaking-type">${item.type}</span>
        </a>
      `).join('');
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
        <a href="${item.url}" target="_blank" rel="noopener" class="speaking-item">
          <div class="speaking-info">
            <span class="speaking-event">${item.event}</span>
            <span class="speaking-topic">${item.role}</span>
          </div>
          <span class="speaking-type">Event</span>
        </a>
      `).join('');
    }
  }
}

/**
 * Populate terminal with profile details
 */
function populateTerminal(profile) {
  if (!profile || !profile.terminalLines) return;
  
  const terminalOutput = document.querySelector('.terminal-output');
  if (!terminalOutput) return;
  
  terminalOutput.innerHTML = profile.terminalLines.map(line => {
    return `<span class="output-line">→ ${line}</span>`;
  }).join('');
}

/**
 * Populate education section
 */
function populateEducation(education) {
  if (!education || !Array.isArray(education)) return;
  
  const container = document.querySelector('#education-container') || document.querySelector('.education-grid');
  if (!container) {
    console.log('Education container not found');
    return;
  }
  
  const emojiMap = { 'MBA': '🎓', 'B.Tech': '💻', '12th': '📚', '10th': '🌱' };
  
  container.innerHTML = education.map(edu => {
    const emoji = emojiMap[edu.degree] || '🎓';
    return `
      <div class="education-block">
        <div class="edu-emoji">${emoji}</div>
        <div class="edu-year">${edu.year}</div>
        <div class="edu-degree">${edu.degree}</div>
        <div class="edu-school">${edu.institution}</div>
      </div>
    `;
  }).join('');
}

/**
 * Populate highlights section
 */
function populateHighlights(highlights) {
  if (!highlights || !Array.isArray(highlights)) return;
  
  const container = document.querySelector('.community-highlights');
  if (!container) return;
  
  const highlightsHTML = highlights.map(item => `
    <div class="highlight-item">
      <span class="highlight-emoji">${item.emoji}</span>
      <span class="highlight-text">${item.text}</span>
    </div>
  `).join('');
  
  container.innerHTML = `
    <h4 class="highlights-title">Event Highlights</h4>
    ${highlightsHTML}
  `;
}

/**
 * Populate photo gallery
 */
function populateGallery(gallery) {
  if (!gallery || !Array.isArray(gallery)) return;
  
  const container = document.getElementById('gallery-container');
  if (!container) return;
  
  const galleryEmojis = ['📸', '🏆', '🔧', '🤝'];
  
  container.innerHTML = gallery.map((item, index) => {
    const className = index === 0 ? 'gallery-item large' : 'gallery-item';
    const emoji = galleryEmojis[index] || '📷';
    // Check if it's an SVG placeholder or real image
    const isSvgPlaceholder = item.src.endsWith('.svg');
    
    if (isSvgPlaceholder) {
      return `
        <div class="${className}">
          <div class="gallery-placeholder">
            <span class="placeholder-icon">${emoji}</span>
            <span class="placeholder-text">${item.caption}</span>
          </div>
        </div>
      `;
    }
    
    return `
      <div class="${className}">
        <img src="${item.src}" alt="${item.alt}" width="${index === 0 ? '800' : '600'}" height="600" loading="lazy" onerror="this.parentElement.innerHTML='<div class=gallery-placeholder><span class=placeholder-icon>${emoji}</span><span class=placeholder-text>${item.caption}</span></div>';">
        <div class="gallery-caption">${item.caption}</div>
      </div>
    `;
  }).join('');
}

/**
 * Populate fun facts section
 */
function populateFunFacts(funFacts) {
  if (!funFacts) return;
  
  // Populate music
  if (funFacts.music && Array.isArray(funFacts.music)) {
    const musicContainer = document.querySelector('.music-items');
    if (musicContainer) {
      musicContainer.innerHTML = funFacts.music.map(artist => `
        <div class="music-item">
          <span class="artist-name">${artist.artist}</span>
          <span class="music-vibe">${artist.vibe}</span>
        </div>
      `).join('');
    }
  }
  
  // Populate watching
  if (funFacts.watching) {
    const watchingText = document.querySelector('.watching-text');
    if (watchingText) {
      watchingText.textContent = funFacts.watching;
    }
  }
  
  // Populate story preference
  if (funFacts.storyPreference) {
    const heroesText = document.querySelector('.heroes-text');
    if (heroesText) {
      heroesText.textContent = funFacts.storyPreference;
    }
  }
}

/**
 * Populate contact section
 */
function populateContact(contact, profile) {
  if (!contact) return;
  
  const contactOptions = document.querySelector('.contact-options');
  if (!contactOptions) return;
  
  const contactCards = [];
  
  if (contact.email) {
    contactCards.push(`
      <a href="mailto:${contact.email}" class="contact-card email-card">
        <span class="contact-icon">📧</span>
        <span class="contact-label">Email</span>
        <span class="contact-value">Drop a mail</span>
      </a>
    `);
  }
  
  if (contact.linkedin) {
    contactCards.push(`
      <a href="${contact.linkedin}" target="_blank" rel="noopener" class="contact-card linkedin-card">
        <span class="contact-icon">💼</span>
        <span class="contact-label">LinkedIn</span>
        <span class="contact-value">Let's connect</span>
      </a>
    `);
  }
  
  if (contact.twitter) {
    contactCards.push(`
      <a href="${contact.twitter}" target="_blank" rel="noopener" class="contact-card twitter-card">
        <span class="contact-icon">🐦</span>
        <span class="contact-label">Twitter</span>
        <span class="contact-value">Follow/DM</span>
      </a>
    `);
  }

  if (contact.instagram) {
    contactCards.push(`
      <a href="${contact.instagram}" target="_blank" rel="noopener" class="contact-card instagram-card">
        <span class="contact-icon">📸</span>
        <span class="contact-label">Instagram</span>
        <span class="contact-value">Behind the scenes</span>
      </a>
    `);
  }
  
  if (contact.github) {
    contactCards.push(`
      <a href="${contact.github}" target="_blank" rel="noopener" class="contact-card github-card">
        <span class="contact-icon">🐙</span>
        <span class="contact-label">GitHub</span>
        <span class="contact-value">See my code</span>
      </a>
    `);
  }

  if (contact.devpost) {
    contactCards.push(`
      <a href="${contact.devpost}" target="_blank" rel="noopener" class="contact-card devpost-card">
        <span class="contact-icon">🚀</span>
        <span class="contact-label">Devpost</span>
        <span class="contact-value">Hackathon trail</span>
      </a>
    `);
  }
  
  if (contact.wall) {
    contactCards.push(`
      <a href="${contact.wall}" target="_blank" rel="noopener" class="contact-card wall-card">
        <span class="contact-icon">📝</span>
        <span class="contact-label">Leave a Note</span>
        <span class="contact-value">Sign my wall</span>
      </a>
    `);
  }
  
  contactOptions.innerHTML = contactCards.join('');
  
  // Update location in footer note if available
  if (profile && profile.location) {
    const footerNote = document.querySelector('.footer-note');
    if (footerNote) {
      footerNote.innerHTML = `
        Currently based in: <strong>${profile.location}</strong> (MBA mode)
        <br>
        Always open to interesting conversations.
      `;
    }
  }
  
  // Update footer with profile name
  if (profile && profile.name) {
    const footerYear = document.querySelector('.footer-year');
    if (footerYear) {
      const currentYear = new Date().getFullYear();
      footerYear.textContent = `© ${currentYear} ${profile.name}`;
    }
  }
}

/**
 * Helper function to get emoji for community
 */
function getEmojiForCommunity(name) {
  const emojiMap = {
    'Hackerabad': '�',
    'Postman': '📮',
    'GitHub': '🐙',
    'AI Club SNIST': '🤖',
    'HackPrix': '🎯',
    'CodeDay': '🌟',
    'OpinHacks': '💡',
    'Streamlit': '📊',
    'IIM Ranchi': '🎓',
    'Defang': '🛡️'
  };
  
  // Match partial names
  for (const [key, emoji] of Object.entries(emojiMap)) {
    if (name.toLowerCase().includes(key.toLowerCase())) return emoji;
  }
  return '⭐';
}

/**
 * Get logo image URL for a community (with fallback to emoji)
 */
function getLogoForCommunity(name) {
  const logoMap = {
    'Hackerabad': 'https://raw.githubusercontent.com/im45145v/Hackerabad-Website/main/assets/Redesigned%20logos/YellowBG.png',
    'GitHub Campus Experts': 'images/GCE.png',
    'Postman': 'https://www.postman.com/_ar-assets/images/favicon-1-48.png',
    'Streamlit': 'https://streamlit.io/images/brand/streamlit-mark-color.png',
    'Defang': 'images/defang-icon-blue.d33007a5.svg'
  };
  
  for (const [key, url] of Object.entries(logoMap)) {
    if (name.toLowerCase().includes(key.toLowerCase())) return url;
  }
  return null;
}

/**
 * Custom cursor follower
 */
function initCursorFollower() {
  // Disable custom cursor on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.style.cursor = 'default';
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.style.cursor = 'pointer';
    });
    const cursor = document.querySelector('.cursor-follower');
    if (cursor) cursor.style.display = 'none';
    return;
  }
  
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
    
    // Use transform for better performance
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    
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
  
  function closeMenu() {
    mobileMenu.classList.remove('active');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  
  toggle.addEventListener('click', () => {
    const isActive = mobileMenu.classList.toggle('active');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    document.body.style.overflow = isActive ? 'hidden' : '';
  });
  
  // Close menu on link click
  const mobileLinks = document.querySelectorAll('.mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !toggle.contains(e.target)) {
      closeMenu();
    }
  });
}

/**
 * Speaking section accordion for mobile (click to expand)
 */
function initSpeakingAccordion() {
  function setupAccordion() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const headers = document.querySelectorAll('.speaking-year');
    
    headers.forEach(header => {
      const items = header.nextElementSibling;
      if (!items || !items.classList.contains('speaking-items')) return;
      
      // Remove old listener if any
      const oldHandler = speakingAccordionHandlers.get(header);
      if (oldHandler) {
        header.removeEventListener('click', oldHandler);
        speakingAccordionHandlers.delete(header);
      }
      
      if (isMobile) {
        // Collapse by default on mobile
        header.classList.remove('expanded');
        items.classList.remove('expanded');
        
        const handler = () => {
          header.classList.toggle('expanded');
          items.classList.toggle('expanded');
        };
        
        speakingAccordionHandlers.set(header, handler);
        header.addEventListener('click', handler);
      } else {
        // On desktop, ensure everything is visible
        header.classList.remove('expanded');
        items.classList.remove('expanded');
      }
    });
  }
  
  let resizeTimer;
  setupAccordion();
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setupAccordion, 150);
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
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Skip animations if user prefers reduced motion
    return;
  }
  
  const animatedElements = document.querySelectorAll(
    '.activity-card, .community-card, .easter-card, .contact-card, .gallery-item, .highlight-item, .speaking-item, .past-community-item'
  );
  
  let animationCounter = 0;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger the animation using a counter for correct sequencing
        const delay = animationCounter * 80;
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
    el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
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
    "🎵 Currently vibing to: Noga Erez ⚡",
    "📺 Probably watching a K-drama right now 🇰🇷",
    "☕ Fueled by coffee and curiosity",
    "🚀 Hackathon survival rate: surprisingly high",
    "🤓 I collect random facts like some people collect stamps",
    "🌃 Night owl by nature, coffee dependent by choice",
    "🎮 Still believe in cheat codes for life",
    "🧠 Tech ↔ Management = the rare dual-boot brain",
    "📝 I debug with console.log and I'm not ashamed",
    "🌍 Built communities across 3+ cities",
    "🎧 Coding playlist: lo-fi + electronic chaos"
  ];
  
  const trigger = document.querySelector('.nerd-badge');
  if (!trigger) {
    console.log('Nerd badge not found!');
    return;
  }
  
  console.log('Nerd badge found, adding event listeners');
  
  function showFact(e) {
    e.preventDefault();
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    
    // Create temporary tooltip
    const tooltip = document.createElement('div');
    tooltip.textContent = randomFact;
    tooltip.setAttribute('role', 'alert');
    tooltip.setAttribute('aria-live', 'polite');
    tooltip.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #7c3aed, #06b6d4);
      color: white;
      padding: 1.5rem 2rem;
      border-radius: 12px;
      font-size: 1rem;
      z-index: 9999;
      animation: popIn 0.3s ease;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
      max-width: 90vw;
      text-align: center;
    `;
    
    document.body.appendChild(tooltip);
    
    // Remove after delay
    setTimeout(() => {
      tooltip.style.opacity = '0';
      tooltip.style.transition = 'opacity 0.3s ease';
      setTimeout(() => tooltip.remove(), 300);
    }, 2500);
  }
  
  trigger.addEventListener('click', showFact);
  
  // Add keyboard support
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      showFact(e);
    }
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
      <h2 style="font-size: 2rem; margin-bottom: 1rem; background: linear-gradient(135deg, #7c3aed, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">You found the secret! 🎉</h2>
      <p style="font-size: 1.2rem; color: #a0a0b0; margin-bottom: 0.5rem;">You know the Konami code? We should definitely talk. 🤝</p>
      <p style="font-size: 0.9rem; color: #6a6a7a; margin-bottom: 2rem;">Only ~2% of visitors find this. You're built different. ⚡</p>
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

%c🔍 You're clearly someone who digs deeper.
I like that energy. We'd probably get along.

%c🚀 Want to chat about code, hackathons, or random fun stuff?
Find me at @im45145v on pretty much everything.

%c✨ Easter egg: Rotate "IM45145V" 180° — you'll see it. 🤯
%c🎮 Try the Konami code on the page too... ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA
`, 
'font-size: 24px; font-weight: bold;',
'font-size: 14px; color: #7c3aed;',
'font-size: 14px; color: #06b6d4;',
'font-size: 12px; color: #f97316; font-style: italic;',
'font-size: 11px; color: #22c55e;'
);
