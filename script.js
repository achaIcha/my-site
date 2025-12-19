// script.js — external JavaScript implementing interactivity (A–G)

// Wait until DOM is fully parsed (script is loaded with defer, so DOM is available)
(function () {
  // Elements
  const themeBtn = document.getElementById('themeBtn');
  const editJobBtn = document.getElementById('editJobBtn');
  const jobTitleEl = document.getElementById('job-title');

  const toggleSkillsBtn = document.getElementById('toggleSkillsBtn');
  const skillsSection = document.getElementById('skillsSection');

  const msgBox = document.getElementById('user-message');
  const counterEl = document.getElementById('counter');

  const contactForm = document.getElementById('contactForm');
  const nameField = document.getElementById('user-name');
  const emailField = document.getElementById('user-email');

  const dateDisplay = document.getElementById('dateDisplay');

  const quoteBtn = document.getElementById('quoteBtn');
  const quoteDisplay = document.getElementById('quoteDisplay');

  // A. Change Theme — toggle 'dark-mode' class on body
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // update button text to reflect current state
    const isDark = document.body.classList.contains('dark-mode');
    themeBtn.textContent = isDark ? 'Switch to Light Mode' : 'Toggle Dark Mode';
  });

  // B. Edit Job Title — prompt for new title and update text
  editJobBtn.addEventListener('click', () => {
    const current = jobTitleEl.textContent.trim();
    const newTitle = prompt('Enter a new job title:', current);
    if (newTitle !== null) {
      const trimmed = newTitle.trim();
      if (trimmed.length > 0) {
        jobTitleEl.textContent = trimmed;
      } else {
        alert('Job title cannot be empty.');
      }
    }
  });

  // C. Show/Hide Skills
  toggleSkillsBtn.addEventListener('click', () => {
    const hidden = skillsSection.classList.toggle('hidden');
    toggleSkillsBtn.textContent = hidden ? 'Show Skills' : 'Hide Skills';
  });

  // D. Live Character Counter for message textarea
  const MAX_CHARS = parseInt(msgBox.getAttribute('maxlength') || '200', 10);
  function updateCounter() {
    const remaining = Math.max(0, MAX_CHARS - msgBox.value.length);
    counterEl.textContent = remaining;
  }
  msgBox.addEventListener('input', updateCounter);
  updateCounter(); // initial

  // E. Form Validation Before Sending
  contactForm.addEventListener('submit', function (ev) {
    // simple validation: name and email not empty, email contains @
    const name = nameField.value.trim();
    const email = emailField.value.trim();

    if (!name) {
      alert('Please enter your name.');
      nameField.focus();
      ev.preventDefault();
      return false;
    }

    if (!email) {
      alert('Please enter your email address.');
      emailField.focus();
      ev.preventDefault();
      return false;
    }

    // basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      emailField.focus();
      ev.preventDefault();
      return false;
    }

    // If validation passes, proceed — (since action="#" we just show confirmation)
    alert('Message sent — thank you!');
    // Optionally clear the form:
    contactForm.reset();
    updateCounter();

    ev.preventDefault(); // prevent actual submission for demo purposes
    return false;
  });

  // F. Automatically display today's date in footer
  function formatToday() {
    const today = new Date();
    return today.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  dateDisplay.textContent = formatToday();

  // G. Extra feature — Random Quote Generator
  const quotes = [
    "Believe you can and you're halfway there. — Theodore Roosevelt",
    "Don't watch the clock; do what it does. Keep going. — Sam Levenson",
    "Start where you are. Use what you have. Do what you can. — Arthur Ashe",
    "The only way to do great work is to love what you do. — Steve Jobs",
    "You are never too old to set another goal or to dream a new dream. — C.S. Lewis",
    "The future depends on what you do today. — Mahatma Gandhi"
  ];

  quoteBtn.addEventListener('click', () => {
    const idx = Math.floor(Math.random() * quotes.length);
    quoteDisplay.textContent = quotes[idx];
  });

  // small enhancement: press Enter on jobTitle edit button to trigger click (accessibility)
  editJobBtn.addEventListener('keyup', (ev) => {
    if (ev.key === 'Enter') editJobBtn.click();
  });

})();