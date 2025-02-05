// Initialize AOS
AOS.init({
  duration: 800,
  once: true,
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Theme Toggle
const themeToggleDesktop = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const themeIconDesktop = document.getElementById('theme-icon');
const themeIconMobile = document.getElementById('theme-icon-mobile');
const body = document.body;

// Function to set theme
function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark-theme');
    themeIconDesktop.classList.remove('fa-moon');
    themeIconDesktop.classList.add('fa-sun');
    themeIconMobile.classList.remove('fa-moon');
    themeIconMobile.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark-theme');
    themeIconDesktop.classList.remove('fa-sun');
    themeIconDesktop.classList.add('fa-moon');
    themeIconMobile.classList.remove('fa-sun');
    themeIconMobile.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
}

// Event Listeners for Theme Toggle
themeToggleDesktop.addEventListener('click', () => {
  if (body.classList.contains('dark-theme')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});

themeToggleMobile.addEventListener('click', () => {
  if (body.classList.contains('dark-theme')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});

// Load theme on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  setTheme(savedTheme || 'light');
});

// Active Section Highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 70;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Load Projects Dynamically
fetch('data/projects.json')
  .then(response => response.json())
  .then(projects => {
    const projectsContainer = document.getElementById('projects-container');
    const projectsToShow = projects.slice(0, 4); // Show only 4 projects

    projectsToShow.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.classList.add('bg-white', 'dark:bg-gray-700', 'p-6', 'rounded', 'shadow', 'hover:shadow-lg', 'transition', 'project-card');
      projectCard.setAttribute('data-aos', 'fade-up');

      // Create project image element (uncomment if you have images)
      /*
      const projectImage = document.createElement('img');
      projectImage.src = `assets/images/${project.image}`; // Image file name from projects.json
      projectImage.alt = `${project.title}`;
      projectImage.classList.add('w-full', 'h-40', 'object-cover', 'mb-4');
      projectCard.appendChild(projectImage);
      */

      projectCard.innerHTML += `
        <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">${project.title}</h3>
        <p class="text-gray-600 dark:text-gray-300">${project.description}</p>
        <p class="mt-4 text-gray-600 dark:text-gray-300"><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>
        <a href="${project.repoLink}" target="_blank" class="mt-4 inline-block text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition">View Repository</a>
        ${project.liveDemo ? `<a href="${project.liveDemo}" target="_blank" class="ml-4 inline-block text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition">Live Demo</a>` : ''}
      `;
      projectsContainer.appendChild(projectCard);
    });
  });

// Motivational Quotes
const quotes = [
  "AI won’t take your job, but someone who knows AI will!",
  "Code is like humor. When you have to explain it, it's bad.",
  "In a world full of algorithms, be a heuristic.",
  "Machine Learning is the last invention that humanity will ever need to make.",
  "Delete the negative; accentuate the positive!",
  "Life is short. Live it. Fear is natural. Face it. Memory is powerful. Use it."
];

function displayRandomQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('quote-display').innerText = `"${quote}"`;
}

// Call the function to display a quote
displayRandomQuote();

// Auto-updating Year
document.getElementById('year').textContent = new Date().getFullYear();
