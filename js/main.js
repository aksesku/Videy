// Dark/Light Mode
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Set initial theme
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
}

// Voice Command
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.continuous = false;

function handleVoiceCommand(command) {
  command = command.toLowerCase();
  if (command.includes('dark mode')) {
    body.classList.toggle('dark-mode');
  }
}

document.getElementById('voice-button').addEventListener('click', () => {
  recognition.start();
});

recognition.onresult = (event) => {
  const command = event.results[0][0].transcript;
  handleVoiceCommand(command);
};

// Real-Time Clock
function updateClock() {
  const clock = document.getElementById('real-time-clock');
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  clock.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);

// Countdown Timer
const targetDate = new Date('2025-12-31T23:59:59');
const countdownTimer = document.getElementById('countdown-timer');

function updateCountdown() {
  const now = new Date();
  const timeLeft = targetDate - now;

  if (timeLeft <= 0) {
    countdownTimer.textContent = "Happy New Year!";
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  countdownTimer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Back-to-Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.remove('hidden');
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
    backToTopButton.classList.add('hidden');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
