// DOM Elements
const timerDisplay = document.getElementById('timer');
const sessionButtons = document.querySelectorAll('.session-btn');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const saveSettingsBtn = document.getElementById('save-settings');
const themeToggle = document.getElementById('theme-toggle');

let quoteEl = document.getElementById('quote');
let sessionCountEl = document.getElementById('session-count');
let currentMode = 'pomodoro';
let timer;
let isRunning = false;
let remainingTime = 1500;
let sessionCount = 0;

// Default durations (in seconds)
let durations = {
  pomodoro: 1500,
  short: 300,
  long: 900
};

// Quotes array
const quotes = [
  "Stay focused, stay sharp.",
  "Discipline beats motivation.",
  "One task at a time.",
  "You’re doing great!",
  "Small progress is still progress.",
  "Keep calm and Pomodoro on."
];

// Utility: Format seconds to MM:SS
function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

// Update Timer Display
function updateDisplay() {
  timerDisplay.textContent = formatTime(remainingTime);
}

// Switch Session Mode
function switchMode(mode) {
  clearInterval(timer);
  isRunning = false;
  currentMode = mode;
  remainingTime = durations[mode];
  updateDisplay();
  updateActiveButton();
  showQuote();
}

// Update active button UI
function updateActiveButton() {
  sessionButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === currentMode);
  });
}

// Start Timer
function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    remainingTime--;
    updateDisplay();

    if (remainingTime <= 0) {
      clearInterval(timer);
      isRunning = false;
      sessionCount++;
      sessionCountEl.textContent = sessionCount;
      showQuote();
      alert('Time’s up! 🎉');
    }
  }, 1000);
}

// Pause Timer
function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

// Reset Timer
function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  remainingTime = durations[currentMode];
  updateDisplay();
}

// Save Custom Durations
saveSettingsBtn.addEventListener('click', () => {
  durations.pomodoro = parseInt(document.getElementById('pomodoro-duration').value) * 60;
  durations.short = parseInt(document.getElementById('shortbreak-duration').value) * 60;
  durations.long = parseInt(document.getElementById('longbreak-duration').value) * 60;
  switchMode(currentMode); // Reset with new duration
  alert("Settings Saved ✅");
});

// Show random quote
function showQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  quoteEl.textContent = quotes[random];
}

// Theme Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '🌞' : '🌙';
});

// Button Events
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
sessionButtons.forEach(btn => {
  btn.addEventListener('click', () => switchMode(btn.dataset.mode));
});

// Initialize
switchMode('pomodoro');
